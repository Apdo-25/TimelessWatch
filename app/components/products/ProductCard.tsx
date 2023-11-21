import Image from "next/image";
import Link from "next/link";

interface Review {
    rating: number;
  }
  
  interface ProductImage {
    color: string;
    colorCode: string;
    image: string;
  }
  
  interface ProductData {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    inStock: boolean;
    images: ProductImage[];
    reviews: Review[];
  }
  
  interface ProductCardProps {
    data: ProductData;
  }

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {

    const averageRating = data.reviews.length
    ? data.reviews.reduce((acc, review) => acc + review.rating, 0) / data.reviews.length
    : 0;

    const renderStars = () => {
        return [...Array(5)].map((_, index) => (
          <svg
            key={index}
            aria-hidden="true"
            className={`h-5 w-5 ${index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            
          </svg>
        ));
      };

      return (
        <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <Image
            src={data.images[0].image}
            alt={data.name}
            width={500}
            height={500}
            objectFit="cover"
            className="rounded-t-lg"
          />
          {data.price < 1000 && (
            <span className="absolute top-0 left-0 w-16 h-16 bg-black text-center text-sm text-white flex items-center justify-center transform translate-x-4 -translate-y-4 rotate-45">
              Sale
            </span>
          )}
          <div className="p-5">
            <Link href={`/product/${data.id}`} passHref>
              <h5 className="text-xl font-semibold tracking-tight text-slate-900 hover:text-slate-700 cursor-pointer">
                {data.name}
              </h5>
            </Link>
            <div className="flex items-center mt-2.5 mb-5">
              {renderStars()}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-slate-900">${data.price}</span>
              <Link href={`/product/${data.id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-200 cursor-pointer">
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      );
    };
    
export default ProductCard;
