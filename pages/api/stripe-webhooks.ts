import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  if (!sig) {
    return res.status(400).send("No signature provided");
  }
  let event: Stripe.Event | undefined;
  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET! as string
    );
  } catch (err) {
    return res.status(400).send("Webhook error" + err);
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        {
          charge.payment_intent;
        }
        {
          ("complete");
          charge.shipping?.address;
        }
      }
      break;
    default:
      console.log("Unhandled event type" + event.type);
  }
}
