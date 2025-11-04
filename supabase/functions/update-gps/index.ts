import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { carId, latitude, longitude, speed, heading, batteryLevel } = await req.json();

    console.log('Updating GPS for car:', carId);

    // Update car's current location
    const { error: updateError } = await supabaseClient
      .from('cars')
      .update({
        latitude,
        longitude,
        speed: speed || 0,
        heading: heading || 0,
        battery_level: batteryLevel || 100,
        last_gps_update: new Date().toISOString(),
      })
      .eq('id', carId);

    if (updateError) {
      console.error('Error updating car GPS:', updateError);
      throw updateError;
    }

    // Insert into GPS history
    const { error: historyError } = await supabaseClient
      .from('gps_location_history')
      .insert({
        car_id: carId,
        latitude,
        longitude,
        speed: speed || 0,
        heading: heading || 0,
        timestamp: new Date().toISOString(),
      });

    if (historyError) {
      console.error('Error inserting GPS history:', historyError);
      throw historyError;
    }

    console.log('GPS updated successfully for car:', carId);

    return new Response(
      JSON.stringify({ success: true, message: 'GPS updated successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in update-gps function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});