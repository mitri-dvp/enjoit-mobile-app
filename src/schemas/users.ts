import { UserModel } from "src/models/zod";
import { z } from "zod";

export const UserCreateInputSchema = UserModel.merge(
  z.object({
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
)
  .omit({
    id: true,
    storeId: true,
    tableId: true,
    countryId: true,
  })
  .strict();

export const UserUpdateInputSchema = UserCreateInputSchema.partial();
