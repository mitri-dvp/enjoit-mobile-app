import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { env } from "src/utils/env";

// Google Console Web Client ID
// https://www.youtube.com/watch?v=vojHmGUGUGc
GoogleSignin.configure({
  webClientId: env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const LoginGoogle = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();

  const navigateToHomeAsGuest = () => router.push("/(tabs)/home/");

  const handleLoginGoogle = async () => {
    try {
      // Ensure the user is prompted.
      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo });
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
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
      console.error(error);
    }
  };

  return React.cloneElement(children, {
    onPress: handleLoginGoogle,
  });
};

export default LoginGoogle;
