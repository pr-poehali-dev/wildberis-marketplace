
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Heart, 
  ShoppingBag, 
  Clock, 
  ChevronRight, 
  LogOut, 
  Edit3, 
  Plus, 
  Package 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null
  });
  
  // Загрузка изображения для нового товара
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // Обычно здесь была бы логика загрузки файла на сервер
      // В этом демо мы просто сохраняем факт, что изображение выбрано
      setNewProduct({ ...newProduct, image: event.target.files[0] });
    }
  };
  
  // Обработка формы добавления нового товара
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Здесь была бы логика отправки данных на сервер
    alert("Товар успешно добавлен!");
    // Сброс формы
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null
    });
  };
  
  return (
    <div className="pb-20">
      {/* Верхняя панель */}
      <div className="bg-[#cb11ab] text-white p-4">
        <h1 className="text-xl font-bold text-center">Профиль</h1>
      </div>
      
      {/* Информация о пользователе */}
      <div className="bg-white p-4 flex items-center">
        <Avatar className="h-16 w-16 mr-4">
          <User size={30} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg">Пользователь</h2>
          <p className="text-gray-500">+7 (XXX) XXX-XX-XX</p>
        </div>
        <Button variant="ghost" className="ml-auto">
          <Edit3 size={20} />
        </Button>
      </div>
      
      {/* Информация о балансе */}
      <div className="bg-white mt-2 p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Баланс</div>
            <div className="text-xl font-bold">∞ ₽</div>
          </div>
          <Link to="/cart">
            <Button className="bg-[#cb11ab] hover:bg-[#a811cb]">
              Перейти в корзину
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Меню пользователя */}
      <div className="bg-white mt-2">
        <h3 className="p-4 font-medium">Покупки</h3>
        
        <div className="divide-y">
          <Link to="/cart" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <ShoppingBag className="mr-3 text-[#cb11ab]" size={20} />
              <span>Корзина</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </Link>
          
          <Link to="/favorites" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Heart className="mr-3 text-[#cb11ab]" size={20} />
              <span>Избранное</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </Link>
          
          <Link to="/orders" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Package className="mr-3 text-[#cb11ab]" size={20} />
              <span>Заказы</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </Link>
          
          <Link to="/history" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Clock className="mr-3 text-[#cb11ab]" size={20} />
              <span>История просмотров</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </Link>
        </div>
      </div>
      
      {/* Секция с продажей товаров */}
      <div className="bg-white mt-2">
        <h3 className="p-4 font-medium">Продажа товаров</h3>
        
        {/* Диалог для добавления нового товара */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center mx-4 mb-4 bg-[#cb11ab] hover:bg-[#a811cb]">
              <Plus size={18} className="mr-2" />
              Добавить товар
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавление нового товара</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="product-name">Название товара</Label>
                <Input 
                  id="product-name" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="product-category">Категория</Label>
                <Input 
                  id="product-category" 
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="product-price">Цена (₽)</Label>
                <Input 
                  id="product-price" 
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  min="1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="product-description">Описание</Label>
                <Textarea 
                  id="product-description" 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="product-image">Изображение товара</Label>
                <Input 
                  id="product-image" 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-[#cb11ab] hover:bg-[#a811cb]">
                Опубликовать товар
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Список ваших товаров на продаже */}
        <div className="border-t p-4">
          <div className="text-center text-gray-500 py-8">
            У вас пока нет товаров на продаже
          </div>
        </div>
      </div>
      
      {/* Выход из аккаунта */}
      <div className="bg-white mt-2 p-4">
        <button className="flex items-center text-gray-700 w-full">
          <LogOut className="mr-3 text-[#cb11ab]" size={20} />
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
