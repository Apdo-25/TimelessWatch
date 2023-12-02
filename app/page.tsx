import Container from "./components/Container";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts from "@/actions/getProducts";
import NullData from "./components/NullData";

export default async function Home() {
  const products = await getProducts();
  if (products.length === 0) {
    return <NullData title="Oops! No products found" />;
  }

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="p-8">
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
    </div>
  );
}
