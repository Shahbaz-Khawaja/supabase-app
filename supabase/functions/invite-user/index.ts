import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@^1.35.4";

const UPDATE_PASSWORD =
  "https://shiny-sfogliatella-63245c.netlify.app/update_password";

// const UPDATE_PASSWORD = "http://localhost:3000/update_password";
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

console.log("Successfully run Invite User!");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, role, priority } = await req.json();
    const { data, error } = await supabaseAdmin.auth.api.inviteUserByEmail(
      email,
      {
        data: {
          role: role,
          priority: priority,
          previousStatus: "Invited",
          currentStatus: "Invited",
        },
        redirectTo: UPDATE_PASSWORD,
      }
    );

    if (error) throw error;

    return new Response(JSON.stringify(data), {
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
