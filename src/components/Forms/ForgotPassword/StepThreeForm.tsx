import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, Button, Spinner, YStack } from "tamagui";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumber } from "libphonenumber-js";

import TextInputBase from "src/components/Inputs/TextInputBase";

import { useInterval } from "usehooks-ts";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  FPStepThreeInputSchema,
  FPStepThreeInputValues,
} from "src/schemas/auth";
import { FPIdentifierType, FPStepType } from "src/models/zod/auth";

import { ErrorResponseHandler } from "src/utils/exception";
import { changePassword } from "src/services/auth";

import { styles } from "src/styles/shared";
import { Alert } from "react-native";

export default function StepThreeForm({
  identifier,
  confirmationCode,
  onSuccess,
}: {
  identifier: FPIdentifierType;
  confirmationCode: string;
  onSuccess: () => void;
}) {
  // Form Handler
  const { control, handleSubmit, formState, setValue, setError } = useForm({
    defaultValues: FPStepThreeInputValues,
    resolver: zodResolver(FPStepThreeInputSchema),
    mode: "all",
  });

  // Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (newPassword: string) =>
      changePassword({ identifier, confirmationCode, newPassword }),
    onSuccess: () => onSuccess(),
    onError: (err: any) => {
      const error = ErrorResponseHandler(err);

      Alert.alert("ERROR", JSON.stringify(error, null, 2));

      if (error.errors.length) {
        for (let i = 0; i < error.errors.length; i++) {
          const { path, code } = error.errors[i];

          if (code === "not_found") {
            if (path[0] === "identifier") {
              setError("root.server", {
                message: "Codigo inválido",
              });
            }
          }

          if (code === "invalid_string") {
            if (path[0] === "reset_password_token") {
              setError("root.server", {
                message: "Codigo inválido",
              });
            }

            if (path[0] === "confirmation_code") {
              setError("root.server", {
                message: "Codigo inválido",
              });
            }
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

  const onSubmit = handleSubmit((data) => mutate(data.newPassword));

  return (
    <View>
      <YStack marginTop={48} />

      <YStack marginVertical={20}>
        <TextInputBase
          inputId="newPassword"
          labelText="Ingresa nueva contraseña"
          placeholder={"Nueva contraseña"}
          control={control}
        />

        <TextInputBase
          inputId="confirmPassword"
          labelText="Confirmar nueva contraseña"
          placeholder={"Confirmar contraseña"}
          control={control}
        />

        {formState.errors.root?.server && (
          <Text style={[styles.text, styles.text__error, { marginTop: 16 }]}>
            {formState.errors.root.server.message}
          </Text>
        )}
      </YStack>

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
            Ok
          </Text>
        )}
      </Button>
    </View>
  );
}
