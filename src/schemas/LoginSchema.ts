import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "src/store/userStore";

export const LoginSchema = zodResolver(
  z.object({
    country: z.string().min(1, { message: "Por favor seleccione país" }),
    email: z
      .string()
      .min(1, { message: "Por favor ingresa email" })
      .email({ message: "Por favor ingrese email válido" }),
    password: z.string().min(1, { message: "Por favor ingresa contraseña" }),
  })
);

type LoginValuesType = {
  country: string;
  email: string;
  password: string;
};

export const LoginValues: LoginValuesType = {
  country: "",
  email: useUserStore.getState().email,
  password: "",
};
