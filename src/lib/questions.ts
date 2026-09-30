import { supabase } from "./supabase";

export async function getQuestions(subject: string) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("subject", subject);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}