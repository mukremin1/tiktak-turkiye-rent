import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Flashlight, FlashlightOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCamera } from "@/hooks/useCamera";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface VehicleDropoffPhotoProps {
  carId: string;
  bookingId: string;
  onPhotoTaken?: (photoData: string) => void;
}

const VehicleDropoffPhoto = ({ carId, bookingId, onPhotoTaken }: VehicleDropoffPhotoProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { capturePhoto } = useCamera();
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [isFlashEnabled, setIsFlashEnabled] = useState(false);
  const [isDarkEnvironment, setIsDarkEnvironment] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    checkLightConditions();
    return () => {
      stopCamera();
    };
  }, []);

  const checkLightConditions = async () => {
    try {
      // Check ambient light using device light sensor or video analysis
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Analyze video brightness after a short delay
        setTimeout(() => {
          analyzeBrightness();
        }, 1000);
      }
    } catch (error) {
      console.error("Kamera erişim hatası:", error);
    }
  };

  const analyzeBrightness = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let totalBrightness = 0;

    // Calculate average brightness
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      totalBrightness += (r + g + b) / 3;
    }

    const avgBrightness = totalBrightness / (data.length / 4);
    
    // If brightness is below 80 (on scale of 0-255), enable flash
    if (avgBrightness < 80) {
      setIsDarkEnvironment(true);
      setIsFlashEnabled(true);
      toast({
        title: "Karanlık Ortam Algılandı",
        description: "Flaş otomatik olarak aktif edildi",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleTakePhoto = async () => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Fotoğraf çekebilmek için giriş yapmalısınız",
        variant: "destructive",
      });
      return;
    }

    try {
      const photo = await capturePhoto(isFlashEnabled);
      
      if (photo && photo.dataUrl) {
        // Save photo to database
        const { error } = await supabase
          .from("vehicle_photos")
          .insert({
            booking_id: bookingId,
            car_id: carId,
            user_id: user.id,
            photo_type: "dropoff",
            photo_url: photo.dataUrl,
            is_dark_environment: isDarkEnvironment,
            flash_used: isFlashEnabled,
          });

        if (error) {
          console.error("Fotoğraf kaydetme hatası:", error);
          toast({
            title: "Kayıt Hatası",
            description: "Fotoğraf çekildi ancak kaydedilemedi",
            variant: "destructive",
          });
          return;
        }

        setPhotoData(photo.dataUrl);
        stopCamera();
        
        if (onPhotoTaken) {
          onPhotoTaken(photo.dataUrl);
        }

        toast({
          title: "Fotoğraf Çekildi!",
          description: "Araç teslim fotoğrafı başarıyla kaydedildi",
        });
      }
    } catch (error) {
      console.error("Fotoğraf çekme hatası:", error);
      toast({
        title: "Hata",
        description: "Fotoğraf çekilemedi, lütfen tekrar deneyin",
        variant: "destructive",
      });
    }
  };

  const toggleFlash = () => {
    setIsFlashEnabled(!isFlashEnabled);
  };

  if (photoData) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-xl overflow-hidden border-2 border-primary">
          <img src={photoData} alt="Araç teslim fotoğrafı" className="w-full" />
          <div className="absolute top-4 right-4">
            <CheckCircle className="w-8 h-8 text-primary bg-background rounded-full" />
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <p className="text-sm font-medium text-primary">
            ✓ Araç teslim fotoğrafı başarıyla alındı
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setPhotoData(null);
            checkLightConditions();
          }}
        >
          Yeniden Çek
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Araç Teslim Fotoğrafı</h3>
          {isDarkEnvironment && (
            <div className="flex items-center gap-2 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full">
              <Flashlight className="w-3 h-3" />
              Karanlık Ortam
            </div>
          )}
        </div>

        <div className="relative rounded-lg overflow-hidden bg-black mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full aspect-video object-cover"
          />
          {isFlashEnabled && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Flashlight className="w-3 h-3" />
              Flaş Aktif
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Aracı bırakırken lütfen hasar durumunu gösteren net bir fotoğraf çekin.
          {isDarkEnvironment && " Karanlık ortam algılandı, flaş otomatik aktif."}
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={toggleFlash}
          >
            {isFlashEnabled ? (
              <>
                <Flashlight className="w-4 h-4" />
                Flaş Açık
              </>
            ) : (
              <>
                <FlashlightOff className="w-4 h-4" />
                Flaş Kapalı
              </>
            )}
          </Button>
          <Button
            className="flex-1 gap-2"
            onClick={handleTakePhoto}
          >
            <Camera className="w-4 h-4" />
            Fotoğraf Çek
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDropoffPhoto;
