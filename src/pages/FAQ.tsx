import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "RentNow nasıl çalışır?",
      answer: "RentNow, araç sahiplerinin kullanmadıkları araçlarını kiraya vermesini sağlayan bir platformdur. Kullanıcılar dakika, saat veya gün bazında araç kiralayabilir. Tüm işlemler uygulama üzerinden güvenli bir şekilde gerçekleşir."
    },
    {
      question: "Araç kiralamak için ne yapmalıyım?",
      answer: "Öncelikle bir hesap oluşturmanız gerekiyor. Ardından uygulama üzerinden uygun bir araç seçip, kiralama süresini belirleyebilir ve ödeme yapabilirsiniz. Rezervasyonunuz onaylandıktan sonra araç bilgilerine erişebilirsiniz."
    },
    {
      question: "Fiyatlandırma nasıl yapılıyor?",
      answer: "Her araç için dakikalık, saatlik ve günlük fiyatlar belirlenmiştir. Kiralama sürenize göre otomatik olarak hesaplama yapılır. Dakikalık kiralama için provizyon çekilir ve sadece kullandığınız süre kadar ücret alınır."
    },
    {
      question: "Aracımı nasıl kiraya verebilirim?",
      answer: "Araç sahibi hesabı oluşturarak başlayabilirsiniz. 'Araç Ekle' sayfasından aracınızın bilgilerini, fotoğraflarını ve fiyatlarını girerek kiraya verebilirsiniz. Araçlarınızı istediğiniz zaman müsait veya müsait değil olarak işaretleyebilirsiniz."
    },
    {
      question: "Ödeme güvenli mi?",
      answer: "Evet, tüm ödemeler güvenli ödeme altyapımız üzerinden gerçekleşir. Kredi kartı bilgileriniz şifrelenerek saklanır ve PCI-DSS standartlarına uygun işlem yapılır."
    },
    {
      question: "İptal politikası nedir?",
      answer: "Kiralama başlangıcından 24 saat öncesine kadar ücretsiz iptal yapabilirsiniz. 24 saatten daha kısa sürede iptal durumunda, toplam ücretin %50'si iade edilir."
    },
    {
      question: "Kaza durumunda ne olur?",
      answer: "Tüm araçlar kaza sigortası ile korunmaktadır. Kaza durumunda derhal müşteri hizmetlerimizi aramanız ve gerekli prosedürleri takip etmeniz gerekmektedir. Hasar durumunda kasko kapsamında işlem yapılır."
    },
    {
      question: "Minimum kiralama süresi var mı?",
      answer: "Dakikalık kiralama için minimum 30 dakika, saatlik kiralama için minimum 1 saat, günlük kiralama için minimum 1 gün süre bulunmaktadır."
    },
    {
      question: "Hangi şehirlerde hizmet veriyorsunuz?",
      answer: "Şu anda Trabzon'da hizmet vermekteyiz. Yakında diğer şehirlere de açılmayı planlıyoruz."
    },
    {
      question: "Araç teslim ve iade nasıl yapılır?",
      answer: "Araç sahibi ile koordine ederek belirlenen lokasyonda teslim alma ve iade işlemlerini gerçekleştirirsiniz. Teslim ve iade sırasında araç durumunu kontrol etmeniz önerilir."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Sık Sorulan Sorular</h1>
          <p className="text-muted-foreground text-center mb-12">
            RentNow hakkında merak ettiğiniz her şey
          </p>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sorunuz burada yok mu?
            </h2>
            <p className="text-muted-foreground mb-4">
              Bizimle iletişime geçmekten çekinmeyin
            </p>
            <a href="/contact" className="text-primary hover:underline">
              İletişim sayfasına git →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;