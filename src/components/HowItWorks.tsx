import { Smartphone, MapPin, Key, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Uygulamayı İndir",
    description: "Hızlıca kayıt ol ve ehliyetini doğrula",
  },
  {
    icon: MapPin,
    title: "Araç Bul",
    description: "Yakınındaki müsait araçları keşfet",
  },
  {
    icon: Key,
    title: "Kilidi Aç",
    description: "QR kod ile aracı hemen kilitle",
  },
  {
    icon: CheckCircle,
    title: "Yola Çık",
    description: "İstediğin süre kullan, bitince bırak",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">Nasıl Çalışır</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            4 Basit Adımda Yoldasın
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Araç kiralamak hiç bu kadar kolay olmamıştı
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
