import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe, Instagram, MessageCircle, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockData = [
  { id: 1, name: "Sheraton Astana Hotel", type: "Отель", price: "Цена за ночь: 54 900 KZT", image: "/hotel1.jpg", description: "Sheraton Astana Hotel — пятизвездочный отель в центре Астаны с 191 номером, ресторанами, спа-комплексом и конференц-залами.", website: "https://www.booking.com/hotel/kz/sheraton-nur-sultan-hotel.ru.html" },
  { id: 2, name: "Hilton Garden Inn", type: "Отель", price: "Цена за ночь: 44 727 KZT", image: "/hotel2.jpg", description: "Hilton Garden Inn Astana — современный отель в центре Астаны с 248 номерами, рестораном, фитнес-центром и бесплатным Wi-Fi.", website: "https://www.booking.com/hotel/kz/hilton-garden-inn-astana.ru.html" },
  { id: 3, name: "St. Regis Astana", type: "Отель", price: "Цена за ночь: 78 400 KZT", image: "/hotel3.jpg", description: "The St. Regis Astana — роскошный отель в центре Астаны с 120 номерами, включая люксы, изысканными ресторанами, спа-центром и конференц-залами.", website: "https://www.booking.com/hotel/kz/the-st-regis-astana.ru.html" },
  { id: 4, name: "Чайхана Navat", type: "Ресторан", price: "Средний чек: 10 000 KZT", image: "/rest1.jpg", description: "Чайхана NAVAT – сеть ресторанов восточной кухни с уютной атмосферой, узбекскими и казахскими блюдами, VIP-залами и летними террасами.", website: "https://www.navat.kz", instagram: "https://www.instagram.com/navat_astana/" },
  { id: 5, name: "Ресторан Sandyq", type: "Ресторан", price: "Средний чек: 15 000 KZT", image: "/rest2.jpg", description: "Ресторан Sandyq – аутентичное заведение с казахской кухней, оформленное в традиционном стиле с уникальными ремесленными изделиями и авторскими блюдами.", website: "https://sandyq.kz", instagram: "https://www.instagram.com/sandyq_restaurant/" },
  { id: 6, name: "Кофейня Coffee BOOM", type: "Ресторан", price: "Средний чек: 8 000 KZT", image: "/rest3.jpg", description: "Coffee BOOM – сеть кофеен с уютной атмосферой, авторскими десертами и широким выбором кофе. Работает в Казахстане, Узбекистане и России.", website: "https://coffeeboom.kz", instagram: "https://www.instagram.com/coffeeboom2010/" },
  { id: 7, name: "Тур в Боровое", type: "Тур", price: "150 000 KZT за 3 дня", image: "/tour1.jpg", description: "Тур в Боровое – живописный отдых среди озёр, сосновых лесов и гор. Прогулки, катание на лодке, свежий воздух и природные красоты ждут вас!", whatsapp: "http://wa.me/77777395230" },
  { id: 8, name: "Сакральный Туркестан", type: "Тур", price: "200 000 KZT за 3 дня", image: "/tour2.jpg", description: "Тур в Сакральный Туркестан – путешествие по древним святыням, мавзолеям и историческим местам, погружение в богатое культурное наследие Казахстана.", whatsapp: "http://wa.me/77777395230" },
  { id: 9, name: "По горам Алматы", type: "Тур", price: "250 000 KZT за 3 дня", image: "/tour3.jpg", description: "Тур по горам Алматы – захватывающие панорамы, чистый воздух, треккинг, катание на канатке и отдых в горных ущельях Тянь-Шаня.", whatsapp: "http://wa.me/77777395230" },
];

export default function BookingMVP() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", date: "" });

  const handleSubmit = () => {
    if (form.name && form.phone && form.date) {
      setSubmitted(true);
      setError("");
    } else {
      setError("Пожалуйста, заполните все поля");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Бронирование отелей, ресторанов и туров</h1>
      <div className="flex space-x-4 mb-4">
        {["Все", "Отель", "Ресторан", "Тур"].map((tab) => (
          <Button
            key={tab}
            className={category === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
      <Input placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockData
          .filter((item) =>
            (category === "Все" || item.type === category) &&
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <motion.div key={item.id} whileHover={{ scale: 1.05 }} className="rounded-lg overflow-hidden shadow-lg">
              <Card>
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <CardContent>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.type}</p>
                  <p className="text-gray-800 font-bold">{item.price}</p>
                  {item.description && <p className="text-gray-600 mt-2">{item.description}</p>}
                  <div className="flex space-x-4 mt-2">
                    {item.website && (
                      <a href={item.website} target="_blank" className="text-blue-500">
                        <Globe size={24} />
                      </a>
                    )}
                    {item.instagram && (
                      <a href={item.instagram} target="_blank" className="text-pink-500">
                        <Instagram size={24} />
                      </a>
                    )}
                    {item.whatsapp && (
                      <a href={item.whatsapp} target="_blank" className="text-green-500">
                        <MessageCircle size={24} />
                      </a>
                    )}
                  </div>
                  <Button className="mt-2 w-full" onClick={() => { setOpen(true); setSubmitted(false); setForm({ name: "", phone: "", date: "" }); setError(""); }}>
                    Забронировать
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{submitted ? "Спасибо!" : "Оформление брони"}</DialogTitle>
          </DialogHeader>
          {!submitted ? (
            <>
              <Input placeholder="Имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mb-2" />
              <Input placeholder="Номер телефона" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mb-2" />
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mb-2" />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <Button onClick={handleSubmit} className="w-full">Отправить</Button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <CheckCircle size={48} className="text-green-500" />
              <p className="mt-2">Скоро мы свяжемся с вами!</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
