import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!imageBase64) {
      throw new Error("Image data is required");
    }

    console.log("Starting AI damage detection analysis...");

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
            content: `Sen bir araç hasar tespit uzmanısın. Gönderilen araç fotoğraflarını analiz ederek hasarları tespit edip detaylı rapor oluşturuyorsun.

Rapor formatı:
- Hasar Durumu: (Hasarsız / Hafif Hasar / Orta Hasar / Ağır Hasar)
- Tespit Edilen Hasarlar: (Liste halinde)
- Hasar Bölgeleri: (Ön tampon, kapı, çamurluk vb.)
- Tahmini Onarım Önerisi: 
- Aciliyet Seviyesi: (Düşük / Orta / Yüksek)
- Ek Notlar:

Türkçe yanıt ver ve profesyonel bir hasar raporu oluştur.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Bu araç fotoğrafını analiz et ve hasar tespiti yap. Detaylı bir hasar raporu oluştur."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit aşıldı, lütfen daha sonra tekrar deneyin." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Ödeme gerekli, lütfen hesabınıza kredi ekleyin." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const report = data.choices?.[0]?.message?.content || "Hasar raporu oluşturulamadı.";

    console.log("Damage detection completed successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        report,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Damage detection error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Bilinmeyen hata" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
