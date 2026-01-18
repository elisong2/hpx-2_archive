"use server";

import { createClient } from "@/lib/supabase/server";

export async function newBuildHelper(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const files = formData.getAll("image") as File[];

  const paths: string[] = [];

  for (const file of files) {
    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("build-images")
      .upload(fileName, file);

    if (error) throw error;

    paths.push(data.path);
  }

  // Insert the build
  console.log("User in server action:", user);

  const { data, error } = await supabase.from("builds").insert({
    title: formData.get("title"),
    description: formData.get("description"),
    image_urls: paths,
    make_id: 1,
    model_id: 3,
  });

  console.log("DB insert:", data, error);
}


//////////

export async function newBuild(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("User in server action:", user);
  const { data, error } = await supabase.from("builds").insert({
    title: formData.get("title"),
    description: formData.get("description"),
    make_id: 1,
    model_id: 3,
  });
  console.log(data);
  console.log(error);
}