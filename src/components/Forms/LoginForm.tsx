import { Image } from "expo-image";

import { Text, View, Separator, Label, Input, Button } from "tamagui";

import { useForm } from "react-hook-form";

import { TouchableOpacity } from "react-native-gesture-handler";

import { styles } from "src/styles/LoginStyles";

import { LoginSchema, LoginValues } from "src/schemas/LoginSchema";

import SelectInputBase from "src/components/Inputs/SelectBase";
import DateTimeInputBase from "src/components/Inputs/DateTimePickerBase";
import TextInputBase from "src/components/Inputs/TextInputBase";
import PhoneInputBase from "src/components/Inputs/PhoneInputBase";

import { useUserStore } from "src/store/userStore";

export default function LoginForm() {
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: LoginValues,
    resolver: LoginSchema,
    mode: "all",
  });

  const userStore = useUserStore();

  const onSubmit = handleSubmit((data) => {
    userStore.login(data);
  });

  return (
    <View>
      <SelectInputBase
        inputId="country"
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
          Ingresar
        </Text>
      </Button>

      <View
        style={{
          marginTop: 64,
          alignItems: "center",
          gap: 32,
        }}
      >
        <TouchableOpacity>
          <Text style={styles.button_text__dark}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button_text__dark}>Regístrate</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button_text__dark}>Ingresa como invitado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
