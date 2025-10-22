import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const Cars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || car.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Müsait Araçlar
            </h1>
            <p className="text-xl text-muted-foreground">
              Yakınındaki araçları keşfet ve hemen kirala
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Araç veya lokasyon ara..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtrele
              </Button>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <Button 
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                Tümü
              </Button>
              <Button 
                variant={selectedType === "compact" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("compact")}
              >
                Kompakt
              </Button>
              <Button 
                variant={selectedType === "sedan" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("sedan")}
              >
                Sedan
              </Button>
              <Button 
                variant={selectedType === "suv" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("suv")}
              >
                SUV
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Aramanıza uygun araç bulunamadı
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cars;
