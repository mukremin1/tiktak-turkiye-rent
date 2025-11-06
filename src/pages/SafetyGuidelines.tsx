import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, AlertTriangle, CheckCircle, Car, Users, FileText } from "lucide-react";

const SafetyGuidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Güvenlik Kuralları</h1>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
          <section className="bg-muted p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Önemli Güvenlik Uyarısı</h2>
                <p>
                  RideYo'da güvenliğiniz bizim önceliğimizdir. Aşağıdaki kuralları dikkatlice okuyarak 
                  hem kendinizin hem de diğer kullanıcıların güvenliğini sağlayabilirsiniz.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Araç Kiralama Öncesi</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Ehliyet Kontrolü
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Geçerli bir sürücü belgesine sahip olmalısınız</li>
                  <li>Ehliyet süresi minimum 2 yıl olmalıdır</li>
                  <li>Yaş sınırı 21-70 arasında olmalıdır</li>
                  <li>Sürücü puanınız minimum 60 olmalıdır</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Araç Kontrolleri
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Aracı teslim almadan önce dış görünüşünü kontrol edin</li>
                  <li>Mevcut hasar ve çiziklerin fotoğrafını çekin</li>
                  <li>Yakıt seviyesini kontrol edin</li>
                  <li>Lastik durumunu inceleyin</li>
                  <li>İç mekan temizliğini kontrol edin</li>
                  <li>Tüm dokümanların araçta olduğundan emin olun</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Sürüş Güvenliği</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">Trafik Kurallarına Uyum</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Hız limitlerini aşmayın</li>
                  <li>Alkollü veya uyuşturucu etkisinde araç kullanmayın</li>
                  <li>Emniyet kemerinizi mutlaka takın</li>
                  <li>Cep telefonu kullanmayın (handsfree hariç)</li>
                  <li>Yorgunken araç kullanmayın</li>
                  <li>Trafik işaretlerine uyun</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-500 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Yasaklar
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-6 text-muted-foreground">
                  <li>Aracı başkasına devretmek yasaktır</li>
                  <li>Yurt dışına çıkmak yasaktır</li>
                  <li>Araçta sigara içmek yasaktır</li>
                  <li>Evcil hayvan taşımak (özel izin olmadan) yasaktır</li>
                  <li>Yarış veya gösteri amaçlı kullanmak yasaktır</li>
                  <li>Yasal olmayan faaliyetlerde kullanmak yasaktır</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Acil Durumlar</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">Kaza Durumunda</h3>
                <ol className="list-decimal list-inside space-y-2 ml-6">
                  <li>Önce can güvenliğinizi sağlayın</li>
                  <li>Gerekirse 112'yi arayın</li>
                  <li>Polis ve trafik ekiplerini bilgilendirin</li>
                  <li>RideYo destek hattını (7/24) arayın</li>
                  <li>Kaza tutanağı düzenletin</li>
                  <li>Olay yerinin ve hasarın fotoğraflarını çekin</li>
                  <li>Karşı tarafın bilgilerini alın</li>
                </ol>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">Arıza Durumunda</h3>
                <ol className="list-decimal list-inside space-y-2 ml-6">
                  <li>Aracı güvenli bir yere çekin</li>
                  <li>Uyarı ikaz işaretlerini yerleştirin</li>
                  <li>RideYo destek hattını arayın</li>
                  <li>Yol yardım hizmeti gelene kadar bekleyin</li>
                  <li>Kendiniz müdahale etmeyin</li>
                </ol>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-3">7/24 Destek Hatları</h3>
                <div className="space-y-2">
                  <p><strong className="text-foreground">Acil Destek:</strong> +90 (462) 111 11 11</p>
                  <p><strong className="text-foreground">Yol Yardım:</strong> +90 (462) 222 22 22</p>
                  <p><strong className="text-foreground">WhatsApp:</strong> +90 (462) 333 33 33</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Araç Sahibi Güvenliği</h2>
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-2">Araç Sahipleri İçin Öneriler</h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Aracınızın bakımını düzenli yaptırın</li>
                <li>Sigorta ve muayene belgelerini güncel tutun</li>
                <li>Kiralama öncesi ve sonrası araç kontrolü yapın</li>
                <li>GPS takip sistemini aktif tutun</li>
                <li>Acil durum ekipmanlarını kontrol edin (ilk yardım, yangın söndürücü)</li>
                <li>Kiracı ile doğrudan finansal anlaşma yapmayın</li>
                <li>Tüm işlemleri RideYo platformu üzerinden gerçekleştirin</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Araç Teslimi</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">Teslim Alma</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Rezervasyon bilgilerinizi hazır bulundurun</li>
                  <li>Kimlik ve ehliyet belgelerinizi yanınıza alın</li>
                  <li>Araç kontrol formunu birlikte doldurun</li>
                  <li>Tüm hasar ve eksiklikleri kaydedin</li>
                  <li>Yakıt seviyesini not edin</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">Teslim Etme</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Aracı temiz teslim edin</li>
                  <li>Yakıt seviyesini başlangıç seviyesine getirin</li>
                  <li>Araç içinde eşya unutmayın</li>
                  <li>Tüm dokümanları teslim edin</li>
                  <li>Hasar kontrolü yaptırın</li>
                  <li>Teslim formunu imzalayın</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Yaptırımlar</h2>
            <p className="mb-4">
              Güvenlik kurallarına uymamanız durumunda:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-6">
              <li>Hesabınız geçici veya kalıcı olarak askıya alınabilir</li>
              <li>Cezai işlem uygulanabilir</li>
              <li>Sigorta kapsamı dışında kalabilirsiniz</li>
              <li>Yasal süreç başlatılabilir</li>
              <li>Depozito iadeniz yapılmayabilir</li>
            </ul>
          </section>

          <section className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Hatırlatma</h2>
            <p>
              Bu güvenlik kuralları hem sizin hem de tüm RideYo kullanıcılarının güvenliği için 
              hazırlanmıştır. Kurallara uyarak güvenli ve keyifli bir araç paylaşım deneyimi 
              yaşayabilirsiniz.
            </p>
            <p className="mt-4">
              <strong>Güvenli yolculuklar dileriz! 🚗</strong>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SafetyGuidelines;