import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

import { loginAsGuest } from "src/services/auth";

const LoginAsGuest = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();

  const navigateToHomeAsGuest = () => router.push("/(tabs)/home/");

  const handleLoginAsGuest = async () => {
    try {
      await loginAsGuest();
      navigateToHomeAsGuest();
    } catch (error) {
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
    }
  };

  return React.cloneElement(children, {
    onPress: handleLoginAsGuest,
  });
};

export default LoginAsGuest;
