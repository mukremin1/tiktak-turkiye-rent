import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PENALTY_THRESHOLD = 50; // Maksimum izin verilen ceza puanı

interface DriverHistoryFormProps {
  userId: string;
  onVerified: (isApproved: boolean, riskLevel: string) => void;
}

const DriverHistoryForm = ({ userId, onVerified }: DriverHistoryFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [driverData, setDriverData] = useState({
    licenseNumber: "",
    penaltyPoints: 0,
    totalAccidents: 0,
    trafficViolations: 0,
  });
  const [verificationResult, setVerificationResult] = useState<{
    isApproved: boolean;
    riskLevel: string;
    message: string;
  } | null>(null);

  const calculateRiskLevel = (points: number, accidents: number, violations: number) => {
    if (points >= PENALTY_THRESHOLD || accidents >= 3 || violations >= 5) {
      return "high";
    }
    if (points >= 30 || accidents >= 2 || violations >= 3) {
      return "medium";
    }
    return "low";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sürücü geçmişini kaydet
      const { error } = await supabase
        .from("driver_history")
        .upsert({
          user_id: userId,
          license_number: driverData.licenseNumber,
          penalty_points: driverData.penaltyPoints,
          total_accidents: driverData.totalAccidents,
          traffic_violations: driverData.trafficViolations,
          verification_status: "verified",
        });

      if (error) throw error;

      // Risk seviyesini hesapla
      const riskLevel = calculateRiskLevel(
        driverData.penaltyPoints,
        driverData.totalAccidents,
        driverData.trafficViolations
      );

      const isApproved = driverData.penaltyPoints < PENALTY_THRESHOLD &&
                         driverData.totalAccidents < 3 &&
                         driverData.trafficViolations < 5;

      let message = "";
      if (!isApproved) {
        if (driverData.penaltyPoints >= PENALTY_THRESHOLD) {
          message = `Ehliyet ceza puanınız (${driverData.penaltyPoints}) izin verilen maksimum değeri (${PENALTY_THRESHOLD}) aşıyor.`;
        } else if (driverData.totalAccidents >= 3) {
          message = "Kaza geçmişiniz nedeniyle kiralama yapılamıyor.";
        } else {
          message = "Trafik ihlali geçmişiniz nedeniyle kiralama yapılamıyor.";
        }
      } else {
        message = "Sürücü doğrulaması başarılı!";
      }

      setVerificationResult({ isApproved, riskLevel, message });
      onVerified(isApproved, riskLevel);

      toast({
        title: isApproved ? "Doğrulama Başarılı" : "Doğrulama Başarısız",
        description: message,
        variant: isApproved ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Sürücü geçmişi kaydedilemedi:", error);
      toast({
        title: "Hata",
        description: "Sürücü bilgileri kaydedilemedi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle>Sürücü Geçmişi Kontrolü</CardTitle>
        </div>
        <CardDescription>
          Güvenli kiralama için sürücü bilgilerinizi doğrulamamız gerekiyor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">Ehliyet Numarası</Label>
            <Input
              id="licenseNumber"
              placeholder="Ehliyet numaranızı girin"
              value={driverData.licenseNumber}
              onChange={(e) => setDriverData({ ...driverData, licenseNumber: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="penaltyPoints">
              Ehliyet Ceza Puanı (Maksimum: {PENALTY_THRESHOLD})
            </Label>
            <Input
              id="penaltyPoints"
              type="number"
              min="0"
              placeholder="Toplam ceza puanınız"
              value={driverData.penaltyPoints || ""}
              onChange={(e) => setDriverData({ ...driverData, penaltyPoints: parseInt(e.target.value) || 0 })}
              required
            />
            {driverData.penaltyPoints >= PENALTY_THRESHOLD && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Ceza puanınız izin verilen maksimum değeri aşıyor
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalAccidents">Toplam Kaza Sayısı</Label>
              <Input
                id="totalAccidents"
                type="number"
                min="0"
                placeholder="0"
                value={driverData.totalAccidents || ""}
                onChange={(e) => setDriverData({ ...driverData, totalAccidents: parseInt(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trafficViolations">Trafik İhlali Sayısı</Label>
              <Input
                id="trafficViolations"
                type="number"
                min="0"
                placeholder="0"
                value={driverData.trafficViolations || ""}
                onChange={(e) => setDriverData({ ...driverData, trafficViolations: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          {verificationResult && (
            <div className={`p-4 rounded-lg border ${
              verificationResult.isApproved 
                ? "bg-primary/5 border-primary/20" 
                : "bg-destructive/5 border-destructive/20"
            }`}>
              <div className="flex items-start gap-3">
                {verificationResult.isApproved ? (
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold mb-1">
                    {verificationResult.isApproved ? "Doğrulama Başarılı" : "Doğrulama Başarısız"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {verificationResult.message}
                  </p>
                  <Badge variant={
                    verificationResult.riskLevel === "low" ? "default" :
                    verificationResult.riskLevel === "medium" ? "secondary" :
                    "destructive"
                  }>
                    Risk Seviyesi: {
                      verificationResult.riskLevel === "low" ? "Düşük" :
                      verificationResult.riskLevel === "medium" ? "Orta" :
                      "Yüksek"
                    }
                  </Badge>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Doğrulanıyor..." : "Sürücü Bilgilerini Doğrula"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Not:</strong> Güvenli kiralama için ehliyet ceza puanınız {PENALTY_THRESHOLD} 
            puanın altında olmalıdır. Yüksek risk tespit edilmesi durumunda kiralama yapılamayacaktır.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverHistoryForm;
