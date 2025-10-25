import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Sen RideYo araç kiralama platformunun yardımcı asistanısın. Kullanıcılara araç kiralama, fiyatlandırma, sigorta paketleri ve genel sorular hakkında yardımcı oluyorsun.

Fiyatlandırma bilgileri:
- Dakikalık kiralama
- Saatlik kiralama
- Günlük kiralama
- KM paketleri: 50km, 100km, 200km, 500km
- Yakıt bizden (ücretsiz)

Sigorta paketleri:
1. Temel Sigorta (₺50/gün): Trafik sigortası, zorunlu mali sorumluluk, 7/24 yol yardım
2. Standart Sigorta (₺100/gün - Önerilen): Kasko, cam kırılması, mini onarım
3. Premium Sigorta (₺200/gün): Tam kasko, muafiyet indirimi, yedek araç garantisi

Araç sahipleri için: Kendi araçlarını platforma ekleyerek kazanç sağlayabilirler.

Türkçe ve dostça yanıtlar ver. Kısa ve öz ol.`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Ödeme gerekli, lütfen hesabınızı kontrol edin." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI servis hatası" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Bilinmeyen hata" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
