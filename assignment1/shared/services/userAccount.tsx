import { supabase } from "@/app/lib/supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error("Error fetching users:", error.message);
    return null;
  }

  console.log("User data is:", data);
  return data;
}
