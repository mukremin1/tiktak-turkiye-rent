import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Edit, Trash2, Users, Fuel, Settings, Navigation, AlertCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Car {
  id: string;
  name: string;
  type: string;
  price_per_minute: number;
  price_per_hour: number;
  price_per_day: number;
  price_per_km: number;
  km_packages: Record<string, number>;
  fuel_type: string;
  transmission: string;
  seats: number;
  available: boolean;
  location: string;
  plate_number: string | null;
  year: number | null;
  description: string | null;
}

interface Reservation {
  car_id: string;
  end_time: string;
}

const MyCars = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeReservations, setActiveReservations] = useState<Map<string, Reservation>>(new Map());
  const [processingCarId, setProcessingCarId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchMyCars();
  }, [user, navigate]);

  const fetchMyCars = async () => {
    try {
      const { data: carsData, error: carsError } = await supabase
        .from("cars")
        .select("*")
        .eq("owner_id", user?.id)
        .order("created_at", { ascending: false });

      if (carsError) {
        console.error("Araçlar yüklenirken hata:", carsError);
        toast.error("Araçlar yüklenemedi");
        return;
      }

      setCars((carsData || []) as Car[]);

      // Fetch active reservations for these cars
      if (carsData && carsData.length > 0) {
        const carIds = carsData.map(car => car.id);
        const now = new Date().toISOString();
        
        const { data: reservations, error: resError } = await supabase
          .from("bookings")
          .select("car_id, end_time")
          .in("car_id", carIds)
          .gt("end_time", now);

        if (!resError && reservations) {
          const resMap = new Map<string, Reservation>();
          reservations.forEach(res => {
            // Keep the latest reservation for each car
            const existing = resMap.get(res.car_id);
            if (!existing || new Date(res.end_time) > new Date(existing.end_time)) {
              resMap.set(res.car_id, res);
            }
          });
          setActiveReservations(resMap);
        }
      }
    } catch (error) {
      console.error("Araçlar yüklenirken hata:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
    // Check for active reservations
    if (activeReservations.has(carId)) {
      toast.error("Aktif rezervasyonu olan araç silinemez");
      return;
    }

    try {
      const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", carId);

      if (error) {
        console.error("Araç silinirken hata:", error);
        toast.error("Araç silinemedi");
        return;
      }

      toast.success("Araç başarıyla silindi");
      fetchMyCars();
    } catch (error) {
      console.error("Araç silinirken hata:", error);
      toast.error("Bir hata oluştu");
    }
  };

  const toggleAvailability = async (carId: string, currentStatus: boolean) => {
    // If trying to close the car (make unavailable), check for reservations
    if (currentStatus && activeReservations.has(carId)) {
      const reservation = activeReservations.get(carId)!;
      const endDate = new Date(reservation.end_time);
      toast.error(
        `Bu aracın aktif rezervasyonu var. Rezervasyon bitiş tarihi: ${endDate.toLocaleDateString('tr-TR', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}`
      );
      return;
    }

    setProcessingCarId(carId);

    try {
      const { error } = await supabase
        .from("cars")
        .update({ available: !currentStatus })
        .eq("id", carId);

      if (error) {
        console.error("Durum güncellenirken hata:", error);
        toast.error("Durum güncellenemedi");
        return;
      }

      toast.success(currentStatus ? "Araç kiralamaya kapatıldı" : "Araç kiralamaya açıldı");
      fetchMyCars();
    } catch (error) {
      console.error("Durum güncellenirken hata:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setProcessingCarId(null);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Araçlarım</h1>
              <p className="text-xl text-muted-foreground">
                Kendi araçlarınızı yönetin
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/gps-tracking">
                <Button variant="outline" size="lg">
                  <Navigation className="w-5 h-5 mr-2" />
                  GPS Takip
                </Button>
              </Link>
              <Link to="/add-car">
                <Button size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Araç Ekle
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Yükleniyor...</p>
            </div>
          ) : cars.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Henüz araç eklemediniz
                </h2>
                <p className="text-muted-foreground mb-6">
                  İlk aracınızı ekleyin ve kiralama işlemlerine başlayın
                </p>
                <Link to="/add-car">
                  <Button size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    İlk Aracı Ekle
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => {
                const hasActiveReservation = activeReservations.has(car.id);
                const reservation = activeReservations.get(car.id);
                
                return (
                  <Card key={car.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {car.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{car.location}</span>
                          </div>
                        </div>
                        <Badge variant={car.available ? "default" : "destructive"}>
                          {car.available ? "Müsait" : "Kapalı"}
                        </Badge>
                      </div>

                      {/* Active Reservation Warning */}
                      {hasActiveReservation && reservation && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4">
                          <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                Aktif Rezervasyon
                              </p>
                              <p className="text-xs text-amber-600 dark:text-amber-400">
                                Bitiş: {new Date(reservation.end_time).toLocaleDateString('tr-TR', {
                                  day: 'numeric',
                                  month: 'long',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{car.seats} Kişi</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Fuel className="w-4 h-4" />
                          <span>{car.fuel_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Settings className="w-4 h-4" />
                          <span>{car.transmission}</span>
                        </div>
                      </div>

                      {car.plate_number && (
                        <div className="text-sm text-muted-foreground mb-4">
                          Plaka: <span className="font-semibold">{car.plate_number}</span>
                        </div>
                      )}

                      <div className="border-t border-border pt-4 mb-4">
                        <div className="text-2xl font-bold text-foreground mb-2">
                          {car.price_per_minute}₺
                          <span className="text-sm font-normal text-muted-foreground ml-1">/dk</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {car.price_per_hour}₺/saat • {car.price_per_day}₺/gün
                        </div>
                        <div className="text-sm text-muted-foreground">
                          KM Başı: <span className="font-semibold">{car.price_per_km}₺</span>
                        </div>
                        {car.km_packages && Object.keys(car.km_packages).length > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            KM Paketleri: {Object.entries(car.km_packages).map(([km, price]) => `${km}km=${price}₺`).join(", ")}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => toggleAvailability(car.id, car.available)}
                          disabled={processingCarId === car.id}
                        >
                          {processingCarId === car.id ? (
                            "İşleniyor..."
                          ) : hasActiveReservation && car.available ? (
                            <span className="flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Rezervasyon Var
                            </span>
                          ) : car.available ? (
                            "Kiralamaya Kapat"
                          ) : (
                            "Kiralamaya Aç"
                          )}
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              disabled={hasActiveReservation}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Aracı Sil</AlertDialogTitle>
                              <AlertDialogDescription>
                                {hasActiveReservation 
                                  ? "Bu aracın aktif rezervasyonu var. Rezervasyon bitene kadar araç silinemez."
                                  : `${car.name} aracını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
                                }
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              {!hasActiveReservation && (
                                <AlertDialogAction onClick={() => handleDelete(car.id)}>
                                  Sil
                                </AlertDialogAction>
                              )}
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyCars;
