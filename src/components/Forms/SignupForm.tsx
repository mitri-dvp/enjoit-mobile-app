import { Image } from "expo-image";

import { Text, View, Separator, Label, Input, Button } from "tamagui";

import { useForm } from "react-hook-form";

import { TouchableOpacity } from "react-native-gesture-handler";

import { styles } from "src/styles/SignupStyles";

import { SignupSchema, SignupValues } from "src/schemas/SignupSchema";

import SelectInputBase from "src/components/Inputs/SelectBase";
import DateTimeInputBase from "src/components/Inputs/DateTimePickerBase";
import TextInputBase from "src/components/Inputs/TextInputBase";
import PhoneInputBase from "src/components/Inputs/PhoneInputBase";

import { useUserStore } from "src/store/userStore";
import { useRouter } from "expo-router";

export default function SignupForm() {
  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: SignupValues,
    resolver: SignupSchema,
    mode: "all",
  });

  const router = useRouter();
  const userStore = useUserStore();

  const navigateToLogin = () => router.replace("/login");

  const onSubmit = handleSubmit((data) => {
    userStore.signup(data);
  });

  return (
    <View>
      <View>
        <View style={styles.separator_container}>
          <Image
            source={require("src/assets/svg/user.svg")}
            contentFit="contain"
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.text}>Cuenta</Text>
        </View>
        <Separator style={{ borderColor: "#D8D8D8" }} />
      </View>

      <TextInputBase
        labelText={"Nickname"}
        inputId="nickname"
        placeholder={"Ingresa nickname"}
        control={control}
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

      <TextInputBase
        labelText={"Confirmar contraseña"}
        inputId="confirmPassword"
        placeholder={"Confirma contraseña"}
        control={control}
        secureText
      />

      <View>
        <View style={styles.separator_container}>
          <Image
            source={require("src/assets/svg/doc.svg")}
            contentFit="contain"
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.text}>Información personal</Text>
        </View>
        <Separator style={{ borderColor: "#D8D8D8" }} />
      </View>

      <TextInputBase
        labelText={"Nombre"}
        inputId="name"
        placeholder={"Ingresa nombre"}
        control={control}
      />

      <TextInputBase
        labelText={"Apellido"}
        inputId="lastName"
        placeholder={"Ingresa apellido"}
        control={control}
      />

      <SelectInputBase
        inputId="gender"
        labelText="Genero"
        placeholder="Selecciona genero"
        control={control}
        items={[
          { name: "Masculino", value: "male" },
          { name: "Femenino", value: "female" },
          { name: "Prefiero no decirlo", value: "n/a" },
        ]}
      />

      <DateTimeInputBase
        inputId="dateOfBirth"
        labelText="Fecha de nacimiento"
        placeholder="Seleccionar fecha"
        control={control}
        type="date"
      />

      <PhoneInputBase
        inputId="phone"
        labelText="Teléfono"
        control={control}
        placeholder="Ingresa teléfono"
      />

      <View>
        <View style={styles.separator_container}>
          <Image
            source={require("src/assets/svg/globe.svg")}
            contentFit="contain"
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.text}>Origen</Text>
        </View>
        <Separator style={{ borderColor: "#D8D8D8" }} />
      </View>

      <SelectInputBase
        inputId="country"
        labelText="País de origen"
        placeholder="Selecciona país"
        control={control}
        items={[{ name: "Colombia", value: "colombia" }]}
      />

      <SelectInputBase
        inputId="state"
        labelText="Estado"
        placeholder="Selecciona estado"
        control={control}
        items={[{ name: "Atlantico", value: "atlantico" }]}
      />

      <SelectInputBase
        inputId="city"
        labelText="Ciudad"
        placeholder="Selecciona ciudad"
        control={control}
        items={[{ name: "Barranquilla", value: "barranquilla" }]}
      />

      <TextInputBase
        inputId="zipCode"
        labelText={"Código Postal (opcional)"}
        placeholder={"Ingresa código postal "}
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
          Registrarme
        </Text>
      </Button>

      <View
        style={{
          marginTop: 32,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.button_text__dark}>¿Ya tienes una cuenta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
