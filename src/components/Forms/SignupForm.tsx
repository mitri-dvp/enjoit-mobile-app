import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Separator, Button, Spinner } from "tamagui";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { parsePhoneNumber } from "libphonenumber-js";

import { SignupInputSchema, SignupInputValues } from "src/schemas/auth";
import { SignupModelType } from "src/models/zod/auth";

import SelectInputBase from "src/components/Inputs/SelectBase";
import DateTimeInputBase from "src/components/Inputs/DateTimePickerBase";
import TextInputBase from "src/components/Inputs/TextInputBase";
import PhoneInputBase from "src/components/Inputs/PhoneInputBase";

import { signupUser } from "src/services/auth";
import { ErrorResponseHandler } from "src/utils/exception";

import { styles } from "src/styles/SignupStyles";

export default function SignupForm() {
  const router = useRouter();

  const navigateToLogin = () => router.push("/login");
  const navigateToHome = () => router.push("/home/");

  // Form Handler
  const { control, handleSubmit, formState, setError } = useForm({
    defaultValues: SignupInputValues,
    resolver: zodResolver(SignupInputSchema),
    mode: "all",
  });

  // Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignupModelType) => signupUser(payload),
    onSuccess: () => navigateToHome(),
    onError: (err: any) => {
      const error = ErrorResponseHandler(err);

      if (error.errors.length) {
        for (let i = 0; i < error.errors.length; i++) {
          const { path, code } = error.errors[i];

          if (path[0] === "email") {
            if (code === "unique_constraint") {
              setError("root.server", {
                message: "Email ya ha sido registrado",
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

  // Form On Submit
  const onSubmit = handleSubmit((data) => {
    const { countryCallingCode, nationalNumber } = parsePhoneNumber(
      data.phone,
      "CO"
    );

    const { confirmPassword, ...rest } = data;
    const payload: SignupModelType = {
      ...rest,
      phone: nationalNumber,
      phonePrefix: countryCallingCode,
      birthPostalCode:
        data.birthPostalCode === null ? null : Number(data.birthPostalCode),
    };

    mutate(payload);
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
        inputId="nickName"
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
        inputId="firstName"
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
        inputId="birthDate"
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
        inputId="birthCountry"
        labelText="País de origen"
        placeholder="Selecciona país"
        control={control}
        items={[{ name: "Colombia", value: "colombia" }]}
      />

      <SelectInputBase
        inputId="birthState"
        labelText="Estado"
        placeholder="Selecciona estado"
        control={control}
        items={[{ name: "Atlantico", value: "atlantico" }]}
      />

      <SelectInputBase
        inputId="birthCity"
        labelText="Ciudad"
        placeholder="Selecciona ciudad"
        control={control}
        items={[{ name: "Barranquilla", value: "barranquilla" }]}
      />

      <TextInputBase
        inputId="birthPostalCode"
        labelText={"Código Postal (opcional)"}
        placeholder={"Ingresa código postal "}
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
            Registrarme
          </Text>
        )}
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
