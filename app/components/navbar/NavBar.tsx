import Container from "../Container";
import Link from "next/link";
import { Chivo  } from "next/font/google";

const chivo = Chivo ({subsets: ["latin"], 
weight: ["400"],
})

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
                    <Link 
                    href="/" 
                    passHref
                    className={`${chivo.className} 
                    text-2xl
                    hover:text-gray-500
                    `}
                    >
                    Timeless Watch
                    </Link>
                    <div className="
                    hidden
                    md:block
                    ">
                        Search
                    </div>
                    <div className="
                    flex
                    item-center
                    gap-8
                    md:gap-12
                    ">
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