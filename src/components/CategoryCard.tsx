
interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    count: number;
    image: string;
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { name, count, image } = category;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="h-32 flex items-center justify-center bg-gray-50 relative">
        <img 
          src={image} 
          alt={name}
          className="max-h-full max-w-full object-contain p-4" 
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm text-center">{name}</h3>
        <p className="text-gray-500 text-xs text-center">{count.toLocaleString()} товаров</p>
      </div>
    </div>
  );
};

export default CategoryCard;
