import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { isValidPhoneNumber } from "libphonenumber-js";
import dayjs from "src/utils/dayjs";

export const SignupSchema = zodResolver(
  z
    .object({
      nickname: z.string().min(1, { message: "Por favor ingresa nickname" }),
      email: z
        .string()
        .min(1, { message: "Por favor ingresa email" })
        .email({ message: "Por favor ingrese email válido" }),
      password: z.string().min(1, { message: "Por favor ingresa contraseña" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Por favor ingresa contraseña" }),
      name: z.string().min(1, { message: "Por favor ingresa nombre" }),
      lastName: z.string().min(1, { message: "Por favor ingresa apellido" }),
      gender: z.string().min(1, { message: "Por favor seleccione genero" }),
      dateOfBirth: z
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
      country: z.string().min(1, { message: "Por favor seleccione país" }),
      state: z.string().min(1, { message: "Por favor seleccione estado" }),
      city: z.string().min(1, { message: "Por favor seleccione ciudad" }),
      // zipCode: z.string().min(1, { message: "Por favor seleccione código postal" }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Las contraseñas no coinciden",
          path: ["confirmPassword"],
        });
      }
    })
);

export const SignupValues = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastName: "",
  gender: "",
  dateOfBirth: undefined,
  phone: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
};
