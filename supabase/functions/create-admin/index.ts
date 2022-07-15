import { createClient } from "https://esm.sh/@supabase/supabase-js@^1.35.4";
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

console.log("Successfully run List Users");

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { user } = await supabaseAdmin.auth.signUp(
      {
        email: "shahbaz.khawaja@techno-soft.com",
        password: "tstststs",
      },
      { data: { role: "Admin", status: "Confirmed" } }
    );

    const { error } = await supabaseAdmin
      .from("Employee")
      .insert({ user_id: user?.id });

    if (error) throw error;
    return new Response(JSON.stringify(user?.id), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
