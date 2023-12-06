import Container from "../Container";
import Link from "next/link";
import { Chivo } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/actions/getCurrentUser";
import SearchBar from "./SearchBar";
import { safeUser } from "@/types";

const chivo = Chivo({ subsets: ["latin"], weight: ["400"] });

interface NavBarProps {
  currentUser: safeUser | null;
}

const Navbar: React.FC<NavBarProps> = async ({ currentUser }) => {
  return (
    <div
      className="
      sticky
      w-full
      bg-slate-200
      z-30
      shadow-sm
      top-0
    "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
            "
          >
            <Link
              href="/"
              passHref
              className={`${chivo.className} 
              font-bold text-2xl
                    `}
            >
              Timeless Watch
            </Link>
            <div
              className="
                    hidden
                    md:block
                    "
            >
              <SearchBar />
            </div>
            <div
              className="
                    flex
                    items-center
                    gap-8
                    md:gap-12
                    "
            >
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
