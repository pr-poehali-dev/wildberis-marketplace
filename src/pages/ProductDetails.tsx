
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Heart, Star, ShoppingCart, Share2, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";

// Фиктивные данные для товаров
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 159999,
    rating: 4.9,
    reviews: 342,
    reviewsList: [
      { id: 1, author: "Александр", date: "15.05.2023", rating: 5, text: "Отличный телефон! Очень быстрый, камера великолепная. Батарея держит целый день.", helpful: 89, unhelpful: 4 },
      { id: 2, author: "Елена", date: "30.04.2023", rating: 5, text: "Перешла с iPhone 13 Pro, разница ощутимая. Титановый корпус приятно лежит в руке, камера просто бомба!", helpful: 65, unhelpful: 2 },
      { id: 3, author: "Михаил", date: "28.04.2023", rating: 4, text: "Хороший телефон, но цена кусается. Камера отличная, процессор мощный, но нет ничего революционного по сравнению с 14 Pro.", helpful: 42, unhelpful: 8 }
    ],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    discount: 15,
    description: "iPhone 15 Pro Max с превосходным дисплеем OLED Super Retina XDR 6,7 дюйма, процессором A17 Pro, системой камер профессионального уровня с 48-мегапиксельным сенсором и возможностью съёмки в Dolby Vision 4K при 60fps. Титановый корпус, технология Dynamic Island и всегда активный экран.",
    sold: 15872,
    specifications: [
      { name: "Производитель", value: "Apple" },
      { name: "Модель", value: "iPhone 15 Pro Max" },
      { name: "Год выпуска", value: "2023" },
      { name: "ОС", value: "iOS 17" },
      { name: "Процессор", value: "A17 Pro" },
      { name: "Память", value: "256 ГБ" },
      { name: "Экран", value: "6,7″ OLED Super Retina XDR" },
      { name: "Камера", value: "48 Мп (основная) + 12 Мп (сверхширокоугольная) + 12 Мп (телефото)" },
      { name: "Аккумулятор", value: "4422 мАч" }
    ],
    color: "Титановый черный",
    options: ["128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ"],
    seller: "ООО Яблоко"
  },
  {
    id: 2,
    name: "Беспроводные наушники Nothing Ear",
    price: 12990,
    rating: 4.7,
    reviews: 128,
    reviewsList: [
      { id: 1, author: "Максим", date: "10.06.2023", rating: 5, text: "Отличное качество звука и шумоподавление. Прозрачный корпус выглядит стильно.", helpful: 42, unhelpful: 3 },
      { id: 2, author: "Дарья", date: "25.05.2023", rating: 4, text: "Хорошие наушники за свои деньги. Звук чистый, но басов могло бы быть больше.", helpful: 29, unhelpful: 5 }
    ],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    discount: 20,
    description: "Беспроводные наушники Nothing Ear с активным шумоподавлением до 40 дБ, прозрачным корпусом, батареей на 6 часов воспроизведения (24 часа с кейсом) и поддержкой быстрой зарядки. Защита от пота и влаги IPX4.",
    sold: 4251,
    specifications: [
      { name: "Производитель", value: "Nothing" },
      { name: "Модель", value: "Ear (2)" },
      { name: "Тип", value: "TWS (True Wireless Stereo)" },
      { name: "Шумоподавление", value: "Активное, до 40 дБ" },
      { name: "Время работы", value: "До 6 часов (до 24 часов с кейсом)" },
      { name: "Защита", value: "IPX4" },
      { name: "Подключение", value: "Bluetooth 5.3" }
    ],
    color: "Прозрачный",
    options: ["Белый", "Черный"],
    seller: "Nothing Technology Limited"
  },
  {
    id: 3,
    name: "Кроссовки спортивные Nike Air Max",
    price: 8990,
    rating: 4.8,
    reviews: 256,
    reviewsList: [
      { id: 1, author: "Иван", date: "20.07.2023", rating: 5, text: "Очень удобные кроссовки, ношу каждый день. Хорошо амортизируют при беге.", helpful: 78, unhelpful: 2 },
      { id: 2, author: "Анна", date: "15.07.2023", rating: 5, text: "Стильные и удобные. Взяла на повседневную носку, всем довольна.", helpful: 45, unhelpful: 1 }
    ],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    discount: 0,
    description: "Культовые кроссовки Nike Air Max с характерной воздушной подушкой в подошве, обеспечивающей отличную амортизацию. Дышащий верх из сетчатого материала, удобная посадка и стильный дизайн подходят как для занятий спортом, так и для повседневной носки.",
    sold: 9854,
    specifications: [
      { name: "Производитель", value: "Nike" },
      { name: "Модель", value: "Air Max" },
      { name: "Материал верха", value: "Текстиль, синтетика" },
      { name: "Материал подошвы", value: "Резина" },
      { name: "Тип застежки", value: "Шнуровка" },
      { name: "Сезон", value: "Демисезон" },
      { name: "Стиль", value: "Спортивный" }
    ],
    color: "Белый/Черный",
    options: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    seller: "Nike Inc."
  },
  {
    id: 4,
    name: "Умные часы Samsung Galaxy Watch 6",
    price: 24990,
    rating: 4.6,
    reviews: 189,
    reviewsList: [
      { id: 1, author: "Сергей", date: "18.08.2023", rating: 5, text: "Отличные часы с множеством функций. Батарея держит 2-3 дня при активном использовании.", helpful: 56, unhelpful: 3 },
      { id: 2, author: "Ольга", date: "10.08.2023", rating: 4, text: "Дизайн супер, много функций для отслеживания здоровья. Единственный минус - цена.", helpful: 34, unhelpful: 5 }
    ],
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    discount: 10,
    description: "Samsung Galaxy Watch 6 с AMOLED дисплеем 1,5 дюйма, защитой Sapphire Crystal, возможностью отслеживания более 90 видов тренировок и мониторингом здоровья (ЭКГ, давление, сон, стресс). Водонепроницаемость до 50 метров (5 ATM), батарея до 40 часов работы.",
    sold: 3654,
    specifications: [
      { name: "Производитель", value: "Samsung" },
      { name: "Модель", value: "Galaxy Watch 6" },
      { name: "Экран", value: "1,5″ AMOLED" },
      { name: "Защита экрана", value: "Sapphire Crystal" },
      { name: "Процессор", value: "Exynos W930" },
      { name: "Память", value: "2 ГБ RAM, 16 ГБ ROM" },
      { name: "Аккумулятор", value: "425 мАч" },
      { name: "Водонепроницаемость", value: "5 ATM + IP68" },
      { name: "ОС", value: "Wear OS, One UI Watch" }
    ],
    color: "Черный",
    options: ["40mm", "44mm"],
    seller: "Samsung Electronics"
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  
  useEffect(() => {
    // Имитация загрузки данных с сервера
    const productId = parseInt(id as string);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedOption(foundProduct.options[0]);
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cb11ab]"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
        <Button asChild>
          <Link to="/">Вернуться на главную</Link>
        </Button>
      </div>
    );
  }
  
  // Расчет рейтинга отзывов
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  product.reviewsList.forEach((review: any) => {
    ratingCounts[review.rating as keyof typeof ratingCounts]++;
  });
  
  // Расчет цены с учетом скидки
  const discountedPrice = product.discount > 0 
    ? Math.round(product.price - (product.price * product.discount / 100)) 
    : product.price;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Верхняя панель */}
      <header className="bg-[#cb11ab] text-white sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="text-white flex items-center">
            <ChevronLeft size={24} />
            <span className="ml-2">Назад</span>
          </Link>
          <h1 className="text-lg font-medium ml-4 truncate flex-1">{product.name}</h1>
          <button className="ml-auto">
            <Share2 size={20} />
          </button>
          <button className="ml-4">
            <Heart size={20} />
          </button>
        </div>
      </header>
      
      <div className="container mx-auto px-4">
        {/* Изображения товара */}
        <div className="bg-white rounded-lg mt-4 p-4">
          <div className="relative pb-4">
            {product.discount > 0 && (
              <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white">
                -{product.discount}%
              </Badge>
            )}
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="max-h-full max-w-full object-contain" 
              />
            </div>
            
            {/* Галерея миниатюр */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    className={`w-16 h-16 rounded-md border flex-shrink-0 overflow-hidden ${selectedImage === idx ? 'border-[#cb11ab] border-2' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - фото ${idx + 1}`}
                      className="w-full h-full object-contain" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Основная информация */}
        <div className="bg-white rounded-lg mt-4 p-4">
          <div className="mb-2 flex items-center">
            <div className="flex items-center text-sm text-yellow-500">
              <Star size={16} fill="#FFD700" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <div className="text-gray-500 text-sm ml-2">({product.reviews} отзывов)</div>
            <div className="ml-auto text-gray-500 text-sm">Продано: {product.sold}</div>
          </div>
          
          <h1 className="text-xl font-medium">{product.name}</h1>
          
          <div className="flex items-baseline mt-4">
            <div className="text-2xl font-bold">{discountedPrice.toLocaleString()} ₽</div>
            {product.discount > 0 && (
              <div className="text-gray-400 text-sm line-through ml-2">
                {product.price.toLocaleString()} ₽
              </div>
            )}
          </div>
          
          {/* Продавец */}
          <div className="mt-4 text-sm text-gray-600">
            Продавец: {product.seller}
          </div>
          
          {/* Цвет */}
          {product.color && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Цвет: {product.color}</div>
            </div>
          )}
          
          {/* Опции */}
          {product.options && product.options.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Выберите вариант:</div>
              <div className="flex flex-wrap gap-2">
                {product.options.map((option: string) => (
                  <button
                    key={option}
                    className={`px-3 py-1.5 border rounded-md text-sm font-medium ${
                      selectedOption === option
                        ? 'border-[#cb11ab] text-[#cb11ab] bg-purple-50'
                        : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Количество */}
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Количество:</div>
            <div className="flex items-center border rounded-md w-36">
              <button 
                className="px-3 py-2 text-gray-500" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="w-full text-center border-none focus:outline-none"
                value={quantity}
                min="1"
                max="99"
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= 99) {
                    setQuantity(val);
                  }
                }}
              />
              <button 
                className="px-3 py-2 text-gray-500" 
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Кнопки действий */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button 
              className="bg-[#cb11ab] hover:bg-[#a811cb] text-white font-medium"
            >
              Купить сейчас
            </Button>
            <Button 
              variant="outline" 
              className="border-[#cb11ab] text-[#cb11ab] hover:bg-[#cb11ab] hover:text-white font-medium"
            >
              <ShoppingCart size={18} className="mr-2" />
              В корзину
            </Button>
          </div>
        </div>
        
        {/* Табы с информацией */}
        <div className="bg-white rounded-lg mt-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            
            {/* Описание */}
            <TabsContent value="description" className="p-4">
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </TabsContent>
            
            {/* Характеристики */}
            <TabsContent value="specs" className="p-4">
              <div className="space-y-3">
                {product.specifications.map((spec: any, idx: number) => (
                  <div key={idx} className="flex border-b border-gray-100 pb-2 last:border-0">
                    <div className="w-1/2 text-gray-500">{spec.name}</div>
                    <div className="w-1/2 font-medium">{spec.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Отзывы */}
            <TabsContent value="reviews" className="divide-y">
              {/* Сводка отзывов */}
              <div className="p-4">
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div className="text-sm text-gray-500 ml-2">из 5</div>
                </div>
                
                <div className="flex items-center mb-1 text-yellow-500">
                  {'★'.repeat(Math.floor(product.rating))}
                  {product.rating % 1 > 0 ? '☆' : ''}
                </div>
                
                <div className="text-gray-500 text-sm mb-4">На основе {product.reviews} отзывов</div>
                
                {/* Распределение оценок */}
                <div className="space-y-2 mb-6">
                  {[5, 4, 3, 2, 1].map(rating => {
                    const count = ratingCounts[rating as keyof typeof ratingCounts];
                    const percentage = product.reviews ? Math.round((count / product.reviews) * 100) : 0;
                    
                    return (
                      <div key={rating} className="flex items-center">
                        <div className="w-10 text-sm text-gray-500">{rating} ★</div>
                        <div className="flex-1 mx-2">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <div className="w-10 text-sm text-gray-500 text-right">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
                
                <Button className="w-full bg-[#cb11ab] hover:bg-[#a811cb]">
                  <MessageCircle size={16} className="mr-2" />
                  Написать отзыв
                </Button>
              </div>
              
              {/* Список отзывов */}
              <div className="divide-y">
                {product.reviewsList.map((review: any) => (
                  <div key={review.id} className="p-4">
                    <div className="flex items-center mb-2">
                      <Avatar>
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-medium">
                          {review.author.charAt(0)}
                        </div>
                      </Avatar>
                      <div className="ml-2">
                        <div className="font-medium">{review.author}</div>
                        <div className="text-gray-500 text-xs">{review.date}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-yellow-500 text-sm mb-2">
                      {'★'.repeat(review.rating)}
                    </div>
                    
                    <p className="text-gray-700 mb-3">{review.text}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <span>Полезен отзыв?</span>
                      <button className="ml-2 flex items-center hover:text-[#cb11ab]">
                        <ThumbsUp size={14} className="mr-1" />
                        {review.helpful}
                      </button>
                      <button className="ml-3 flex items-center hover:text-red-500">
                        <ThumbsDown size={14} className="mr-1" />
                        {review.unhelpful}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Похожие товары */}
        <div className="bg-white rounded-lg mt-4 p-4">
          <h2 className="text-lg font-medium mb-4">Похожие товары</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {products
              .filter(p => p.id !== product.id)
              .map(item => (
                <Link 
                  key={item.id} 
                  to={`/product/${item.id}`} 
                  className="min-w-[150px] max-w-[150px] bg-gray-50 rounded-lg p-2 flex flex-col"
                >
                  <div className="h-24 flex items-center justify-center mb-2">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div className="text-sm font-medium line-clamp-2 h-10">{item.name}</div>
                  <div className="mt-auto text-[#cb11ab] font-bold">
                    {(item.discount > 0 
                      ? Math.round(item.price - (item.price * item.discount / 100)) 
                      : item.price).toLocaleString()} ₽
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      
      {/* Нижняя панель для добавления в корзину */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center">
        <div className="flex-1">
          <div className="text-sm text-gray-500">Цена:</div>
          <div className="font-bold">{(discountedPrice * quantity).toLocaleString()} ₽</div>
        </div>
        <Button 
          className="flex-1 h-12 bg-[#cb11ab] hover:bg-[#a811cb]"
        >
          <ShoppingCart size={18} className="mr-2" />
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
