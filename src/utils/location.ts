import { Alert, Platform } from "react-native";
import * as Location from "expo-location";

export const allowedLocationAsync = async () => {
  const { status: locationStatus } =
    await Location.requestForegroundPermissionsAsync();

  if (locationStatus !== "granted") {
    Alert.alert(
      "Permisos insuficientes",
      "Lo sentimos, necesitamos permisos de ubicación para continuar",
      [{ text: "Ok" }]
    );
    return false;
  }

  return true;
};
