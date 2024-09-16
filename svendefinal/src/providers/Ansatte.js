import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://jlrktvbllusppxumstik.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchEmployees = async () => {
  const { data, error } = await supabase.from("employees").select(`
        *
      `);

  if (error) {
    return [];
  }

  return data;
};
