import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, Button, Spinner } from "tamagui";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumber } from "libphonenumber-js";

import TextInputBase from "src/components/Inputs/TextInputBase";

import { useInterval } from "usehooks-ts";
import { useMutation, useQuery } from "@tanstack/react-query";

import { FPStepTwoInputSchema, FPStepTwoInputValues } from "src/schemas/auth";
import { FPIdentifierType, FPStepType } from "src/models/zod/auth";

import { ErrorResponseHandler } from "src/utils/exception";
import {
  getFPConfirmationCode,
  validateFPConfirmationCode,
} from "src/services/auth";

import { styles } from "src/styles/ForgotPasswordStyles";
import { Alert } from "react-native";

export default function StepTwoForm({
  setStep,
  setConfirmationCode,
  identifier,
}: {
  setStep: (step: FPStepType) => void;
  setConfirmationCode: (confirmationCode: string) => void;
  identifier: FPIdentifierType;
}) {
  const delay = 1000;
  const [count, setCount] = useState<number>(30);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  useInterval(
    () => {
      setCount(count - 1);
      if (count - 1 < 0) {
        setIsCounting(false);
        setCount(30);
      }
    },
    // Delay in milliseconds or null to stop it
    isCounting ? delay : null
  );

  const router = useRouter();

  const navigateToHome = () => router.push("/home/");

  // Form Handler
  const { control, handleSubmit, formState, setValue, setError, getValues } =
    useForm({
      defaultValues: FPStepTwoInputValues,
      resolver: zodResolver(FPStepTwoInputSchema),
      mode: "all",
    });

  // Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (confirmationCode: string) => {
      setValue("confirmationCode", confirmationCode);
      return validateFPConfirmationCode({ identifier, confirmationCode });
    },
    onSuccess: () => {
      setStep("step-3");
      setConfirmationCode(getValues("confirmationCode"));
    },
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

  const fetchConfirmationCode = async () => {
    const { confirmationCode } = await getFPConfirmationCode(identifier);

    // Update Form
    setValue("confirmationCode", confirmationCode);
  };

  useEffect(() => {
    fetchConfirmationCode();
  }, []);

  const onSubmit = handleSubmit((data) => mutate(data.confirmationCode));

  const handleRequestCode = async () => {
    await fetchConfirmationCode();
    setIsCounting(true);
  };

  const renderTitle = () => {
    const censorString = (value: string) => {
      let censoredString = "";
      for (let i = 0; i < value.length; i++) {
        if (i >= 2 && i < value.length - 2) {
          censoredString += "*";
          continue;
        }
        censoredString += value.charAt(i);
      }
      return censoredString;
    };

    if (identifier.type === "phone") {
      const { countryCallingCode, nationalNumber } = parsePhoneNumber(
        identifier.value,
        "CO"
      );
      return `Hemos enviado un código al número +${countryCallingCode} ${censorString(
        nationalNumber
      )}`;
    }

    if (identifier.type === "email") {
      const parsedEmail = identifier.value.split("@");
      return `Hemos enviado un código al correo ${censorString(
        parsedEmail[0]
      )}@${parsedEmail[1]}`;
    }
  };

  return (
    <View>
      <Text style={styles.title}>Código enviado</Text>

      <Text style={styles.subtitle}>{renderTitle()}</Text>

      <TextInputBase
        inputId="confirmationCode"
        labelText="Ingresa el código"
        placeholder={"Ingresa el código"}
        control={control}
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
            Ok
          </Text>
        )}
      </Button>
      <Button
        {...styles.submit_button}
        pressStyle={styles.submit_button__press}
        style={[isCounting && styles.submit_button__disabled]}
        disabled={isCounting}
        onPress={handleRequestCode}
      >
        <Text
          style={[
            styles.button_text,
            isCounting && styles.button_text__disabled,
          ]}
        >
          Solicitar código {isCounting && `(${count}s)`}
        </Text>
      </Button>
    </View>
  );
}
