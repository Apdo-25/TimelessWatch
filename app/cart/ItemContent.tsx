"use client"
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";

interface ItemContentProps {
    item: CartProductType
}
const ItemContent: React.FC<ItemContentProps> = ({
    item
}) => {
    return ( 
        <div className="grid grid-cols text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div></div>
            <div> 
                {/* errrrrrrrrrrror fix needed */}
                {formatPrice(item.price)}
            </div>
            <div></div>
            <div></div>
        </div>
     );
}
 
export default ItemContent;