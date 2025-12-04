import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, title, message, type } = await req.json();

    if (!userId || !title || !message) {
      throw new Error("userId, title ve message gerekli");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Sending notification to user ${userId}: ${title}`);

    // Insert notification to database
    const { error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        title,
        message,
        type: type || "booking",
        is_read: false,
      });

    if (error) {
      console.error("Notification insert error:", error);
      throw error;
    }

    console.log("Notification sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Bildirim gönderildi" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Send notification error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Bilinmeyen hata" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
