import { StyleSheet } from "react-native";

import { Image } from "expo-image";

import { Text, View, Separator, Label, Input, Button } from "tamagui";

import SelectInputBase from "src/components/Inputs/SelectBase";
import DateTimeInputBase from "src/components/Inputs/DateTimePickerBase";
import TextInputBase from "src/components/Inputs/TextInputBase";
import PhoneInputBase from "src/components/Inputs/PhoneInputBase";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";

import dayjs from "src/utils/dayjs";
import { darken } from "src/utils/color";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignupSchema = z
  .object({
    nickname: z.string().min(1, { message: "Por favor ingresa nickname" }),
    email: z
      .string()
      .min(1, { message: "Por favor ingresa email" })
      .email({ message: "Por favor ingrese email válido" }),
    password: z.string().min(1, { message: "Por favor ingresa contraseña" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Por favor ingresa contraseña" }),
    name: z.string().min(1, { message: "Por favor ingresa nombre" }),
    lastName: z.string().min(1, { message: "Por favor ingresa apellido" }),
    gender: z.string().min(1, { message: "Por favor seleccione genero" }),
    dateOfBirth: z
      .date({
        errorMap: (issue, ctx) => {
          return { message: "Ingrese una fecha válida" };
        },
      })
      .min(dayjs().subtract(85, "years").toDate(), {
        message: "Muy mayor para registrarse",
      })
      .max(dayjs().subtract(3, "years").toDate(), {
        message: "Muy jóven para registrarse",
      }),
    phone: z.string().refine((value) => isValidPhoneNumber(value), {
      message: "Ingrese un teléfono válido",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

const defaultValues = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastName: "",
  gender: "",
  dateOfBirth: undefined,
  phone: "",
};

export default function SignupForm() {
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(SignupSchema),
    mode: "all",
  });

  const onSubmit = handleSubmit((data) => console.log(data));

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
        inputId={"nickname"}
        placeholder={"Ingresa nickname"}
        control={control}
      />

      <TextInputBase
        labelText={"Email"}
        inputId={"email"}
        placeholder={"Ingresa email"}
        control={control}
        inputKeyboardType="email-address"
      />

      <TextInputBase
        labelText={"Contraseña"}
        inputId={"password"}
        placeholder={"Ingresa contraseña"}
        control={control}
        secureText
      />

      <TextInputBase
        labelText={"Confirmar contraseña"}
        inputId={"confirmPassword"}
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
        inputId={"name"}
        placeholder={"Ingresa nombre"}
        control={control}
      />

      <TextInputBase
        labelText={"Apellido"}
        inputId={"lastName"}
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

      <Button
        {...styles.submit_button}
        pressStyle={styles.submit_button__press}
        onPress={() => onSubmit()}
      >
        <Text style={styles.button_text}>Registrarme</Text>
      </Button>

      <View
        style={{
          marginTop: 32,
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Text style={styles.button_text__dark}>¿Ya tienes una cuenta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#666666",
  },

  label: {
    marginVertical: 8,
  },

  input: {
    borderColor: "#8B8B8B",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },

  separator_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 20,
  },

  submit_button: {
    backgroundColor: "#D30101",
    borderColor: "#D30101",
    borderRadius: 9999,
    alignSelf: "center",
    paddingHorizontal: 32,
    marginTop: 32,
  },
  submit_button__press: {
    backgroundColor: darken("#D30101"),
    borderColor: darken("#D30101"),
  },
  button_text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#FFFFFF",
  },
  button_text__dark: {
    fontFamily: "RedHatText-SemiBold",
    color: "#D30101",
  },
});
