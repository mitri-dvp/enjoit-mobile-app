import { z } from "zod";

import { isValidPhoneNumber } from "libphonenumber-js";
import dayjs from "src/utils/dayjs";

export const SignupInputSchema = z
  .object({
    nickName: z.string().min(1, { message: "Por favor ingresa nickname" }),
    email: z
      .string()
      .min(1, { message: "Por favor ingresa email" })
      .email({ message: "Por favor ingrese email válido" }),
    password: z.string().min(1, { message: "Por favor ingresa contraseña" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Por favor ingresa contraseña" }),
    firstName: z.string().min(1, { message: "Por favor ingresa nombre" }),
    lastName: z.string().min(1, { message: "Por favor ingresa apellido" }),
    gender: z.string().min(1, { message: "Por favor seleccione genero" }),
    birthDate: z
      .date({
        errorMap: (issue, ctx) => {
          return { message: "Ingrese una fecha válida" };
        },
      })
      .min(dayjs().subtract(85, "years").toDate(), {
        message: "Muy mayor para registrarse",
      })
      .max(dayjs().subtract(3, "years").toDate(), {
        message: "Muy jóven para registrarse",
      }),
    phone: z.string().refine((value) => isValidPhoneNumber(value), {
      message: "Ingrese un teléfono válido",
    }),
    birthCountry: z.string().min(1, { message: "Por favor seleccione país" }),
    birthState: z.string().min(1, { message: "Por favor seleccione estado" }),
    birthCity: z.string().min(1, { message: "Por favor seleccione ciudad" }),
    birthPostalCode: z.string().nullable(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

export const SignupInputValues: z.infer<typeof SignupInputSchema> = {
  nickName: String(),
  email: String(),
  password: String(),
  confirmPassword: String(),
  firstName: String(),
  lastName: String(),
  gender: String(),
  birthDate: new Date(),
  phone: String(),
  birthCountry: String(),
  birthState: String(),
  birthCity: String(),
  birthPostalCode: null,
};

export const LoginInputSchema = z.object({
  birthCountry: z.string().min(1, { message: "Por favor seleccione país" }),
  email: z
    .string()
    .min(1, { message: "Por favor ingresa email" })
    .email({ message: "Por favor ingrese email válido" }),
  password: z.string().min(1, { message: "Por favor ingresa contraseña" }),
});

export const LoginInputValues: z.infer<typeof LoginInputSchema> = {
  birthCountry: String(),
  email: String(),
  password: String(),
};

// FP === ForgotPassword
export const FPStepOneInputSchema = z
  .object({
    phoneOrEmail: z
      .string()
      .min(1, { message: "Por favor ingresa teléfono o email" }),
  })
  .superRefine(({ phoneOrEmail }, ctx) => {
    const isEmail = isNaN(Number(phoneOrEmail));
    const isPhone = !isEmail;

    const emailSchema = z
      .string()
      .min(1, { message: "Por favor ingresa email" })
      .email({ message: "Por favor ingrese email válido" });

    if (isEmail) {
      if (!emailSchema.safeParse(phoneOrEmail).success) {
        ctx.addIssue({
          code: "custom",
          message: "Ingrese un email válido",
          path: ["phoneOrEmail"],
        });
      }
    }

    if (isPhone) {
      const phone = phoneOrEmail.startsWith("+")
        ? phoneOrEmail
        : `+57${phoneOrEmail}`;

      if (!isValidPhoneNumber(phone)) {
        ctx.addIssue({
          code: "custom",
          message: "Ingrese un teléfono válido",
          path: ["phoneOrEmail"],
        });
      }
    }
  });

export const FPStepOneInputValues: z.infer<typeof FPStepOneInputSchema> = {
  phoneOrEmail: String(),
};

export const FPStepTwoInputSchema = z.object({
  confirmationCode: z
    .string()
    .min(1, { message: "Por favor ingresa el código" }),
});

export const FPStepTwoInputValues: z.infer<typeof FPStepTwoInputSchema> = {
  confirmationCode: String(),
};

export const FPStepThreeInputSchema = z
  .object({
    newPassword: z.string().min(1, { message: "Por favor ingresa contraseña" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Por favor ingresa contraseña" }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

export const FPStepThreeInputValues: z.infer<typeof FPStepThreeInputSchema> = {
  newPassword: String(),
  confirmPassword: String(),
};
