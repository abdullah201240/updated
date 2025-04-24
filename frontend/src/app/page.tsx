import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Modern Sofa",
      price: "$599",
      image: "/sofa.jpg"
    },
    {
      id: 2,
      name: "Wooden Dining Table",
      price: "$899",
      image: "/table.jpg"
    },
    {
      id: 3,
      name: "Minimalist Chair",
      price: "$249",
      image: "/chair.jpg"
    },
    {
      id: 4,
      name: "Storage Cabinet",
      price: "$399",
      image: "/cabinet.jpg"
    }
  ];

  const categories = [
    {
      name: "Living Room",
      image: "/living-room.jpg"
    },
    {
      name: "Bedroom",
      image: "/bedroom.jpg"
    },
    {
      name: "Dining",
      image: "/dining.jpg"
    },
    {
      name: "Office",
      image: "/office.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] w-full section">
          <div className="container h-full flex flex-col justify-center items-start text-white relative z-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-2xl">
              Elevate Your Space With Modern Furniture
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl">
              Discover premium furniture that combines comfort, style and functionality.
            </p>
            <Button 
              size="lg" 
              className="bg-[#F6951E] hover:bg-[#F6951E]/90 text-white px-8 py-6 text-lg"
            >
              Shop Now
            </Button>
          </div>
          <Image 
            src="/hero.jpg" 
            alt="Modern Furniture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 container section">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-[#F6951E] font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24 bg-gray-50 section">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Shop By Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}