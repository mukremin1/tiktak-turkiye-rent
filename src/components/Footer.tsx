import { MessageSquare, Smartphone, Apple, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "+905395263293";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo-512x512.png" alt="RideYo logo" className="w-10 h-10 rounded-md object-contain" />
              <span className="text-xl font-bold text-foreground">RideYo</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Türkiye'nin en hızlı ve kolay araç kiralama platformu
            </p>
            
            {/* App Download Links */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Mobil Uygulama</p>
              <div className="flex flex-col gap-2">
                <Link 
                  to="/install"
                  className="flex items-center gap-2 bg-foreground text-background px-3 py-2 rounded-lg hover:opacity-90 transition-opacity w-fit"
                >
                  <Apple className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-[9px] leading-tight">İndir</div>
                    <div className="text-xs font-semibold leading-tight">App Store</div>
                  </div>
                </Link>
                <Link 
                  to="/install"
                  className="flex items-center gap-2 bg-foreground text-background px-3 py-2 rounded-lg hover:opacity-90 transition-opacity w-fit"
                >
                  <Smartphone className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-[9px] leading-tight">İndir</div>
                    <div className="text-xs font-semibold leading-tight">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Şirket</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Destek</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">SSS</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Müşteri Hizmetleri</Link></li>
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Merhaba, RideYo hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Destek
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Araç Sahipleri</h3>
            <ul className="space-y-2">
              <li><Link to="/auth?type=owner" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Araç Sahibi Girişi</Link></li>
              <li><Link to="/owner-dashboard" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Sahip Paneli</Link></li>
              <li><Link to="/earnings-calculator" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Kazanç Hesaplayıcı</Link></li>
              <li><Link to="/car-comparison" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Araç Karşılaştırma</Link></li>
              <li><Link to="/availability-calendar" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Müsaitlik Takvimi</Link></li>
              <li><Link to="/owner-guide" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Rehber</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Kaynaklar</h3>
            <ul className="space-y-2">
              <li><Link to="/auth?type=renter" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Kiralayan Girişi</Link></li>
              <li><Link to="/safety-guidelines" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Güvenlik Kuralları</Link></li>
              <li><Link to="/rental-agreement" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Kiralama Sözleşmesi</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Sık Sorulan Sorular</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Gizlilik Politikası</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Kullanım Koşulları</Link></li>
              <li><Link to="/kvkk" className="text-muted-foreground hover:text-foreground transition-colors text-sm">KVKK</Link></li>
              <li><Link to="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Çerez Politikası</Link></li>
            </ul>
          </div>
        </div>

        {/* Payment Icons */}
        <div className="border-t border-border pt-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Güvenli Ödeme:</span>
            <div className="flex items-center gap-3">
              {/* iyzico */}
              <div className="bg-gradient-to-r from-[#1a1f71] to-[#4a4fb5] rounded px-4 py-2 border border-border">
                <svg viewBox="0 0 80 24" className="h-5 w-auto">
                  <text x="50%" y="50%" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif">iyzico</text>
                </svg>
              </div>
              {/* Visa */}
              <div className="bg-white rounded px-3 py-1.5 border border-border">
                <svg viewBox="0 0 48 16" className="h-6 w-auto">
                  <path fill="#1434CB" d="M19.6 1l-4.8 14h-3.2l-2.4-11.2c-.1-.6-.3-.8-.8-1C7.2 2.4 5.6 2 4 1.8v-.4h5.2c.7 0 1.3.5 1.4 1.2l1.3 6.8L15.6 1h4zm5.6 0L22 15h-3L22.2 1h3zm8.4 9.4c0-3.6-5-3.8-5-5.4 0-.5.5-1 1.5-1.1.5-.1 1.8-.1 3.4.6l.6-2.8C33.4 1.3 32 1 30.2 1c-3 0-5.2 1.6-5.2 3.9 0 1.7 1.5 2.6 2.7 3.2 1.2.6 1.6.9 1.6 1.4 0 .8-.9 1.1-1.8 1.1-1.5 0-2.4-.4-3-.7l-.5 2.5c.7.3 2 .6 3.3.6 3.3 0 5.4-1.6 5.4-4.1zM44 15l-2.4-14h-2.8c-.6 0-1.1.4-1.3 1l-4.7 13h3.3l.7-1.8h4l.4 1.8H44zm-3.5-4.8l1.7-4.6.9 4.6h-2.6z"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="bg-white rounded px-3 py-1.5 border border-border">
                <svg viewBox="0 0 48 30" className="h-6 w-auto">
                  <rect fill="#FF5F00" x="17.4" y="3" width="13.2" height="24"/>
                  <path fill="#EB001B" d="M18.6 15c0-4.9 2.3-9.2 5.9-12-2.6-2.1-5.9-3.3-9.5-3.3C6.7-.3 0 6.4 0 15s6.7 15.3 15 15.3c3.6 0 6.9-1.2 9.5-3.3-3.6-2.8-5.9-7.1-5.9-12z"/>
                  <path fill="#F79E1B" d="M48 15c0 8.6-6.7 15.3-15 15.3-3.6 0-6.9-1.2-9.5-3.3 3.6-2.8 5.9-7.1 5.9-12s-2.3-9.2-5.9-12c2.6-2.1 5.9-3.3 9.5-3.3C41.3-.3 48 6.4 48 15z"/>
                </svg>
              </div>
              {/* Troy */}
              <div className="bg-white rounded px-3 py-1.5 border border-border">
                <svg viewBox="0 0 60 24" className="h-6 w-auto">
                  <rect fill="#00529B" width="60" height="24" rx="3"/>
                  <text x="50%" y="50%" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">TROY</text>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Ödemeleriniz iyzico güvencesiyle korunmaktadır.
          </p>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 RideYo. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
