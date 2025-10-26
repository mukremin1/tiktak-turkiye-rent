import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Fuel, Settings, Shield, Clock, ArrowLeft, Star, Lock, Unlock, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import InsurancePackages from "@/components/InsurancePackages";
import DriverHistoryForm from "@/components/DriverHistoryForm";
import CarLocationMap from "@/components/CarLocationMap";
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
  lock_status: string | null;
  latitude: number | null;
  longitude: number | null;
}

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPricing, setSelectedPricing] = useState<"minute" | "hour" | "day" | null>(null);
  const [selectedKmPackage, setSelectedKmPackage] = useState<string | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [driverVerified, setDriverVerified] = useState(false);
  const [driverRiskLevel, setDriverRiskLevel] = useState<string>("");
  const [lockStatus, setLockStatus] = useState<string>("locked");
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [trafficDelayMinutes, setTrafficDelayMinutes] = useState(10);

  const handleInsuranceSelect = (packageId: string, price: number) => {
    setSelectedInsurance(packageId);
    setInsurancePrice(price);
  };

  const handleDriverVerification = (isApproved: boolean, riskLevel: string) => {
    setDriverVerified(isApproved);
    setDriverRiskLevel(riskLevel);
  };

  const handleLockToggle = async () => {
    if (!user || !car) return;
    
    setIsProcessing(true);
    const newStatus = lockStatus === "locked" ? "unlocked" : "locked";
    
    try {
      // Update car lock status
      const { error: updateError } = await supabase
        .from("cars")
        .update({ lock_status: newStatus })
        .eq("id", car.id);

      if (updateError) throw updateError;

      // Log the action
      const { error: logError } = await supabase
        .from("vehicle_actions")
        .insert({
          car_id: car.id,
          user_id: user.id,
          action_type: newStatus === "locked" ? "lock" : "unlock",
          latitude: car.latitude,
          longitude: car.longitude,
        });

      if (logError) throw logError;

      setLockStatus(newStatus);
      toast({
        title: newStatus === "locked" ? "Araç Kilitlendi" : "Araç Kilidi Açıldı",
        description: `${car.name} ${newStatus === "locked" ? "kilitlendi" : "kilidi açıldı"}`,
      });
    } catch (error) {
      console.error("Kilit işlemi hatası:", error);
      toast({
        title: "Hata",
        description: "Kilit işlemi yapılamadı",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLocationCheck = async () => {
    if (!user || !car) return;

    try {
      // Log location check action
      const { error } = await supabase
        .from("vehicle_actions")
        .insert({
          car_id: car.id,
          user_id: user.id,
          action_type: "location_check",
          latitude: car.latitude,
          longitude: car.longitude,
        });

      if (error) throw error;

      toast({
        title: "Konum Güncellendi",
        description: "Araç konumu kontrol edildi",
      });
    } catch (error) {
      console.error("Konum kontrolü hatası:", error);
    }
  };

  useEffect(() => {
    fetchCar();
    if (user) {
      fetchUserSubscription();
    }
  }, [id, user]);

  const fetchUserSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .gt('end_date', new Date().toISOString())
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

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
      if (data?.lock_status) {
        setLockStatus(data.lock_status);
      }
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

  const handleReserve = async () => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Araç kiralamak için giriş yapmalısınız",
      });
      navigate("/auth");
      return;
    }

    if (!driverVerified) {
      toast({
        title: "Sürücü Doğrulaması Gerekli",
        description: "Kiralama yapabilmek için önce sürücü bilgilerinizi doğrulamanız gerekiyor",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPricing) {
      toast({
        title: "Fiyat Seçimi Gerekli",
        description: "Lütfen bir fiyatlandırma seçeneği seçin",
        variant: "destructive",
      });
      return;
    }

    const startTime = new Date();
    const endTime = new Date();
    let totalPrice = 0;
    
    // Calculate traffic delay (random 0-10 minutes for simulation)
    const simulatedTrafficDelay = Math.floor(Math.random() * 11);
    setTrafficDelayMinutes(simulatedTrafficDelay);
    
    if (selectedPricing === "hour") {
      endTime.setHours(endTime.getHours() + 1);
      totalPrice = car.price_per_hour;
    } else if (selectedPricing === "day") {
      endTime.setDate(endTime.getDate() + 1);
      totalPrice = car.price_per_day;
    } else if (selectedPricing === "minute") {
      endTime.setMinutes(endTime.getMinutes() + 30);
      totalPrice = car.price_per_minute * 30;
    }

    // Apply subscription discount
    if (subscription) {
      const discount = (totalPrice * subscription.discount_percentage) / 100;
      totalPrice = totalPrice - discount;
    }

    try {
      const { error: bookingError } = await supabase.from("bookings").insert({
        car_id: car.id,
        user_id: user.id,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        total_price: totalPrice,
        rental_type: selectedPricing,
        driver_history_checked: driverVerified,
        driver_risk_level: driverRiskLevel || null,
        traffic_delay_minutes: simulatedTrafficDelay,
      });

      if (bookingError) throw bookingError;

      const discountText = subscription ? ` (%${subscription.discount_percentage} abonelik indirimi uygulandı)` : '';
      const trafficText = simulatedTrafficDelay > 0 ? ` Trafik gecikmesi: +${simulatedTrafficDelay} dakika ücretsiz eklendi.` : '';
      toast({
        title: "Rezervasyon Başarılı!",
        description: `${car.name} için rezervasyonunuz oluşturuldu.${discountText}${trafficText}`,
      });
      navigate("/");
    } catch (error: any) {
      console.error("Rezervasyon hatası:", error);
      toast({
        title: "Rezervasyon Hatası",
        description: error.message || "Bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  // Get appropriate image based on car type
  let carImage = carCompact;
  if (car.type === "sedan") carImage = carSedan;
  if (car.type === "suv") carImage = carSuv;
  const displayImage = car.image_url || carImage;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Araçlara Dön
          </Link>

          {subscription && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                🎉 {subscription.tier.toUpperCase()} üyesi olarak %{subscription.discount_percentage} indirim kazanıyorsunuz!
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
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

              {car.latitude && car.longitude && (
                <div className="mt-6">
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground text-lg">Araç Konumu</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLocationCheck}
                        className="gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Konumu Güncelle
                      </Button>
                    </div>
                    <CarLocationMap
                      latitude={Number(car.latitude)}
                      longitude={Number(car.longitude)}
                      carName={car.name}
                    />
                    <div className="mt-4 flex gap-3">
                      <Button
                        variant={lockStatus === "locked" ? "default" : "outline"}
                        className="flex-1 gap-2"
                        onClick={handleLockToggle}
                        disabled={isProcessing || !user}
                      >
                        {lockStatus === "locked" ? (
                          <>
                            <Lock className="w-4 h-4" />
                            Kilitli
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4" />
                            Açık
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={handleLockToggle}
                        disabled={isProcessing || !user}
                      >
                        {lockStatus === "locked" ? (
                          <>
                            <Unlock className="w-4 h-4" />
                            Kilidi Aç
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            Kilitle
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
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
                  <h3 className="font-semibold text-foreground mb-4 text-lg">Fiyatlandırma Seçin</h3>
                  <div className="space-y-3">
                    <Button
                      variant={selectedPricing === "minute" ? "default" : "outline"}
                      className="w-full h-auto py-4 flex items-center justify-between"
                      onClick={() => setSelectedPricing("minute")}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>Dakikalık</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{car.price_per_minute}₺</div>
                        <div className="text-xs opacity-70">dakika başı</div>
                      </div>
                    </Button>

                    <Button
                      variant={selectedPricing === "hour" ? "default" : "outline"}
                      className="w-full h-auto py-4 flex items-center justify-between"
                      onClick={() => setSelectedPricing("hour")}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>Saatlik</span>
                      </div>
                      <div className="text-xl font-semibold">{car.price_per_hour}₺</div>
                    </Button>

                    <Button
                      variant={selectedPricing === "day" ? "default" : "outline"}
                      className="w-full h-auto py-4 flex items-center justify-between"
                      onClick={() => setSelectedPricing("day")}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>Günlük</span>
                      </div>
                      <div className="text-xl font-semibold">{car.price_per_day}₺</div>
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">KM Başı Ücret</span>
                      <span className="font-semibold">{car.price_per_km}₺/km</span>
                    </div>
                  </div>

                  {car.km_packages && Object.keys(car.km_packages).length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-3">KM Paketleri (Opsiyonel)</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(car.km_packages).map(([km, price]) => (
                          <Button
                            key={km}
                            variant={selectedKmPackage === km ? "default" : "outline"}
                            className="h-auto py-3 flex flex-col items-center gap-1"
                            onClick={() => setSelectedKmPackage(selectedKmPackage === km ? null : km)}
                          >
                            <span className="font-semibold">{km} KM</span>
                            <span className="text-lg font-bold">{price}₺</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <InsurancePackages 
                  onSelect={handleInsuranceSelect}
                  selectedPackage={selectedInsurance}
                />

                {user && (
                  <div className="mt-6">
                    <DriverHistoryForm 
                      userId={user.id}
                      onVerified={handleDriverVerification}
                    />
                  </div>
                )}

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 mt-6">
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
                  disabled={!car.available || !driverVerified}
                  onClick={handleReserve}
                >
                  {!car.available 
                    ? "Müsait Değil" 
                    : !driverVerified 
                    ? "Önce Sürücü Doğrulaması Yapın" 
                    : "Hemen Kirala"}
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
