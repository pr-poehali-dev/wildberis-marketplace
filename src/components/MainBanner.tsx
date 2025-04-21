
import { Button } from "@/components/ui/button";

const MainBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#cb11ab] to-[#a811cb] rounded-lg overflow-hidden shadow-md">
      <div className="flex flex-col md:flex-row items-center">
        <div className="p-8 md:w-1/2 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Миллионы товаров для вас!
          </h1>
          <p className="mb-6 text-white/90">
            Откройте для себя огромный ассортимент товаров — всё, что вы ищете, уже здесь! 
            Более 800 000 товаров с бесплатной доставкой.
          </p>
          <Button 
            className="bg-white text-[#cb11ab] hover:bg-white/90 shadow-md"
            size="lg"
          >
            Смотреть товары
          </Button>
        </div>
        
        <div className="md:w-1/2">
          <div className="flex items-center justify-center p-4">
            <img 
              src="/placeholder.svg" 
              alt="Акция" 
              className="max-h-[300px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
