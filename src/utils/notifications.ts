import { Alert, Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const allowedNotificationsAsync = async () => {
  if (!Device.isDevice) {
    Alert.alert(
      "Error: Emulador Detectado",
      "Lo sentimos, las notificaciones solo son compatibles con dispositivos reales",
      [{ text: "Ok" }]
    );
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Permisos insuficientes",
      "Lo sentimos, necesitamos permisos de notificaciones para continuar",
      [{ text: "Ok" }]
    );
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return true;
};

export const registerForPushNotificationsAsync = async () => {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permisos insuficientes",
      "Lo sentimos, necesitamos permisos de notificaciones para continuar",
      [{ text: "Ok" }]
    );
    return;
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    })
  ).data;

  return token;
};

export const sendNotificationsAsync = async (
  title?: string,
  body?: string,
  trigger?: Notifications.NotificationTriggerInput
) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: trigger || null,
  });
};
