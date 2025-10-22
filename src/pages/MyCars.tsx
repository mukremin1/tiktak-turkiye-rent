import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Edit, Trash2, Users, Fuel, Settings } from "lucide-react";
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
  fuel_type: string;
  transmission: string;
  seats: number;
  available: boolean;
  location: string;
  plate_number: string | null;
  year: number | null;
  description: string | null;
}

const MyCars = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchMyCars();
  }, [user, navigate]);

  const fetchMyCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("owner_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Araçlar yüklenirken hata:", error);
        toast.error("Araçlar yüklenemedi");
        return;
      }

      setCars(data || []);
    } catch (error) {
      console.error("Araçlar yüklenirken hata:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
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

      toast.success(currentStatus ? "Araç kullanıma kapatıldı" : "Araç kullanıma açıldı");
      fetchMyCars();
    } catch (error) {
      console.error("Durum güncellenirken hata:", error);
      toast.error("Bir hata oluştu");
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
            <Link to="/add-car">
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Araç Ekle
              </Button>
            </Link>
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
              {cars.map((car) => (
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
                        {car.available ? "Müsait" : "Kullanımda"}
                      </Badge>
                    </div>

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
                      <div className="text-2xl font-bold text-foreground">
                        {car.price_per_minute}₺
                        <span className="text-sm font-normal text-muted-foreground ml-1">/dk</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {car.price_per_hour}₺/saat • {car.price_per_day}₺/gün
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => toggleAvailability(car.id, car.available)}
                      >
                        {car.available ? "Kullanıma Kapat" : "Kullanıma Aç"}
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Aracı Sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              {car.name} aracını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(car.id)}>
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyCars;
