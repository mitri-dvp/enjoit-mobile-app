import { useRouter } from "expo-router";
import { YStack } from "tamagui";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { LoginInputSchema, LoginInputValues } from "src/schemas/auth";
import { LoginModelType } from "src/models/zod/auth";

import { loginUser } from "src/services/auth";
import { ErrorResponseHandler } from "src/utils/exception";

import SearchBarBase from "../Inputs/SearchBarBase";

export default function SearchBar() {
  const router = useRouter();

  const navigateToLogin = () => router.push("/login");
  const navigateToHome = () => router.push("/home/");

  // Form Handler
  const { control, handleSubmit, formState, setError } = useForm({
    defaultValues: LoginInputValues,
    resolver: zodResolver(LoginInputSchema),
    mode: "all",
  });

  // Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: LoginModelType) => loginUser(payload),
    onSuccess: () => navigateToHome(),
    onError: (err: any) => {
      const error = ErrorResponseHandler(err);

      if (error.errors.length) {
        for (let i = 0; i < error.errors.length; i++) {
          const { path, code } = error.errors[i];

          if (path[0] === "email") {
            if (code === "unique_constraint") {
              setError("root.server", {
                message: "Email ya ha sido registrado",
              });
            }
          }

          if (code === "invalid_credentials") {
            setError("root.server", {
              message: "Credenciales inválidas",
            });
          }
        }
      }

      if (!error.errors.length) {
        setError("root.server", {
          message: "Algo ocurrio mal",
        });
      }
    },
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <YStack marginTop={16}>
      <SearchBarBase
        inputId="query"
        placeholder={"Búsqueda"}
        control={control}
      />
    </YStack>
  );
}
