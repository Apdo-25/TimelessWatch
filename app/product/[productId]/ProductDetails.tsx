"use client"
import SetQuantity from "@/app/components/products/SetQuantity";
import SetColor from "@/app/components/products/SetColor";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";
import Button from "@/app/components/Button";
import { formatPrice } from "@/utils/formatPrice";
import ProductImage from "@/app/components/products/ProductImage";


export type CartProductType = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectedImage: SelectedImageType;
    quantity: number;
    price: number;
}

export type SelectedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

interface ProductDetailsProps {
    product: any;
}

const Horizline = () => {
    return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ( { product }) => {

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImage: {...product.images[0]},
        quantity: 1,
        price: product.price,
    })

    const ProductRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    const handleColorSelect = useCallback(
        (value: SelectedImageType) => {
          setCartProduct((prev) => {
            return { ...prev, selectedImage: value };
          });
        },
        []
      );

      const handleQtyIncrease = useCallback(() => {

        //limit product to 10 /test
        if (cartProduct.quantity === 10) {
            return 
        }

        setCartProduct((prev) => {
          return { ...prev, quantity: prev.quantity + 1 };
        });
      }, [cartProduct])
      const handleQtyDecrease = useCallback(() => {

        //cant go in minus
        if (cartProduct.quantity === 1) {
            return 
        }

        setCartProduct((prev) => {
          return { ...prev, quantity: prev.quantity - 1 };
        });
      }, [cartProduct])

      console.log(product);

    return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage 
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
        />
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <div className="
            text-2xl
            font-semibold
            text-teal-400
            ">
                {formatPrice(product.price)}
            </div>
            <div className="flex items-center gap-2">
                <Rating value={ProductRating} readOnly />
                <div className="text-slate-600 ml-2">{product.reviews.length} reviews</div>
            </div>
            <Horizline />
            <div className="text-justify"> {product.description} 
            </div>
            <Horizline />
            <div>
                <span className="font-semibold">CATEGORY: </span> 
                {product.category}
            </div>
            <div>
                <span className="font-semibold">BRAND: </span>
                {product.brand}
            </div>
            <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                {product.inStock ? "In stock" : "Out of stock"}
            </div>
            <Horizline />
            <SetColor 
            images={product.images}
            cartProduct={cartProduct}
            handleColorSelect={handleColorSelect}
            />
            <Horizline />
            <SetQuantity 
            cartProduct={cartProduct}
            handleQtyDecrease={
                handleQtyDecrease
            }
            handleQtyIncrease={
                handleQtyIncrease
            }
            />
            <Horizline />
            <div className="max-w-[300px]">
            <Button
            label="Add to cart"
            onClick={() => {console.log(cartProduct);}}/>
            </div>
        </div>
    </div> 
    );
}
 
export default ProductDetails;