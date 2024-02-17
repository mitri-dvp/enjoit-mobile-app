import { Text, View, Button } from "tamagui";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInputBase from "src/components/Inputs/TextInputBase";

import { FPStepOneInputSchema, FPStepOneInputValues } from "src/schemas/auth";

import { FPIdentifierType, FPStepType } from "src/models/zod/auth";

import { styles } from "src/styles/ForgotPasswordStyles";

export default function StepOneForm({
  setStep,
  setIdentifier,
}: {
  setStep: (step: FPStepType) => void;
  setIdentifier: (identifier: FPIdentifierType) => void;
}) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: FPStepOneInputValues,
    resolver: zodResolver(FPStepOneInputSchema),
    mode: "all",
  });

  const onSubmit = handleSubmit((data) => {
    const isEmail = isNaN(Number(data.phoneOrEmail));
    const isPhone = !isEmail;

    if (isEmail) {
      setIdentifier({
        value: data.phoneOrEmail,
        type: "email",
      });
    }

    if (isPhone) {
      const phone = data.phoneOrEmail.startsWith("+")
        ? data.phoneOrEmail
        : `+57${data.phoneOrEmail}`;

      setIdentifier({
        value: phone,
        type: "phone",
      });
    }

    setStep("step-2");
  });

  return (
    <View>
      <Text style={styles.title}>Recuperar contraseña</Text>

      <Text style={styles.subtitle}>
        Introduce tu telefono o tu cuenta de correo electronico con la cual te
        registraste.
      </Text>

      <TextInputBase
        inputId="phoneOrEmail"
        placeholder={"Ingresa teléfono o email"}
        control={control}
      />

      <Button
        {...styles.submit_button}
        pressStyle={styles.submit_button__press}
        style={[!formState.isValid && styles.submit_button__disabled]}
        onPress={() => onSubmit()}
      >
        <Text
          style={[
            styles.button_text,
            !formState.isValid && styles.button_text__disabled,
          ]}
        >
          Aceptar
        </Text>
      </Button>
    </View>
  );
}
