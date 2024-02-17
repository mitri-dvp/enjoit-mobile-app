import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, View, Button, Spinner } from "tamagui";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { LoginInputSchema, LoginInputValues } from "src/schemas/auth";
import { LoginModelType } from "src/models/zod/auth";

import SelectInputBase from "src/components/Inputs/SelectBase";
import TextInputBase from "src/components/Inputs/TextInputBase";

import { loginUser } from "src/services/auth";
import { ErrorResponseHandler } from "src/utils/exception";

import { styles } from "src/styles/LoginStyles";

export default function LoginForm() {
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
    <View>
      <SelectInputBase
        inputId="birthCountry"
        labelText="País de origen"
        placeholder="Selecciona país"
        headerText="Selecciona el país donde te encuentras."
        control={control}
        items={[
          {
            name: "Colombia",
            value: "colombia",
            icon: (
              <Image
                source={require("src/assets/images/flags/colombia.png")}
                contentFit="contain"
                style={{ width: 32, height: 32, marginRight: 16 }}
              />
            ),
          },
          {
            name: "España",
            value: "españa",
            icon: (
              <Image
                source={require("src/assets/images/flags/spain.png")}
                contentFit="contain"
                style={{ width: 32, height: 32, marginRight: 16 }}
              />
            ),
          },
          {
            name: "United States",
            value: "united-states",
            icon: (
              <Image
                source={require("src/assets/images/flags/united-states.png")}
                contentFit="contain"
                style={{ width: 32, height: 32, marginRight: 16 }}
              />
            ),
          },
        ]}
      />

      <TextInputBase
        labelText={"Email"}
        inputId="email"
        placeholder={"Ingresa email"}
        control={control}
        inputKeyboardType="email-address"
      />

      <TextInputBase
        labelText={"Contraseña"}
        inputId="password"
        placeholder={"Ingresa contraseña"}
        control={control}
        secureText
      />

      {formState.errors.root?.server && (
        <Text style={[styles.text, styles.text__error, { marginTop: 16 }]}>
          {formState.errors.root.server.message}
        </Text>
      )}

      <Button
        {...styles.submit_button}
        pressStyle={styles.submit_button__press}
        style={[!formState.isValid && styles.submit_button__disabled]}
        onPress={() => onSubmit()}
        disabled={isPending}
      >
        {isPending ? (
          <Spinner size="small" color="#BCBCBC" />
        ) : (
          <Text
            style={[
              styles.button_text,
              !formState.isValid && styles.button_text__disabled,
            ]}
          >
            Ingresar
          </Text>
        )}
      </Button>
    </View>
  );
}
