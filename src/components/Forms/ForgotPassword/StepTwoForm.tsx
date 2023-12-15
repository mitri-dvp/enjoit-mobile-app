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
import { parsePhoneNumber } from "libphonenumber-js";

export default function StepOneForm() {
  const forgotPasswordStore = useForgotPasswordStore();

  const {
    data: { phone, email },
  } = forgotPasswordStore;

  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: ForgotPasswordValues,
    resolver: ForgotPasswordSchema,
    mode: "all",
  });

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
    if (phone) {
      const { countryCallingCode, nationalNumber } = parsePhoneNumber(phone);
      return `Hemos enviado un código al número +${countryCallingCode} ${censorString(
        nationalNumber
      )}`;
    }

    if (email) {
      const parsedEmail = email.split("@");
      return `Hemos enviado un código al correo ${censorString(
        parsedEmail[0]
      )}@${parsedEmail[1]}`;
    }
  };

  const onSubmit = handleSubmit((data) => {
    // if (isNaN(Number(data.phoneOrEmail))) {
    //   forgotPasswordStore.updateEmail(data.phoneOrEmail);
    // } else {
    //   forgotPasswordStore.updatePhone(data.phoneOrEmail);
    // }
    // forgotPasswordStore.goToStep("step-3");
  });

  return (
    <View>
      <Text style={styles.title}>Código enviado</Text>

      <Text style={styles.subtitle}>{renderTitle()}</Text>

      <TextInputBase
        inputId="code"
        labelText="Ingresa el código"
        placeholder={"Ingresa el código"}
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
          Ok
        </Text>
      </Button>
      <Button
        {...styles.submit_button}
        pressStyle={styles.submit_button__press}
        style={[styles.submit_button__disabled]}
        // style={[!formState.isValid && styles.submit_button__disabled]}
        // onPress={() => onSubmit()}
      >
        <Text
          style={[
            styles.button_text,
            !formState.isValid && styles.button_text__disabled,
          ]}
        >
          Solicitar codigo
        </Text>
      </Button>
    </View>
  );
}
