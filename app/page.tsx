import Container from "./components/Container";
import HeroBanner from "./components/HeroBanner";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HeroBanner/>
        </div>
      </Container>
    </div>
  )
}
