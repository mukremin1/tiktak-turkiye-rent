import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Download, Zap, Shield, Wifi } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsInstalled(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              RideYo Uygulamasını İndir
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Telefonuna kur, her zaman yanında taşı. İnternet olmadan bile çalışır!
            </p>
          </div>

          {isInstalled ? (
            <Card className="p-8 text-center bg-primary/5 border-primary/20 animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Uygulama Kurulu! 🎉
              </h2>
              <p className="text-muted-foreground">
                RideYo artık cihazınızda kurulu. Ana ekranınızdan açabilirsiniz.
              </p>
            </Card>
          ) : (
            <Card className="p-8 mb-8 animate-scale-in">
              {isInstallable ? (
                <div className="text-center">
                  <Button 
                    size="lg" 
                    onClick={handleInstallClick}
                    className="w-full md:w-auto text-lg h-14 px-8 mb-4"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Uygulamayı Kur
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Bir tıkla telefonuna kur, uygulama mağazasına gerek yok!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      Nasıl Kurulur?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Tarayıcınızın menüsünden "Ana Ekrana Ekle" seçeneğini kullanın
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-background border-border">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                          1
                        </span>
                        iPhone (Safari)
                      </h4>
                      <ol className="text-sm text-muted-foreground space-y-2">
                        <li>• Paylaş butonuna tıklayın</li>
                        <li>• "Ana Ekrana Ekle" seçeneğini bulun</li>
                        <li>• "Ekle" butonuna basın</li>
                      </ol>
                    </Card>

                    <Card className="p-6 bg-background border-border">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                          2
                        </span>
                        Android (Chrome)
                      </h4>
                      <ol className="text-sm text-muted-foreground space-y-2">
                        <li>• Menü (⋮) butonuna tıklayın</li>
                        <li>• "Ana ekrana ekle" seçeneğini bulun</li>
                        <li>• "Ekle" butonuna basın</li>
                      </ol>
                    </Card>
                  </div>
                </div>
              )}
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
            <Card className="p-6 text-center hover-scale">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hızlı Erişim</h3>
              <p className="text-sm text-muted-foreground">
                Ana ekranınızdan doğrudan açın, tarayıcı aramaya gerek yok
              </p>
            </Card>

            <Card className="p-6 text-center hover-scale">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Wifi className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Offline Çalışır</h3>
              <p className="text-sm text-muted-foreground">
                İnternet olmadan da kullanın, veriler önbellekte saklanır
              </p>
            </Card>

            <Card className="p-6 text-center hover-scale">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Güvenli</h3>
              <p className="text-sm text-muted-foreground">
                Tüm veriler şifreli, gizliliğiniz korunur
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Install;
