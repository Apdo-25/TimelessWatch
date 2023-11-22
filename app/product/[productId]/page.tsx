import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product"
import ListRating from "./ListRating";

interface IPrams {
    productId: string;
}

const Product = ({ params } : {params: IPrams}) => {
    
    return ( 
    <div>
        <Container>
            <ProductDetails product = {product}/>
            <div className="flex flex-col mt-20 gap-4">
                <ListRating product = {product}/>
            </div>
        </Container>
    </div> 
    );
}
 
export default Product;