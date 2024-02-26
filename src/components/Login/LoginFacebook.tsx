import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { LoginManager, AccessToken, Settings } from "react-native-fbsdk-next";
import { env } from "src/utils/env";

Settings.setAppID(env.EXPO_PUBLIC_FACEBOOK_APP_ID);
Settings.setClientToken(env.EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN);

const LoginFacebook = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();

  const navigateToHomeAsGuest = () => router.push("/(tabs)/home/");

  const handleLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw {
          message: "Usuario ha cancelado el proceso de ingreso",
        };
      }

      // Once signed in, get the users AccessToken
      const token = await AccessToken.getCurrentAccessToken();

      if (!token) {
        throw {
          message: "Ha ocurrido un error obteniendo los datos",
        };
      }

      // const res = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
    } catch (error: any) {
      if (error.message) {
        return Alert.alert("Error", error.message);
      }
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
    }
  };

  return React.cloneElement(children, {
    onPress: handleLoginFacebook,
  });
};

export default LoginFacebook;
