import { StyleSheet } from "react-native";

import { Image } from "expo-image";

import { Text, View, Separator, Label, Input } from "tamagui";

import SelectBase from "src/components/Inputs/SelectBase";
import DateTimePickerBase from "src/components/Inputs/DateTimePickerBase";
import TextInputBase from "src/components/Inputs/TextInputBase";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
};

export default function SignupForm() {
  const {
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
        inputPlaceholder={"Ingresa nickname"}
        control={control}
        error={errors.nickname?.message}
      />

      <TextInputBase
        labelText={"Email"}
        inputId={"email"}
        inputPlaceholder={"Ingresa email"}
        control={control}
        error={errors.email?.message}
        inputKeyboardType="email-address"
      />

      <TextInputBase
        labelText={"Contraseña"}
        inputId={"password"}
        inputPlaceholder={"Ingresa contraseña"}
        control={control}
        error={errors.password?.message}
        secureText
      />

      <TextInputBase
        labelText={"Confirmar contraseña"}
        inputId={"confirmPassword"}
        inputPlaceholder={"Confirma contraseña"}
        control={control}
        error={errors.confirmPassword?.message}
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
        inputPlaceholder={"Ingresa nombre"}
        control={control}
        error={errors.name?.message}
      />

      <TextInputBase
        labelText={"Apellido"}
        inputId={"lastName"}
        inputPlaceholder={"Ingresa apellido"}
        control={control}
        error={errors.lastName?.message}
      />

      <View>
        <Label {...styles.label} style={styles.text} htmlFor="name">
          Genero
        </Label>
        <SelectBase
          triggerStyle={styles.input}
          textStyle={styles.text}
          placeholder="Selecciona genero"
          items={[
            { name: "Masculino", value: "male" },
            { name: "Femenino", value: "female" },
            { name: "Prefiero no decirlo", value: "n/a" },
          ]}
        />
      </View>

      <View>
        <Label {...styles.label} style={styles.text} htmlFor="name">
          Fecha de nacimiento
        </Label>
        <DateTimePickerBase
          triggerStyle={styles.input}
          textStyle={styles.text}
          type="date"
          accentColor={"#D30101"}
          textColor={"#D30101"}
          placeholder="Seleccionar fecha"
        />
      </View>

      <View>
        <Label {...styles.label} style={styles.text} htmlFor="phone">
          Teléfono
        </Label>
        <Input
          {...styles.input}
          style={[styles.text]}
          id="phone"
          placeholder="Ingresa teléfono"
        />
      </View>

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

      {/* <Button onPress={() => handleSubmit()} /> */}
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
});
