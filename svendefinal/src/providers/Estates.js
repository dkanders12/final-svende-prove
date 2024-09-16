import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://jlrktvbllusppxumstik.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchEstatesWithTypeAndImages = async () => {
  const { data, error } = await supabase.from("estates").select(`
        id,
        address,
        price,
        num_rooms,
        ground_space,
        energy_label_id,
        energy_labels(letter),
         city_id,
            cities(zipcode,name),
        type_id,
        estate_types (name),  
        estate_image_rel (
          is_primary,
          images (
            image_url
          )
        )
      `);

  if (error) {
    return [];
  }

  return data;
};
