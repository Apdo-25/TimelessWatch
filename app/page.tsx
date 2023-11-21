import Container from "./components/Container";
import HeroBanner from "./components/HeroBanner";
import {products} from "@/utils/data"

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HeroBanner/>
        </div>
        <div>
          {products.map((product: any) => {
            return <div key={product.id}> {product.name} </div>
          })}
        </div>
      </Container>
    </div>
  )
}
