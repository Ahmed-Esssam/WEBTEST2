"use server";
// app/lib/revalidate.ts

import { revalidateTag, revalidatePath } from "next/cache";

export const revalidateTags = async (tags: string[]) => {
  tags.forEach((tag) => revalidateTag(tag, "page"));
  console.log(`Revalidated tags: ${tags.join(", ")}`);
};

export const revalidatePaths = async (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path, "page"));
  console.log(`Revalidated paths: ${paths.join(", ")}`);
};
