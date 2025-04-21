
import { useState } from "react";
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
              <Button variant="ghost" className="text-white hidden md:flex">
                <User size={20} />
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

        {/* Info Banner */}
        <section className="mt-12 bg-white rounded-lg p-6 text-center">
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
