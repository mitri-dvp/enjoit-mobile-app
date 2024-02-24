import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

const LoginGoogle = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();

  const navigateToHomeAsGuest = () => router.push("/(tabs)/home/");

  const handleLoginGoogle = async () => {
    try {
      Alert.alert("Google Login WIP");
    } catch (error) {
      Alert.alert("Error Inesperado", "Algo occurió mal, intente otra vez");
    }
  };

  return React.cloneElement(children, {
    onPress: handleLoginGoogle,
  });
};

export default LoginGoogle;
