import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

import { useUserStore } from "src/store/userStore";

const emailSchema = z
  .string()
  .min(1, { message: "Por favor ingresa email" })
  .email({ message: "Por favor ingrese email válido" });

export const ForgotPasswordSchema = zodResolver(
  z
    .object({
      phoneOrEmail: z
        .string()
        .min(1, { message: "Por ingresa teléfono o email" }),
    })
    .superRefine(({ phoneOrEmail }, ctx) => {
      if (isNaN(Number(phoneOrEmail))) {
        if (!emailSchema.safeParse(phoneOrEmail).success) {
          ctx.addIssue({
            code: "custom",
            message: "Ingrese un email válido",
            path: ["phoneOrEmail"],
          });
        }
      } else {
        if (!isValidPhoneNumber(phoneOrEmail)) {
          ctx.addIssue({
            code: "custom",
            message: "Ingrese un teléfono válido",
            path: ["phoneOrEmail"],
          });
        }
      }
    })
);

type ForgotPasswordValuesType = {
  phoneOrEmail: string;
};

export const ForgotPasswordValues: ForgotPasswordValuesType = {
  phoneOrEmail: "",
};
