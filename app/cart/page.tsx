import Container from "../components/Container";
import CartClient from "./CartClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart",
    description: "Cart",
}

const Cart = () => {
    return ( 
    <div className="pt-8">
        <Container>
            <CartClient/>
        </Container>
    </div> 
    );
}
 
export default Cart;