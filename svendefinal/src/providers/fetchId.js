import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (example)
const supabaseUrl = "https://jlrktvbllusppxumstik.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchEstateById = async (id) => {
  const { data, error } = await supabase
    .from("estates")
    .select(
      `
        id,
        address,
        price,
        payout,
        gross,
        net,
        cost,
        num_floors,
        num_rooms,
        floor_space,
        ground_space,
        basement_space,
        year_construction,
        year_rebuilt,
        description,
        num_clicks,
        floorplan,
        employee_id (firstname, lastname, position, image_url, phone, email),
        estate_types (name),
        cities (zipcode, name),
        estate_image_rel (images (image_url)),
        energy_labels (letter)
      `
    )
    .eq("id", id)
    .single(); // Get single estate by ID

  if (error) {
    console.error("Error fetching estate by ID:", error);
    return null;
  }
  return data;
};
