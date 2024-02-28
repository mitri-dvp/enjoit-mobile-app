import React from "react";
import { Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Icon from "@expo/vector-icons/EvilIcons";

import { Button, Spinner } from "tamagui";
import { Text } from "tamagui";

import { useMutation } from "@tanstack/react-query";
import { LoginManager, AccessToken, Settings } from "react-native-fbsdk-next";

import { env } from "src/utils/env";
import { darken } from "src/utils/color";
import { loginSocial } from "src/services/auth";
import { SocialModelType } from "src/models/zod/auth";
import { Provider } from "src/models/zod/enums";

Settings.setAppID(env.EXPO_PUBLIC_FACEBOOK_APP_ID);
Settings.setClientToken(env.EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN);

const LoginFacebook = () => {
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

      mutate({
        accessToken: token.accessToken,
        provider: Provider.FACEBOOK,
      });
    } catch (error: any) {
      if (error.message) {
        return Alert.alert("Error", error.message);
      }
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
    }
  };

  return (
    <Button
      {...styles.facebook_button}
      pressStyle={styles.facebook_button__press}
      onPress={handleLoginFacebook}
      disabled={isPending}
    >
      <Icon
        name="sc-facebook"
        size={36}
        style={styles.button_icon}
        color={"#FFFFFF"}
      />
      {isPending ? (
        <Spinner size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.button_text}>Ingresar con Facebook</Text>
      )}
    </Button>
  );
};

export default LoginFacebook;

const styles = StyleSheet.create({
  facebook_button: {
    backgroundColor: "#3C5B9A",
    borderColor: "#3C5B9A",
    borderRadius: 9999,
  },
  facebook_button__press: {
    backgroundColor: darken("#3C5B9A"),
    borderColor: darken("#3C5B9A"),
  },
  button_icon: {
    width: 36,
    height: 36,
    position: "absolute",
    left: 12,
  },
  button_text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#FFFFFF",
  },
});
