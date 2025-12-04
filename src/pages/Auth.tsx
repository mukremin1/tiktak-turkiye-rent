import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, User, Key, Smartphone, Apple } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi girin" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
  fullName: z.string().min(2, { message: "Ad soyad en az 2 karakter olmalıdır" }).optional(),
});

type UserType = "renter" | "owner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") as UserType || "renter";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>(initialType);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      authSchema.parse({ email, password, fullName });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            user_type: userType,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Bu e-posta adresi zaten kayıtlı");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        // Araç sahibi ise role ekle
        if (userType === "owner") {
          await supabase.from("user_roles").insert({
            user_id: data.user.id,
            role: "car_owner"
          });
        }
        
        toast.success("Kayıt başarılı! Giriş yapılıyor...");
        navigate(userType === "owner" ? "/owner-dashboard" : "/");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      authSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("E-posta veya şifre hatalı");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        // Kullanıcı rolünü kontrol et
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id);

        const isOwner = roles?.some(r => r.role === "car_owner");
        
        toast.success("Giriş başarılı!");
        navigate(isOwner && userType === "owner" ? "/owner-dashboard" : "/");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <img src="/logo-512x512.png" alt="RideYo logo" className="w-12 h-12 rounded-lg object-contain" />
          <span className="text-2xl font-bold text-foreground">RideYo</span>
        </Link>

        {/* User Type Selector */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={userType === "renter" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setUserType("renter")}
          >
            <User className="w-4 h-4" />
            Kiralayan
          </Button>
          <Button
            variant={userType === "owner" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setUserType("owner")}
          >
            <Key className="w-4 h-4" />
            Araç Sahibi
          </Button>
        </div>

        <Card className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">
              {userType === "renter" ? "Kiralayan Girişi" : "Araç Sahibi Girişi"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {userType === "renter" 
                ? "Araç kiralamak için giriş yapın" 
                : "Aracınızı kiraya vermek için giriş yapın"}
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Giriş Yap</TabsTrigger>
              <TabsTrigger value="signup">Üye Ol</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">E-posta</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Şifre</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Ad Soyad</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-posta</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Şifre</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Kayıt olunuyor..." : "Üye Ol"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* App Download Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">Mobil Uygulamayı İndir</p>
          <div className="flex justify-center gap-3">
            <a 
              href="https://apps.apple.com/app/rideyo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Apple className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[10px] leading-tight">İndir</div>
                <div className="text-sm font-semibold leading-tight">App Store</div>
              </div>
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.rideyo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Smartphone className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[10px] leading-tight">İndir</div>
                <div className="text-sm font-semibold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
