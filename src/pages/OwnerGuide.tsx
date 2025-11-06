import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car, DollarSign, Shield, Users, AlertTriangle, CheckCircle, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const OwnerGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center gap-3 mb-8">
          <Car className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Araç Sahipleri Rehberi</h1>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
          <section className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Aracınızı Kiraya Vererek Kazanın</h2>
            <p>
              RideYo platformunda aracınızı kiraya vererek pasif gelir elde edebilirsiniz. 
              Aracınız boşta dururken sizin için para kazansın! Güvenli, kolay ve karlı bir 
              araç paylaşım deneyimi için bu rehberi inceleyin.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Nasıl Başlarım?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Hesap Oluşturun</h3>
                    <p>RideYo'ya üye olun ve "Araç Sahibi" rolünü seçin. Kimlik doğrulaması yapın.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Aracınızı Ekleyin</h3>
                    <p>Araç bilgilerini, fotoğrafları ve belgelerini sisteme yükleyin.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Fiyatlandırma Yapın</h3>
                    <p>Dakika, saat ve günlük kiralama fiyatlarınızı belirleyin.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Kazanmaya Başlayın</h3>
                    <p>Aracınız onaylandıktan sonra kiralama isteklerini kabul edin ve kazanın!</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Kazanç Potansiyeli</h2>
            </div>

            <div className="bg-card p-6 rounded-lg border mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Örnek Kazanç Hesaplaması</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Kompakt Araç (günlük 500 TL)</span>
                  <span className="font-semibold text-foreground">Ayda ~12,000 TL</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Sedan (günlük 700 TL)</span>
                  <span className="font-semibold text-foreground">Ayda ~16,800 TL</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>SUV (günlük 1,000 TL)</span>
                  <span className="font-semibold text-foreground">Ayda ~24,000 TL</span>
                </div>
                <p className="text-sm mt-4 text-muted-foreground">
                  * Kazançlar, ayda ortalama 24 gün kiralama varsayımına göre hesaplanmıştır. 
                  RideYo %15 komisyon ücreti alır.
                </p>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Kazancınızı Artırın
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Aracınızın fotoğraflarını profesyonel çekin</li>
                <li>Detaylı ve dürüst açıklamalar yazın</li>
                <li>Temiz ve bakımlı araç sunun</li>
                <li>Hızlı yanıt verin ve esnek olun</li>
                <li>İyi yorumlar alarak puanınızı yükseltin</li>
                <li>Kampanya dönemlerinde fiyat indirimi yapın</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Güvenlik ve Sigorta</h2>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Sigorta Kapsamı
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Tüm kiralamalar RideYo Mini Kasko ile korunur</li>
                  <li>Kendi kasko poliçeniz varsa ek koruma sağlar</li>
                  <li>Zorunlu Trafik Sigortası (ZTS) her araçta olmalıdır</li>
                  <li>Yolcu Ferdi Kaza Sigortası önerilir</li>
                  <li>Hasar durumunda süreç RideYo tarafından yönetilir</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Güvenlik Önlemleri
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Tüm kiracılar kimlik ve ehliyet doğrulamasından geçer</li>
                  <li>Sürücü puanı ve geçmişi kontrol edilir</li>
                  <li>GPS takip sistemi ile aracınızı izleyin</li>
                  <li>Hasar tespiti için öncesi ve sonrası fotoğraf çekilir</li>
                  <li>7/24 destek ekibi her zaman yanınızda</li>
                </ul>
              </Card>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Kiracı Seçimi</h2>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Kiracı Değerlendirme Kriterleri</h3>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">✅ İyi Kiracı Özellikleri</h4>
                  <ul className="list-disc list-inside space-y-1 ml-6">
                    <li>Yüksek sürücü puanı (80+)</li>
                    <li>Düşük ceza puanı (30 altı)</li>
                    <li>Onaylı kimlik ve ehliyet</li>
                    <li>Olumlu kiralama geçmişi</li>
                    <li>Hızlı iletişim ve açık profil</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">⚠️ Dikkat Edilmesi Gerekenler</h4>
                  <ul className="list-disc list-inside space-y-1 ml-6 text-muted-foreground">
                    <li>Yeni hesaplar (değerlendirme yok)</li>
                    <li>Düşük sürücü puanı (60 altı)</li>
                    <li>Yüksek ceza puanı (50+)</li>
                    <li>Olumsuz yorumlar</li>
                    <li>Belirsiz rezervasyon talepleri</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Kiralama Yönetimi</h2>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Rezervasyon Kabul/Red</h3>
                <p className="mb-4">
                  Gelen rezervasyon isteklerini dikkatlice değerlendirin. Otomatik kabul veya 
                  manuel onay seçeneklerinden birini tercih edebilirsiniz.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li><strong>Otomatik Kabul:</strong> Kriterleri karşılayan tüm rezervasyonlar otomatik onaylanır</li>
                  <li><strong>Manuel Onay:</strong> Her rezervasyonu tek tek değerlendirirsiniz</li>
                  <li><strong>Yanıt Süresi:</strong> Rezervasyon taleplerini 24 saat içinde yanıtlayın</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Müsaitlik Takvimi</h3>
                <p className="mb-4">
                  Araç müsaitlik takviminizi güncel tutun. Kişisel kullanım veya bakım için 
                  belirli tarihleri bloke edebilirsiniz.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Uzun dönem kiralamalar için özel fiyatlar belirleyin</li>
                  <li>Hafta içi ve hafta sonu farklı fiyatlandırma yapabilirsiniz</li>
                  <li>Tatil ve özel günler için fiyatları ayarlayın</li>
                </ul>
              </Card>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Sorun Çözümü</h2>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Hasar Durumunda</h3>
                <ol className="list-decimal list-inside space-y-2 ml-6">
                  <li>Kiracıdan hasar fotoğrafları isteyin</li>
                  <li>RideYo destek ekibini hemen bilgilendirin</li>
                  <li>Gerekirse polis raporu alınmasını sağlayın</li>
                  <li>Sigorta sürecini RideYo ile birlikte yürütün</li>
                  <li>Onarım için onaylı servislerden teklif alın</li>
                </ol>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Geç İade</h3>
                <p className="mb-2">
                  Kiracı aracı zamanında teslim etmezse:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Önce kiracıyla iletişime geçin</li>
                  <li>15 dakika ücretsiz tolerans süresi vardır</li>
                  <li>Sonrası için saatlik ücret otomatik hesaplanır</li>
                  <li>24 saat geçerse RideYo destek devreye girer</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">İletişim Sorunları</h3>
                <p className="mb-2">
                  Kiracıyla iletişim kuramıyorsanız:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>RideYo uygulama içi mesajlaşmayı kullanın</li>
                  <li>Telefon ve WhatsApp ile ulaşmayı deneyin</li>
                  <li>Acil durumda RideYo destek hattını arayın</li>
                  <li>GPS takip ile aracın konumunu kontrol edin</li>
                </ul>
              </Card>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">En İyi Uygulamalar</h2>
            </div>

            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Araç Bakımı</h3>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Düzenli servis bakımı yaptırın</li>
                    <li>Her kiralama sonrası temizlik yapın</li>
                    <li>Yakıt seviyesini kontrol edin</li>
                    <li>Lastik basınçlarını kontrol edin</li>
                    <li>İç mekan temizliğine özen gösterin</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">İletişim</h3>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Hızlı ve kibar yanıtlar verin</li>
                    <li>Net ve anlaşılır bilgi paylaşın</li>
                    <li>Soruları sabırla cevaplayın</li>
                    <li>Teslim/iade zamanlarında esnek olun</li>
                    <li>Kiracılarla iyi ilişkiler kurun</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Fiyatlandırma</h3>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Rakip fiyatları araştırın</li>
                    <li>Sezona göre fiyat ayarlayın</li>
                    <li>Uzun kiralama indirimleri verin</li>
                    <li>İlk kiracılara özel fiyat sunun</li>
                    <li>Talep durumuna göre optimize edin</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Dokümantasyon</h3>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>Tüm belgeleri güncel tutun</li>
                    <li>Fotoğrafları düzenli güncelleyin</li>
                    <li>Hasar kayıtlarını saklayın</li>
                    <li>Teslim formlarını arşivleyin</li>
                    <li>Muhasebe kayıtlarını düzenleyin</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Ödeme ve Muhasebe</h2>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Ödeme Süreci</h3>
              <ul className="list-disc list-inside space-y-2 ml-6 mb-6">
                <li>Kiralama bedeli kiracıdan RideYo tarafından tahsil edilir</li>
                <li>RideYo %15 komisyon kesintisi yapar</li>
                <li>Kalan tutar 7 iş günü içinde hesabınıza aktarılır</li>
                <li>Aylık toplu ödeme seçeneği de mevcuttur</li>
                <li>Tüm işlemler faturalandırılır ve kayıt altına alınır</li>
              </ul>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Vergi ve Yasal Yükümlülükler</h4>
                <p className="mb-2">
                  Araç kiralama geliri vergiye tabidir. Düzenli kiralama yapıyorsanız:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Gelir vergisi beyannamesi vermeniz gerekebilir</li>
                  <li>Ticari faaliyet olarak kayıt yaptırabilirsiniz</li>
                  <li>Muhasebeci ile çalışmanızı öneririz</li>
                  <li>RideYo size aylık gelir raporu sağlar</li>
                </ul>
              </div>
            </Card>
          </section>

          <section className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Destek ve İletişim</h2>
            <p className="mb-4">
              Herhangi bir sorunuz veya sorununuz olduğunda 7/24 destek ekibimizle iletişime 
              geçebilirsiniz.
            </p>
            <div className="space-y-2">
              <p><strong className="text-foreground">📞 Telefon:</strong> +90 (462) 123 45 67</p>
              <p><strong className="text-foreground">📧 E-posta:</strong> owner-support@rideyo.com</p>
              <p><strong className="text-foreground">💬 WhatsApp:</strong> +90 (539) 526 32 93</p>
              <p><strong className="text-foreground">🕐 Çalışma Saatleri:</strong> 7/24 Destek</p>
            </div>
          </section>

          <section className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Başarı İçin İpuçları
            </h2>
            <div className="space-y-3">
              <p>✅ İyi fotoğraflar çekin - Aracınızın her açısını profesyonelce gösterin</p>
              <p>✅ Dürüst olun - Kusurları ve hasarları açıkça belirtin</p>
              <p>✅ Hızlı yanıt verin - İlk 1 saat içinde cevap verin</p>
              <p>✅ Temiz tutun - Her kiralama sonrası detaylı temizlik</p>
              <p>✅ Esnek olun - Teslim/iade zamanlarında anlayışlı olun</p>
              <p>✅ İyi yorumlar alın - Müşteri memnuniyetini önceliklendirin</p>
              <p>✅ Düzenli bakım - Aracınızı her zaman hazır tutun</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OwnerGuide;