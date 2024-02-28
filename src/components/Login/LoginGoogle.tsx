import React from "react";
import { Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

import { useMutation } from "@tanstack/react-query";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Button, Spinner, Text } from "tamagui";

import { env } from "src/utils/env";
import { loginSocial } from "src/services/auth";
import { SocialModelType } from "src/models/zod/auth";
import { Provider } from "src/models/zod/enums";
import { darken } from "src/utils/color";

// Google Console Web Client ID
// https://www.youtube.com/watch?v=vojHmGUGUGc
GoogleSignin.configure({
  webClientId: env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const LoginGoogle = () => {
  const router = useRouter();

  const navigateToHome = () => router.push("/(tabs)/home/");

  // Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SocialModelType) => loginSocial(payload),
    onSuccess: () => navigateToHome(),
    onError: (err: any) => {
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
      console.error(err);
    },
  });

  const handleLoginGoogle = async () => {
    try {
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices();

      const info = await GoogleSignin.signIn();

      if (!info.idToken) throw { code: "missing_token" };

      mutate({
        accessToken: info.idToken,
        provider: Provider.GOOGLE,
      });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return Alert.alert(
          "Error",
          "Usuario ha cancelado el proceso de ingreso"
        );
      }
      if (error.code === statusCodes.IN_PROGRESS) {
        return Alert.alert("Error", "El proceso de ingreso esta en progeso");
      }
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return Alert.alert(
          "Error",
          "Play services no estan disponibles o desactualiazdos"
        );
      }
      if (error.code === "missing_token") {
        return Alert.alert("Error", "Error al obtener token, intente otra vez");
      }
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
      console.error(error);
    }
  };

  return (
    <Button
      {...styles.google_button}
      pressStyle={styles.google_button__press}
      onPress={handleLoginGoogle}
      disabled={isPending}
    >
      <Image
        source={require("src/assets/svg/google.svg")}
        contentFit="contain"
        style={styles.button_image}
      />
      {isPending ? (
        <Spinner size="small" color="#D30101" />
      ) : (
        <Text style={styles.button_text}>Ingresar con Google</Text>
      )}
    </Button>
  );
};

export default LoginGoogle;

const styles = StyleSheet.create({
  google_button: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderRadius: 9999,
  },
  google_button__press: {
    backgroundColor: darken("#FFFFFF"),
    borderColor: darken("#FFFFFF"),
  },
  button_icon: {
    width: 36,
    height: 36,
    position: "absolute",
    left: 12,
  },
  button_image: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 20,
  },
  button_text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#D30101",
  },
});
