import Container from "../Container";
import Link from "next/link";

const Navbar = () => {
    return ( 
    <div className="
    sticky
    top-0
    w-full
    bg-slate-400
    z-30
    shadow-sm
    ">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div
                className="
                flex
                justify-between
                items-center
                gap-3
                md-gap-0
                "
                >
                    <Link href="/">
                    Timeless Watch
                    </Link>
                    <div>Search</div>
                    <div>
                        <div>CartCount</div>
                        <div>UserMenu</div>
                    </div>
                </div>
            </Container>
        </div>
    </div> 
    );
}
 
export default Navbar;