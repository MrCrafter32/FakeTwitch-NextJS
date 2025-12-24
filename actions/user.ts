"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

type UpdateUserInput = {
  bio?: string | null;
};

export const updateUser = async (values: UpdateUserInput) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Unauthorized");
  }

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData }
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};
