import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

const RentalAgreement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Kiralama Sözleşmesi</h1>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section className="bg-muted p-6 rounded-lg">
            <p className="text-sm">
              İşbu Araç Kiralama Sözleşmesi ("Sözleşme"), RideYo platformu üzerinden araç kiralayan 
              ("Kiracı") ile araç sahibi ("Kiraya Veren") arasında aşağıdaki şartlar dahilinde 
              akdedilmiştir.
            </p>
            <p className="text-sm mt-2">
              <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 1: Taraflar</h2>
            
            <div className="bg-card p-4 rounded-lg border mb-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">1.1. Kiraya Veren</h3>
              <p>
                RideYo platformuna kayıtlı, aracını kiralamaya sunan gerçek veya tüzel kişi. 
                Kiraya veren, aracın tam sahibi ve/veya yetkili temsilcisi olduğunu beyan eder.
              </p>
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-2">1.2. Kiracı</h3>
              <p>
                RideYo platformu üzerinden araç kiralayan, geçerli sürücü belgesi olan ve 
                platform şartlarını kabul eden gerçek kişi.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 2: Kiralama Şartları</h2>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">2.1. Genel Şartlar</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Kiracı en az 21 yaşında, en fazla 70 yaşında olmalıdır</li>
                  <li>Geçerli ve onaylı sürücü belgesi olmalıdır (minimum 2 yıl)</li>
                  <li>Kimlik ve ehliyet fotokopisi sisteme yüklenmelidir</li>
                  <li>Sürücü puanı minimum 60 olmalıdır</li>
                  <li>Ceza puanı 70'i geçmemelidir</li>
                  <li>Aktif trafik cezası borcu bulunmamalıdır</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">2.2. Kiralama Süresi ve Fiyatlandırma</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Minimum kiralama süresi 1 saattir</li>
                  <li>Fiyatlandırma dakika, saat ve gün bazlı olabilir</li>
                  <li>Kilometre paketleri ayrıca tanımlanabilir</li>
                  <li>Geç iade durumunda saatlik ücret uygulanır</li>
                  <li>Hasar durumunda ek ücretler söz konusu olabilir</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 3: Ödeme ve Depozito</h2>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">3.1. Ödeme Koşulları</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Kiralama bedeli rezervasyon sırasında ödenir</li>
                  <li>Kabul edilen ödeme yöntemleri: Kredi kartı, banka kartı</li>
                  <li>RideYo komisyon ücreti kiralama bedelinin %15'idir</li>
                  <li>Tüm ödemeler RideYo platformu üzerinden yapılır</li>
                  <li>Doğrudan ödeme yapılması durumunda sigorta geçersiz olur</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">3.2. Depozito</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Araç tipine göre 500-2000 TL arası depozito alınır</li>
                  <li>Depozito hasar yoksa 7 iş günü içinde iade edilir</li>
                  <li>Trafik cezaları depozitoden düşülür</li>
                  <li>Hasarlar sigorta kapsamı dışındaysa depozitoden karşılanır</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 4: Araç Teslimi</h2>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">4.1. Teslim Alma</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Araç, belirlenen tarih ve saatte teslim alınır</li>
                  <li>Teslim sırasında araç kontrol formu doldurulur</li>
                  <li>Mevcut hasarlar fotoğraflanır ve kayda alınır</li>
                  <li>Yakıt seviyesi not edilir</li>
                  <li>Kilometre bilgisi kaydedilir</li>
                  <li>Araçta bulunması gereken dokümanlar kontrol edilir</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">4.2. Teslim Etme</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Araç, kira süresinin bitiminde temiz teslim edilir</li>
                  <li>Yakıt seviyesi başlangıç seviyesine getirilir</li>
                  <li>Kilometre sınırı aşılmamış olmalıdır (paket varsa)</li>
                  <li>Araçta unutulan eşyadan RideYo sorumlu değildir</li>
                  <li>Hasar kontrolü yapılır ve kaydedilir</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 5: Sigorta ve Sorumluluk</h2>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">5.1. Sigorta Kapsamı</h3>
                <p className="mb-2">Tüm araçlar aşağıdaki sigortalarla korunmaktadır:</p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Zorunlu Trafik Sigortası (ZTS)</li>
                  <li>Kasko Sigortası (ihtiyari, araç sahibine bağlı)</li>
                  <li>Mini Kasko (RideYo tarafından sağlanır)</li>
                  <li>Yolcu Ferdi Kaza Sigortası</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-500 mb-2">5.2. Sigorta Kapsamı Dışı Durumlar</h3>
                <ul className="list-disc list-inside space-y-2 ml-6 text-muted-foreground">
                  <li>Alkol veya uyuşturucu etkisinde araç kullanımı</li>
                  <li>Ehliyet olmadan veya süresi dolmuş ehliyet ile kullanım</li>
                  <li>Yarış veya gösteri amaçlı kullanım</li>
                  <li>İzinsiz yurt dışı çıkışı</li>
                  <li>Kasıtlı hasar</li>
                  <li>Yetkisiz kişiye araç teslimi</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">5.3. Hasar ve Kaza Durumu</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Her türlü kaza derhal RideYo'ya bildirilir</li>
                  <li>Polis raporu alınır</li>
                  <li>Kaza tespit tutanağı düzenlenir</li>
                  <li>Fotoğraf ve video kaydı alınır</li>
                  <li>Sigorta kapsamında olmayan hasarlardan kiracı sorumludur</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 6: Kullanım Kuralları</h2>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-2">6.1. İzin Verilenler</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Türkiye sınırları içinde kullanım</li>
                  <li>Asfalt ve stabilize yollarda kullanım</li>
                  <li>Trafik kurallarına uygun kullanım</li>
                  <li>Bakımlı ve temiz kullanım</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-500 mb-2">6.2. Yasaklar</h3>
                <ul className="list-disc list-inside space-y-2 ml-6 text-muted-foreground">
                  <li>Sigara içmek ve alkol kullanmak</li>
                  <li>Evcil hayvan taşımak (izin olmadan)</li>
                  <li>Araç kapasitesini aşmak</li>
                  <li>Yetkisiz tamirat yaptırmak</li>
                  <li>Tehlikeli madde taşımak</li>
                  <li>Alt kiralama yapmak</li>
                  <li>Off-road kullanım</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 7: İptal ve İade</h2>
            
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-2">7.1. İptal Koşulları</h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li><strong>24 saat öncesine kadar:</strong> %100 iade</li>
                <li><strong>12-24 saat arası:</strong> %50 iade</li>
                <li><strong>12 saatten az:</strong> İade yok</li>
                <li><strong>No-show (gelmeme):</strong> İade yok</li>
              </ul>
            </div>

            <div className="bg-card p-4 rounded-lg border mt-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">7.2. Kiraya Veren İptali</h3>
              <p>
                Kiraya veren son dakika iptali yapması durumunda alternatif araç sağlamakla 
                yükümlüdür. Alternatif sağlanamazsa rezervasyon bedeli %120 olarak iade edilir.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 8: Trafik Cezaları</h2>
            
            <div className="bg-card p-4 rounded-lg border">
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Kiralama süresi içinde oluşan trafik cezaları kiracıya aittir</li>
                <li>Ceza tebligatları kiraya verene gelir</li>
                <li>Kiracı, ceza tutarını 15 gün içinde RideYo'ya öder</li>
                <li>Ödeme yapılmaması durumunda depozito kullanılır</li>
                <li>RideYo, ceza işlemlerinde %20 hizmet ücreti alır</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 9: Kişisel Veriler</h2>
            <p>
              Bu sözleşme kapsamında toplanan tüm kişisel veriler, RideYo Gizlilik Politikası ve 
              KVKK Aydınlatma Metni hükümlerine uygun olarak işlenir ve korunur. Taraflar, 
              kişisel verilerinin işlenmesini kabul eder.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 10: Uyuşmazlık Çözümü</h2>
            
            <div className="bg-card p-4 rounded-lg border">
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Bu sözleşmeden doğan uyuşmazlıklar öncelikle dostane yollarla çözülür</li>
                <li>Çözüm sağlanamazsa Trabzon mahkemeleri ve icra daireleri yetkilidir</li>
                <li>Türkiye Cumhuriyeti yasaları uygulanır</li>
                <li>Tüketici hakem heyetlerine başvuru hakkı saklıdır</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Madde 11: Yürürlük</h2>
            <p>
              İşbu sözleşme, kiracının rezervasyonu onaylaması ile yürürlüğe girer ve kiralama 
              süresinin sona ermesi ile son bulur. Sözleşme hükümleri her iki taraf için de 
              bağlayıcıdır.
            </p>
          </section>

          <section className="bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Beyan ve Kabul</h2>
            <p>
              RideYo platformu üzerinden rezervasyon yaparak bu sözleşmenin tüm maddelerini 
              okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
            </p>
            <p className="mt-4">
              <strong>İletişim:</strong>
            </p>
            <div className="mt-2 space-y-1">
              <p>RideYo Araç Kiralama Hizmetleri</p>
              <p>Trabzon, Türkiye</p>
              <p>E-posta: info@rideyo.com</p>
              <p>Telefon: +90 (462) 123 45 67</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentalAgreement;