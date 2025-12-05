import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Download, Zap, Shield, Wifi, Apple, Chrome, Share2, MoreVertical, Plus, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type Platform = 'ios' | 'android' | 'desktop' | 'unknown';

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    if (isIOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if running in app mode on iOS
    if ((navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    // Listen for install prompt (Android/Desktop)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setIsLoading(true);
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
        setIsInstalled(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'ios':
        return <Apple className="w-6 h-6" />;
      case 'android':
        return <Smartphone className="w-6 h-6" />;
      default:
        return <Chrome className="w-6 h-6" />;
    }
  };

  const getPlatformName = () => {
    switch (platform) {
      case 'ios':
        return 'iPhone / iPad';
      case 'android':
        return 'Android';
      default:
        return 'Masaüstü';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-6 shadow-lg">
              <img src="/logo-512x512.png" alt="RideYo" className="w-16 h-16 rounded-xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              RideYo Uygulamasını İndir
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Telefonuna kur, her zaman yanında taşı. İnternet olmadan bile çalışır!
            </p>
            
            {/* Platform Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
              {getPlatformIcon()}
              <span className="text-muted-foreground">
                {getPlatformName()} cihazı algılandı
              </span>
            </div>
          </div>

          {/* Installation Status */}
          {isInstalled ? (
            <Card className="p-8 text-center bg-primary/5 border-primary/20 animate-scale-in mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="w-10 h-10 text-primary" />
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
              {/* Android/Desktop - Direct Install */}
              {isInstallable && platform !== 'ios' ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Download className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Tek Tıkla Kur</h3>
                  <p className="text-muted-foreground mb-6">
                    Uygulama mağazasına gerek yok, doğrudan tarayıcıdan yükleyin
                  </p>
                  <Button 
                    size="lg" 
                    onClick={handleInstallClick}
                    disabled={isLoading}
                    className="w-full md:w-auto text-lg h-14 px-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Yükleniyor...
                      </span>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Uygulamayı Kur
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                /* Manual Installation Instructions */
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      {platform === 'ios' ? 'iPhone / iPad için Kurulum' : 'Nasıl Kurulur?'}
                    </h3>
                    <p className="text-muted-foreground">
                      Aşağıdaki adımları takip ederek uygulamayı ana ekranınıza ekleyin
                    </p>
                  </div>

                  {/* iOS Instructions */}
                  {platform === 'ios' && (
                    <Card className="p-6 bg-gradient-to-br from-muted/50 to-muted border-primary/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Apple className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-4">Safari ile Kurulum</h4>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                1
                              </div>
                              <div>
                                <p className="font-medium">Paylaş butonuna dokunun</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  Ekranın altındaki <Share2 className="w-4 h-4 inline" /> ikonuna tıklayın
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                2
                              </div>
                              <div>
                                <p className="font-medium">"Ana Ekrana Ekle" seçeneğini bulun</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Plus className="w-4 h-4 inline" /> Listede aşağı kaydırın
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                3
                              </div>
                              <div>
                                <p className="font-medium">"Ekle" butonuna dokunun</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  RideYo ana ekranınıza eklenecek
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Android Instructions */}
                  {platform === 'android' && !isInstallable && (
                    <Card className="p-6 bg-gradient-to-br from-muted/50 to-muted border-primary/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-4">Chrome ile Kurulum</h4>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                1
                              </div>
                              <div>
                                <p className="font-medium">Menü butonuna dokunun</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  Sağ üstteki <MoreVertical className="w-4 h-4 inline" /> ikonuna tıklayın
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                2
                              </div>
                              <div>
                                <p className="font-medium">"Ana ekrana ekle" veya "Uygulamayı yükle"</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Menüde bu seçeneklerden birini bulun
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                                3
                              </div>
                              <div>
                                <p className="font-medium">"Yükle" veya "Ekle" butonuna dokunun</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  RideYo ana ekranınıza eklenecek
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Desktop Instructions */}
                  {platform === 'desktop' && !isInstallable && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-6 bg-background border-border">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Chrome className="w-5 h-5 text-primary" />
                          Chrome / Edge
                        </h4>
                        <ol className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">1</span>
                            Adres çubuğundaki yükle ikonuna tıklayın
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">2</span>
                            "Yükle" butonuna basın
                          </li>
                        </ol>
                      </Card>

                      <Card className="p-6 bg-background border-border">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Apple className="w-5 h-5 text-primary" />
                          Safari (Mac)
                        </h4>
                        <ol className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">1</span>
                            Dosya → Dock'a Ekle seçin
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">2</span>
                            Uygulama Dock'unuza eklenecek
                          </li>
                        </ol>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hızlı Erişim</h3>
              <p className="text-sm text-muted-foreground">
                Ana ekranınızdan doğrudan açın, tarayıcı aramaya gerek yok
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                <Wifi className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Offline Çalışır</h3>
              <p className="text-sm text-muted-foreground">
                İnternet olmadan da kullanın, veriler önbellekte saklanır
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Güvenli & Hızlı</h3>
              <p className="text-sm text-muted-foreground">
                Tüm veriler şifreli, native uygulama hızında çalışır
              </p>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-1">PWA nedir?</h4>
                <p className="text-sm text-muted-foreground">
                  Progressive Web App, web sitelerinin mobil uygulama gibi çalışmasını sağlayan bir teknolojidir. 
                  App Store veya Play Store'dan indirmeye gerek kalmadan doğrudan tarayıcıdan kurulabilir.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-1">Depolama alanı kaplar mı?</h4>
                <p className="text-sm text-muted-foreground">
                  PWA'lar çok az alan kaplar (genellikle 1-5 MB). Normal uygulamalardan çok daha hafiftirler.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-1">Güncellemeler nasıl olur?</h4>
                <p className="text-sm text-muted-foreground">
                  Güncellemeler otomatik olarak yapılır. Uygulamayı her açtığınızda en son sürümü kullanırsınız.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Install;
