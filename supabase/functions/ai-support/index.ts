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
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Sen RideYo araç kiralama platformunun müşteri hizmetleri asistanısın. 

Görevlerin:
- Kullanıcılara araç kiralama, rezervasyon, ödeme ve kullanım hakkında yardımcı olmak
- Teknik sorunları çözmek ve yönlendirme yapmak
- Kampanyalar ve indirimler hakkında bilgi vermek
- Sürücü puanlama sistemi ve güvenlik kuralları hakkında açıklama yapmak
- Araç uyarıları (kaput açılması, kaza vb.) hakkında bilgi vermek

Önemli Kurallar:
- Minimum sürücü puanı 60 olmalı
- Maksimum ceza puanı 70 olabilir
- Her kiralama öncesi sürücü belgesi kontrolü yapılır
- Acil durumlarda (kaza, arıza) 7/24 destek sunulur
- Araç alarm sistemi otomatik bildirim gönderir

Her zaman kibar, yardımsever ve profesyonel ol. Yanıtlarını kısa ve öz tut.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit aşıldı, lütfen daha sonra tekrar deneyin." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Ödeme gerekli, lütfen hesabınıza bakiye ekleyin." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI servisinde hata oluştu" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Support chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Bilinmeyen hata" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
