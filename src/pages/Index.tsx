
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import MainBanner from "@/components/MainBanner";
import CartDrawer from "@/components/CartDrawer";

const popularProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 159999,
    rating: 4.9,
    reviews: 342,
    image: "/placeholder.svg",
    discount: 15,
  },
  {
    id: 2,
    name: "Беспроводные наушники Nothing Ear",
    price: 12990,
    rating: 4.7,
    reviews: 128,
    image: "/placeholder.svg",
    discount: 20,
  },
  {
    id: 3,
    name: "Кроссовки спортивные Nike Air Max",
    price: 8990,
    rating: 4.8,
    reviews: 256,
    image: "/placeholder.svg",
    discount: 0,
  },
  {
    id: 4,
    name: "Умные часы Samsung Galaxy Watch 6",
    price: 24990,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg",
    discount: 10,
  },
];

const categories = [
  { id: 1, name: "Электроника", count: 152000, image: "/placeholder.svg" },
  { id: 2, name: "Одежда", count: 243000, image: "/placeholder.svg" },
  { id: 3, name: "Обувь", count: 98000, image: "/placeholder.svg" },
  { id: 4, name: "Дом и сад", count: 124000, image: "/placeholder.svg" },
  { id: 5, name: "Детские товары", count: 87000, image: "/placeholder.svg" },
  { id: 6, name: "Красота", count: 96000, image: "/placeholder.svg" },
];

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(
      cartItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#cb11ab] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="md:hidden">
                <Menu size={24} />
              </button>
              <div className="text-white font-bold text-2xl">
                WILDBERIS
              </div>
              <div className="hidden md:block">
                <Button variant="ghost" className="text-white">
                  <Menu size={20} className="mr-2" />
                  Каталог
                </Button>
              </div>
            </div>
            
            <div className="hidden md:flex flex-1 mx-4">
              <div className="relative w-full max-w-2xl">
                <Input 
                  type="text" 
                  placeholder="Я ищу..." 
                  className="pl-10 pr-4 py-2 rounded-md border-0 text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hidden md:flex" asChild>
                <Link to="/profile">
                  <User size={20} />
                </Link>
              </Button>
              <Button variant="ghost" className="text-white hidden md:flex">
                <Heart size={20} />
              </Button>
              <Button 
                variant="ghost" 
                className="text-white relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-white text-[#cb11ab] px-1.5 py-0.5 text-xs rounded-full">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Я ищу..." 
                className="pl-10 pr-4 py-2 rounded-md border-0 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Main Banner */}
        <MainBanner />

        {/* Popular Products */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Популярные товары</h2>
            <Button variant="link" className="text-[#cb11ab]">
              Показать все
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Категории</h2>
            <Button variant="link" className="text-[#cb11ab]">
              Все категории
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 md:hidden">
          <div className="grid grid-cols-4 py-2">
            <Link to="/" className="flex flex-col items-center text-[#cb11ab]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs mt-1">Главная</span>
            </Link>
            <button className="flex flex-col items-center text-gray-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs mt-1">Поиск</span>
            </button>
            <button className="flex flex-col items-center text-gray-500" onClick={() => setIsCartOpen(true)}>
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[#cb11ab] text-white px-1.5 py-0.5 text-xs rounded-full">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1">Корзина</span>
            </button>
            <Link to="/profile" className="flex flex-col items-center text-gray-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs mt-1">Профиль</span>
            </Link>
          </div>
        </div>

        {/* Info Banner */}
        <section className="mt-12 bg-white rounded-lg p-6 text-center mb-20 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">800 000+ товаров на любой вкус</h2>
          <p className="text-gray-600 mb-4">
            Одежда и обувь, электроника, товары для дома и многое другое
          </p>
          <div className="text-[#cb11ab] font-semibold">
            У вас бесконечный баланс - покупайте всё, что захотите!
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;
