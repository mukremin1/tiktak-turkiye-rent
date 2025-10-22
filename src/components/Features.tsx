import { Shield, Zap, CreditCard, Clock, MapPin, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Hızlı Kiralama",
    description: "2 dakikada araç kirala ve yola çık",
  },
  {
    icon: CreditCard,
    title: "Esnek Ödeme",
    description: "Sadece kullandığın kadar öde",
  },
  {
    icon: MapPin,
    title: "Geniş Ağ",
    description: "50+ lokasyonda binlerce araç",
  },
  {
    icon: Shield,
    title: "Güvenli",
    description: "Tam sigortalı ve bakımlı araçlar",
  },
  {
    icon: Clock,
    title: "7/24 Hizmet",
    description: "İstediğin zaman, istediğin yerde",
  },
  {
    icon: Smartphone,
    title: "Kolay Kullanım",
    description: "Sezgisel mobil uygulama",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <span className="text-sm font-semibold text-accent">Özellikler</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Neden RentNow?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern araç kiralama deneyimi için ihtiyacın olan her şey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 shadow-md">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
