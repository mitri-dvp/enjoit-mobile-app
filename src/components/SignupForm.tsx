import { useState } from "react";

import { Alert, StyleSheet, TextInput } from "react-native";

import { Image } from "expo-image";

import { Text, View, Separator, Label, Input, Button } from "tamagui";

import SelectBase from "src/components/Inputs/SelectBase";
import DateTimePickerBase from "src/components/Inputs/DateTimePickerBase";

import { z } from "zod";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextInputBase from "./Inputs/TextInputBase";

const SignupSchema = toFormikValidationSchema(
  z
    .object({
      nickname: z.string({ required_error: "Por favor ingresa nickname" }),
      email: z.string({ required_error: "Por favor ingresa email" }),
      password: z.string({ required_error: "Por favor ingresa contraseña" }),
      confirmPassword: z.string({
        required_error: "Por favor ingresa contraseña",
      }),
      name: z.string({ required_error: "Por favor ingresa nombre" }),
      lastName: z.string({ required_error: "Por favor ingresa apellido" }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      console.log(confirmPassword);
      console.log(password);
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Las contraseñas no coinciden",
          path: ["confirmPassword"],
        });
      }
    })
);

const initialValues = {
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastName: "",
};

export default function SignupForm() {
  return (
    <Formik
      validationSchema={SignupSchema}
      validateOnChange={false}
      initialValues={initialValues}
      onSubmit={(values) => Alert.alert(JSON.stringify(values, null, 2))}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
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
            onChangeText={handleChange("nickname")}
            onBlur={handleBlur("nickname")}
            value={values.nickname}
            error={touched.nickname ? errors.nickname : ""}
          />

          <TextInputBase
            labelText={"Email"}
            inputId={"email"}
            inputPlaceholder={"Ingresa email"}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            error={touched.email ? errors.email : ""}
          />

          <TextInputBase
            labelText={"Contraseña"}
            inputId={"password"}
            inputPlaceholder={"Ingresa contraseña"}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            error={touched.password ? errors.password : ""}
            secureText
          />

          <TextInputBase
            labelText={"Confirma contraseña"}
            inputId={"confirmPassword"}
            inputPlaceholder={"Ingresa contraseña"}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            error={touched.confirmPassword ? errors.confirmPassword : ""}
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
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            error={touched.name ? errors.name : ""}
          />

          <TextInputBase
            labelText={"Apellido"}
            inputId={"lastName"}
            inputPlaceholder={"Ingresa apellido"}
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
            error={touched.lastName ? errors.lastName : ""}
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

          <Button onPress={() => handleSubmit()} />
        </>
      )}
    </Formik>
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
