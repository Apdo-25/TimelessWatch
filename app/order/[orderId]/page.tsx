import Container from "@/app/components/Container";
import { Metadata } from "next";
import getOrderById from "@/actions/getOrderById";
import OrderDetails from "./OrderDetails";
import NullData from "@/app/components/NullData";

interface IPrams {
  orderId?: string;
}

export const metadata: Metadata = {
  title: "Order",
  description: "Order",
};

const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderById(params);

  if (!order) {
    return <NullData title="Order not found" />;
  }

  return (
    <div>
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
