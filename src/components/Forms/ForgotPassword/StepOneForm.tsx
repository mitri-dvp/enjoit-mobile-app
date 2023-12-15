import { Image } from "expo-image";

import { Text, View, Button } from "tamagui";

import { useForm } from "react-hook-form";

import { styles } from "src/styles/ForgotPasswordStyles";

import {
  ForgotPasswordSchema,
  ForgotPasswordValues,
} from "src/schemas/ForgotPasswordSchema";

import TextInputBase from "src/components/Inputs/TextInputBase";
import { useForgotPasswordStore } from "src/store/forgotPasswordStore";

export default function StepOneForm() {
  const forgotPasswordStore = useForgotPasswordStore();

  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: ForgotPasswordValues,
    resolver: ForgotPasswordSchema,
    mode: "all",
  });

  const onSubmit = handleSubmit((data) => {
    if (isNaN(Number(data.phoneOrEmail))) {
      forgotPasswordStore.updateEmail(data.phoneOrEmail);
    } else {
      forgotPasswordStore.updatePhone(data.phoneOrEmail);
    }

    forgotPasswordStore.goToStep("step-2");
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
