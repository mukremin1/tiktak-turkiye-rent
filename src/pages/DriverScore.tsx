import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, TrendingDown, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface DriverHistory {
  driver_score: number;
  penalty_points: number;
  traffic_violations: number;
  total_accidents: number;
  is_approved: boolean;
  verification_status: string;
  notes: string;
}

const DriverScore = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [driverHistory, setDriverHistory] = useState<DriverHistory | null>(null);
  const [isEligible, setIsEligible] = useState(false);
  const [eligibilityReason, setEligibilityReason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchDriverData();
  }, [user]);

  const fetchDriverData = async () => {
    try {
      // Fetch driver history
      const { data: history, error: historyError } = await supabase
        .from("driver_history")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (historyError && historyError.code !== "PGRST116") throw historyError;
      
      if (history) {
        setDriverHistory(history);

        // Check eligibility using the database function
        const { data: eligibility, error: eligibilityError } = await supabase
          .rpc("check_driver_eligibility", { p_user_id: user?.id });

        if (!eligibilityError && eligibility && eligibility.length > 0) {
          setIsEligible(eligibility[0].is_eligible);
          setEligibilityReason(eligibility[0].reason);
        }
      }
    } catch (error) {
      console.error("Sürücü verileri yüklenemedi:", error);
      toast.error("Sürücü verileri yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Mükemmel";
    if (score >= 80) return "Çok İyi";
    if (score >= 70) return "İyi";
    if (score >= 60) return "Orta";
    return "Düşük";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <p className="text-xl text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!driverHistory) {
    return (
      <div className="min-h-screen bg-background pb-16 md:pb-0">
        <Navbar />
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center py-12">
            <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sürücü Belgesi Bulunamadı</h2>
            <p className="text-muted-foreground">
              Araç kiralayabilmek için önce sürücü belgenizi doğrulamanız gerekiyor.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Sürücü Puanım</h1>
            <p className="text-muted-foreground">Sürüş geçmişiniz ve puanlama detayları</p>
          </div>

          {/* Eligibility Status */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-4">
              {isEligible ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Araç Kiralayabilirsiniz</h3>
                    <p className="text-muted-foreground">Sürücü puanınız yeterli seviyede</p>
                  </div>
                  <Badge className="bg-green-500">Uygun</Badge>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Araç Kiralama Kısıtlandı</h3>
                    <p className="text-muted-foreground">{eligibilityReason}</p>
                  </div>
                  <Badge variant="destructive">Uygun Değil</Badge>
                </>
              )}
            </div>
          </Card>

          {/* Driver Score */}
          <Card className="p-6 mb-6">
            <div className="text-center mb-6">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(driverHistory.driver_score)}`}>
                {driverHistory.driver_score}
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {getScoreLabel(driverHistory.driver_score)} Sürücü
              </p>
              <Progress value={driverHistory.driver_score} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{driverHistory.penalty_points}</p>
                <p className="text-sm text-muted-foreground">Ceza Puanı</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{driverHistory.traffic_violations}</p>
                <p className="text-sm text-muted-foreground">Trafik İhlali</p>
              </div>
            </div>
          </Card>

          {/* Requirements */}
          <Card className="p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">Kiralama Gereksinimleri</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {driverHistory.driver_score >= 60 ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>Minimum 60 sürücü puanı (Mevcut: {driverHistory.driver_score})</span>
              </div>
              <div className="flex items-center gap-3">
                {driverHistory.penalty_points <= 70 ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>Maksimum 70 ceza puanı (Mevcut: {driverHistory.penalty_points})</span>
              </div>
              <div className="flex items-center gap-3">
                {driverHistory.is_approved ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>Sürücü belgesi onaylı</span>
              </div>
            </div>
          </Card>

          {/* Score History */}
          {driverHistory.notes && (
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Puan Geçmişi</h3>
              <div className="space-y-2 text-sm">
                {driverHistory.notes.split("\n").filter(Boolean).map((note, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {note.includes("+") ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mt-0.5" />
                    )}
                    <p className="text-muted-foreground">{note}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DriverScore;
