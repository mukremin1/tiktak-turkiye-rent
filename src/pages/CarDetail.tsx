import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Fuel, Settings, Shield, Clock, ArrowLeft, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import carCompact from "@/assets/car-compact.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";

interface Car {
  id: string;
  name: string;
  type: string;
  price_per_minute: number;
  price_per_hour: number;
  price_per_day: number;
  price_per_km: number;
  km_packages: Record<string, number>;
  image_url: string | null;
  fuel_type: string;
  transmission: string;
  seats: number;
  available: boolean;
  location: string;
  plate_number: string | null;
  year: number | null;
  description: string | null;
}

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Araç yüklenirken hata:", error);
        toast({
          title: "Hata",
          description: "Araç yüklenemedi",
          variant: "destructive",
        });
        return;
      }

      setCar(data as Car);
    } catch (error) {
      console.error("Araç yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <p className="text-xl text-muted-foreground">Yükleniyor...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Araç Bulunamadı</h1>
            <p className="text-muted-foreground mb-8">Aradığınız araç mevcut değil.</p>
            <Link to="/cars">
              <Button>Araçlara Dön</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleReserve = () => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Araç kiralamak için giriş yapmalısınız",
      });
      navigate("/auth");
      return;
    }

    toast({
      title: "Rezervasyon Başarılı!",
      description: `${car.name} için rezervasyonunuz oluşturuldu. Aracı kilitlemek için QR kodu kullanın.`,
    });
    setTimeout(() => {
      navigate("/cars");
    }, 2000);
  };

  // Get appropriate image based on car type
  let carImage = carCompact;
  if (car.type === "sedan") carImage = carSedan;
  if (car.type === "suv") carImage = carSuv;
  const displayImage = car.image_url || carImage;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Araçlara Dön
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img 
                  src={displayImage} 
                  alt={car.name}
                  className="w-full h-96 object-cover"
                />
                {car.available ? (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-lg px-4 py-2">
                    Müsait
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="absolute top-4 right-4 text-lg px-4 py-2">
                    Kullanımda
                  </Badge>
                )}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4 text-lg">Araç Özellikleri</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Kapasite</div>
                      <div className="font-semibold text-foreground">{car.seats} Kişi</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Fuel className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Yakıt</div>
                      <div className="font-semibold text-foreground">{car.fuel_type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Vites</div>
                      <div className="font-semibold text-foreground">{car.transmission}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Sigorta</div>
                      <div className="font-semibold text-foreground">Tam Kasko</div>
                    </div>
                  </div>
                </div>

                {car.description && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-2">Açıklama</h4>
                    <p className="text-muted-foreground">{car.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-foreground mb-2">{car.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{car.location}</span>
                  </div>
                  {car.plate_number && (
                    <div className="text-sm text-muted-foreground mt-2">
                      Plaka: <span className="font-semibold">{car.plate_number}</span>
                    </div>
                  )}
                  {car.year && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Model Yılı: <span className="font-semibold">{car.year}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                    <span className="text-muted-foreground ml-2">(128 değerlendirme)</span>
                  </div>
                </div>

                <div className="border-t border-border pt-6 mb-6">
                  <h3 className="font-semibold text-foreground mb-4 text-lg">Fiyatlandırma</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Dakikalık</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">{car.price_per_minute}₺</div>
                        <div className="text-sm text-muted-foreground">dakika başı</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Saatlik</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-foreground">{car.price_per_hour}₺</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Günlük</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-foreground">{car.price_per_day}₺</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">KM Başı</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-foreground">{car.price_per_km}₺</div>
                        <div className="text-sm text-muted-foreground">km başına</div>
                      </div>
                    </div>
                  </div>

                  {car.km_packages && Object.keys(car.km_packages).length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-3">KM Paketleri</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(car.km_packages).map(([km, price]) => (
                          <div key={km} className="bg-muted/30 rounded-lg p-3 flex justify-between items-center">
                            <span className="text-muted-foreground">{km} KM</span>
                            <span className="font-semibold text-foreground">{price}₺</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Güvenli Kiralama</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tam kasko sigorta dahil</li>
                    <li>• Yakıt bizden (ücretsiz)</li>
                    <li>• 7/24 yol yardım hizmeti</li>
                    <li>• Ücretsiz iptal (15 dk önce)</li>
                  </ul>
                </div>

                <Button 
                  size="lg"
                  className="w-full text-lg h-14"
                  disabled={!car.available}
                  onClick={handleReserve}
                >
                  {car.available ? "Hemen Kirala" : "Müsait Değil"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
