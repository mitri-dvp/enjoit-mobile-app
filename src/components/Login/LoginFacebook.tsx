import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const LoginFacebook = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();

  const navigateToHomeAsGuest = () => router.push("/(tabs)/home/");

  const handleLoginFacebook = async () => {
    try {
      Alert.alert("Facebook Login WIP");
    } catch (error) {
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
    }
  };

  return React.cloneElement(children, {
    onPress: handleLoginFacebook,
  });
};

export default LoginFacebook;
