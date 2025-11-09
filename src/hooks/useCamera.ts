import { useState } from 'react';
import { useToast } from './use-toast';

interface CameraPhoto {
  dataUrl: string;
  format: string;
}

export const useCamera = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();

  const capturePhoto = async (enableFlash: boolean = false): Promise<CameraPhoto | null> => {
    setIsCapturing(true);

    try {
      // Check if we're in a Capacitor environment
      const isCapacitor = 'Capacitor' in window;

      if (isCapacitor) {
        // Use Capacitor Camera plugin (will be available after npx cap sync)
        const { Camera } = await import('@capacitor/camera');
        const { CameraResultType, CameraSource } = await import('@capacitor/camera');
        
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
          // @ts-ignore - Flash is available but not in types
          flash: enableFlash ? 'on' : 'auto',
        });

        return {
          dataUrl: photo.dataUrl || '',
          format: photo.format,
        };
      } else {
        // Fallback to browser file input for web
        return new Promise((resolve) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.capture = 'environment';

          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  dataUrl: reader.result as string,
                  format: file.type,
                });
              };
              reader.readAsDataURL(file);
            } else {
              resolve(null);
            }
          };

          input.click();
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: "Kamera Hatası",
        description: "Fotoğraf çekilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  return {
    capturePhoto,
    isCapturing,
  };
};
