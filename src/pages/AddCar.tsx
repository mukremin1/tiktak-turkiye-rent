import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const carSchema = z.object({
  name: z.string().min(2, "Araç adı en az 2 karakter olmalıdır").max(100),
  type: z.enum(["compact", "sedan", "suv"]),
  pricePerMinute: z.number().min(0.1, "Fiyat 0'dan büyük olmalıdır"),
  pricePerHour: z.number().min(1, "Fiyat 0'dan büyük olmalıdır"),
  pricePerDay: z.number().min(10, "Fiyat 10'dan büyük olmalıdır"),
  fuelType: z.enum(["Benzin", "Dizel", "Elektrik", "Hibrit"]),
  transmission: z.enum(["Manuel", "Otomatik"]),
  seats: z.number().min(2).max(9),
  location: z.string().min(3, "Lokasyon en az 3 karakter olmalıdır"),
  plateNumber: z.string().optional(),
  year: z.number().min(2000).max(new Date().getFullYear() + 1).optional(),
  description: z.string().max(500, "Açıklama en fazla 500 karakter olabilir").optional(),
});

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "compact",
    pricePerMinute: "",
    pricePerHour: "",
    pricePerDay: "",
    fuelType: "Benzin",
    transmission: "Otomatik",
    seats: "5",
    location: "",
    plateNumber: "",
    year: "",
    description: "",
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = carSchema.parse({
        name: formData.name,
        type: formData.type,
        pricePerMinute: parseFloat(formData.pricePerMinute),
        pricePerHour: parseFloat(formData.pricePerHour),
        pricePerDay: parseFloat(formData.pricePerDay),
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        seats: parseInt(formData.seats),
        location: formData.location,
        plateNumber: formData.plateNumber || undefined,
        year: formData.year ? parseInt(formData.year) : undefined,
        description: formData.description || undefined,
      });

      setLoading(true);

      const { error } = await supabase.from("cars").insert({
        owner_id: user.id,
        name: validatedData.name,
        type: validatedData.type,
        price_per_minute: validatedData.pricePerMinute,
        price_per_hour: validatedData.pricePerHour,
        price_per_day: validatedData.pricePerDay,
        fuel_type: validatedData.fuelType,
        transmission: validatedData.transmission,
        seats: validatedData.seats,
        location: validatedData.location,
        city: "Trabzon",
        plate_number: validatedData.plateNumber,
        year: validatedData.year,
        description: validatedData.description,
        available: true,
      });

      if (error) {
        console.error("Araç ekleme hatası:", error);
        toast.error("Araç eklenirken bir hata oluştu");
        return;
      }

      toast.success("Araç başarıyla eklendi!");
      navigate("/my-cars");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Bir hata oluştu");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Link to="/my-cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Araçlarıma Dön
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Yeni Araç Ekle</h1>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Araç Adı *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="örn: Renault Clio"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Araç Tipi *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Kompakt</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seats">Koltuk Sayısı *</Label>
                  <Input
                    id="seats"
                    type="number"
                    min="2"
                    max="9"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Yakıt Tipi *</Label>
                  <Select value={formData.fuelType} onValueChange={(value) => setFormData({ ...formData, fuelType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Benzin">Benzin</SelectItem>
                      <SelectItem value="Dizel">Dizel</SelectItem>
                      <SelectItem value="Elektrik">Elektrik</SelectItem>
                      <SelectItem value="Hibrit">Hibrit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Vites *</Label>
                  <Select value={formData.transmission} onValueChange={(value) => setFormData({ ...formData, transmission: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manuel">Manuel</SelectItem>
                      <SelectItem value="Otomatik">Otomatik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pricePerMinute">Dakika Fiyatı (₺) *</Label>
                  <Input
                    id="pricePerMinute"
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={formData.pricePerMinute}
                    onChange={(e) => setFormData({ ...formData, pricePerMinute: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerHour">Saat Fiyatı (₺) *</Label>
                  <Input
                    id="pricePerHour"
                    type="number"
                    step="1"
                    min="1"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerDay">Günlük Fiyat (₺) *</Label>
                  <Input
                    id="pricePerDay"
                    type="number"
                    step="1"
                    min="10"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasyon *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="örn: Ortahisar, Trabzon"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plateNumber">Plaka</Label>
                  <Input
                    id="plateNumber"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    placeholder="örn: 34 ABC 123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Model Yılı</Label>
                  <Input
                    id="year"
                    type="number"
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="örn: 2022"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Araç hakkında ek bilgiler..."
                  rows={4}
                  maxLength={500}
                />
                <p className="text-sm text-muted-foreground">{formData.description.length}/500</p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Ekleniyor..." : "Araç Ekle"}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddCar;
