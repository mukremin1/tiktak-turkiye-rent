import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Shield, CheckCircle, AlertTriangle, Car, Lightbulb, CircleDot, Wrench } from "lucide-react";
import { Badge } from "./ui/badge";

const insurancePackages = [
  {
    id: "temel",
    name: "Temel Koruma",
    price: 550,
    features: [
      "Zorunlu Trafik Sigortası",
      "Temel Mali Sorumluluk",
      "7/24 Yol Yardım",
      "Hırsızlık Koruma (Kısmi)",
      "3. Şahıs Mal Hasarı (50.000₺ limit)",
    ],
    exclusions: [
      "Far hasarı kapsam dışı",
      "Lastik hasarı kapsam dışı",
      "Cam hasarı kapsam dışı",
    ],
    icon: <Shield className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    id: "standart",
    name: "Standart Koruma",
    price: 750,
    features: [
      "Temel Koruma tüm hakları",
      "Mini Kasko",
      "Far Hasarı Koruması (2.500₺ limit)",
      "Lastik Hasarı Koruması (1.500₺ limit)",
      "Cam Kırılması Teminatı",
      "3. Şahıs Mal Hasarı (100.000₺ limit)",
      "Kişisel Kaza Sigortası",
    ],
    exclusions: [
      "Muafiyet: 2.000₺",
    ],
    recommended: true,
    icon: <Car className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    id: "premium",
    name: "Premium Koruma",
    price: 1100,
    features: [
      "Standart Koruma tüm hakları",
      "Tam Kasko",
      "Far Hasarı Koruması (Limitsiz)",
      "Lastik Hasarı Koruması (Limitsiz)",
      "Jant Hasarı Koruması",
      "Muafiyet Yok",
      "Yedek Araç Garantisi",
      "3. Şahıs Mal Hasarı (500.000₺ limit)",
      "Kişisel Eşya Sigortası (10.000₺)",
      "Anahtarsız Hırsızlık Koruması",
      "VIP Yol Yardım",
    ],
    exclusions: [],
    icon: <Wrench className="w-6 h-6" />,
    color: "bg-amber-500",
  },
];

interface InsurancePackagesProps {
  onSelect: (packageId: string, price: number) => void;
  selectedPackage?: string | null;
}

const InsurancePackages = ({ onSelect, selectedPackage }: InsurancePackagesProps) => {
  return (
    <div className="space-y-6 border-t border-border pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">Sigorta Paketleri</h3>
        </div>
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Zorunlu Seçim
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Kiralama işlemine devam edebilmek için bir sigorta paketi seçmeniz gerekmektedir. 
        Paketler far, lastik ve çeşitli hasar korumalarını içerir.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insurancePackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              selectedPackage === pkg.id
                ? "border-primary shadow-lg ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            } ${pkg.recommended ? "border-purple-500/50" : ""}`}
            onClick={() => onSelect(pkg.id, pkg.price)}
          >
            {pkg.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                En Popüler
              </div>
            )}
            <CardHeader className="pb-3">
              <div className={`${pkg.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3`}>
                {pkg.icon}
              </div>
              <CardTitle className="text-lg">{pkg.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">
                  ₺{pkg.price}
                </span>
                <span className="text-muted-foreground">/kiralama</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Kapsam</h5>
                <ul className="space-y-1.5">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {pkg.exclusions.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Dikkat</h5>
                  <ul className="space-y-1">
                    {pkg.exclusions.map((exclusion, index) => (
                      <li key={index} className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span className="text-xs">{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className="w-full"
                variant={selectedPackage === pkg.id ? "default" : "outline"}
              >
                {selectedPackage === pkg.id ? "✓ Seçildi" : "Seç"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coverage Details */}
      <div className="bg-muted/50 rounded-xl p-4 space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Sigorta Kapsamı Hakkında
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">Far Koruması</p>
              <p className="text-xs text-muted-foreground">Kırık veya hasarlı farların onarım/değişim masraflarını kapsar</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <CircleDot className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">Lastik Koruması</p>
              <p className="text-xs text-muted-foreground">Patlamış, delinmiş veya hasarlı lastiklerin değişim masraflarını kapsar</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wrench className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="font-medium">Jant Koruması</p>
              <p className="text-xs text-muted-foreground">Çizik veya hasar görmüş jantların onarım masraflarını kapsar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePackages;
