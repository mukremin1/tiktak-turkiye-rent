import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();

  useEffect(() => {
    // Check if notifications are supported
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) {
      toast({
        title: "Desteklenmiyor",
        description: "Tarayıcınız bildirim desteği sunmuyor",
        variant: "destructive",
      });
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast({
          title: "Bildirimler Açık",
          description: "Artık önemli güncellemeler alacaksınız",
        });
        return true;
      } else {
        toast({
          title: "Bildirimler Kapalı",
          description: "Ayarlardan bildirimleri açabilirsiniz",
        });
        return false;
      }
    } catch (error) {
      console.error('Notification permission error:', error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      new Notification(title, {
        icon: '/icon-512x512.png',
        badge: '/icon-512x512.png',
        ...options,
      });
    }
  };

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
  };
};
