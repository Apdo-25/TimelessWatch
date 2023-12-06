import Stripe from "stripe";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import getCurrentUser from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});
const calculateOrderAmount = (items: CartProduct[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: " Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser?.id } },
    amount: total,
    currency: "dkk",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentID: payment_intent_id,
    products: items,
  };

  //Check if the payment intent exists just update the order
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      //update order
      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentID: updated_intent.id },
        }),
        prisma.order.update({
          where: { paymentIntentID: updated_intent.id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 }
        );
      }
      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    //Create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "dkk",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
  return NextResponse.error();
}
