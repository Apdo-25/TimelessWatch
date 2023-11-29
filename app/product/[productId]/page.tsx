import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { Metadata } from "next";
import getProductById from "@/actions/getProductsById";
import NullData from "@/app/components/NullData";

interface IPrams {
  productId?: string;
}

export const metadata: Metadata = {
  title: "Product",
  description: "Product",
};

const Product = async ({ params }: { params: IPrams }) => {
  const product = await getProductById(params);

  if (!product) {
    return <NullData title="Oops! Product with the given id does not exist." />;
  }

  return (
    <div>
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
