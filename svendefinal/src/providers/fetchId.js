import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (example)
const supabaseUrl = "https://your-supabase-url";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchEstateById = async (id) => {
  const { data, error } = await supabase
    .from("estates")
    .select(
      `
      id,
      address,
      price,
      num_rooms,
      ground_space,
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
