
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemove, 
  onUpdateQuantity 
}: CartDrawerProps) => {
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const calculateItemPrice = (item: CartItem) => {
    const discountedPrice = item.discount > 0 
      ? Math.round(item.price - (item.price * item.discount / 100)) 
      : item.price;
    return discountedPrice * item.quantity;
  };
  
  const totalPrice = cartItems.reduce((sum, item) => sum + calculateItemPrice(item), 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Корзина
              {totalItems > 0 && <span className="ml-2 text-gray-500">({totalItems})</span>}
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={18} />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-grow overflow-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingCart size={64} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Корзина пуста</h3>
              <p className="text-gray-500 mb-6">Добавьте товары, чтобы сделать заказ</p>
              <Button onClick={onClose} className="bg-[#cb11ab] hover:bg-[#a811cb]">
                Перейти к покупкам
              </Button>
            </div>
          ) : (
            <div className="py-4">
              {cartItems.map((item) => {
                const itemPrice = calculateItemPrice(item);
                
                return (
                  <div key={item.id} className="flex p-4 border-b">
                    <div className="w-20 h-20 bg-gray-50 rounded flex-shrink-0 mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-2" 
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-400 hover:text-gray-700 ml-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <button 
                            className="px-2 py-1 text-gray-500" 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 py-1 min-w-[30px] text-center">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-gray-500" 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold">{itemPrice.toLocaleString()} ₽</div>
                          {item.discount > 0 && (
                            <div className="text-gray-400 text-xs line-through">
                              {(item.price * item.quantity).toLocaleString()} ₽
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="flex-col gap-3 p-4 border-t mt-auto">
            <div className="w-full flex justify-between items-center text-lg font-bold">
              <span>Итого:</span>
              <span>{totalPrice.toLocaleString()} ₽</span>
            </div>
            <div className="text-gray-500 text-sm mb-4 w-full">
              Баланс: ∞ ₽ (бесконечно)
            </div>
            <Button className="w-full bg-[#cb11ab] hover:bg-[#a811cb]">
              Оформить заказ
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
