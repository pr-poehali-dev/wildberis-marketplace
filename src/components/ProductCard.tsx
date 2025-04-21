
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    discount: number;
  };
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { id, name, price, rating, reviews, image, discount } = product;
  
  // Calculate discount price
  const discountedPrice = discount > 0 
    ? Math.round(price - (price * discount / 100)) 
    : price;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <Link to={`/product/${id}`} className="block">
        <div className="relative">
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
          <button 
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking the heart
              // Add favorite logic here
            }}
          >
            <Heart size={18} className="text-gray-400 hover:text-[#cb11ab]" />
          </button>
          <div className="h-48 flex items-center justify-center bg-gray-50">
            <img 
              src={image} 
              alt={name}
              className="max-h-full max-w-full object-contain p-4" 
            />
          </div>
        </div>
        
        <div className="p-3">
          <div className="flex items-center text-sm text-yellow-500 mb-1">
            {'★'.repeat(Math.floor(rating))}
            {rating % 1 > 0 ? '☆' : ''}
            <span className="text-gray-500 ml-1 text-xs">{reviews}</span>
          </div>
          
          <h3 className="font-medium text-sm line-clamp-2 h-10 mb-1">{name}</h3>
          
          <div className="mt-2">
            <div className="font-bold text-lg">{discountedPrice.toLocaleString()} ₽</div>
            {discount > 0 && (
              <div className="text-gray-400 text-sm line-through">
                {price.toLocaleString()} ₽
              </div>
            )}
          </div>
        </div>
      </Link>
      
      <div className="px-3 pb-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-center border border-[#cb11ab] text-[#cb11ab] hover:bg-[#cb11ab] hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          <ShoppingCart size={16} className="mr-1" />
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
