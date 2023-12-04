"use client";

import Image from "next/image";
import { CartProduct } from "@prisma/client";
import { formatPrice } from "../../../utils/formatPrice";

interface OrderItemProps {
  item: CartProduct;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div
      className="
      grid
      grid-cols-5
      text-xs
      md:text-sm
      gap-4
      border-t-[1.5px]
      border-slate-200
      py-4
      items-center"
    >
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div
          className="
              relative
              w-[70px]
              aspect-square
            "
        >
          <Image
            src={item.selectedImage.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{item.name}</div>
          <div>{item.selectedImage.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default OrderItem;
