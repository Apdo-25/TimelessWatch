export const revalidate = 0;

import Container from "./components/Container";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  console.log("searchParams>>>>", searchParams);
  if (products.length === 0) {
    return <NullData title="Oops! No products found" />;
  }

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: any[]) => {
    const _array = [...array];
    for (let i = _array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = _array[i];
      _array[i] = _array[j];
      _array[j] = temp;
    }
    return _array;
  };

  const shuffledProducts = shuffleArray(products);

  return (
    <main className="p-8">
      <Container>
        <div>
          <HeroBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return (
              <ProductCard
                key={product.id}
                data={product}
                shuffledProducts={shuffledProducts}
              />
            );
          })}
        </div>
      </Container>
    </main>
  );
}
