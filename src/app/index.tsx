import { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from "@expo/vector-icons/EvilIcons";
import { useNavigation, useRouter } from "expo-router";
import { Image } from "expo-image";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import {
  Button,
  Checkbox,
  Label,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

import ScreenView from "src/components/ScreenView";
import SheetBase from "src/components/Sheets/SheetBase";
import TermsForm from "src/components/Forms/TermsForm";

import { darken, lighten } from "src/utils/color";
import {
  allowedNotificationsAsync,
  sendNotificationsAsync,
} from "src/utils/notifications";
import { allowedLocationAsync } from "src/utils/location";

import { useRootStore } from "src/store/root";

export default function Root() {
  const rootStore = useRootStore();
  const navigation = useNavigation();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const goToRoute = () => {
    router.push("/home/");
  };

  const navigateToSignup = () => router.push("/signup");
  const navigateToLogin = () => router.push("/login");
  const navigateToHomeAsGuest = () => router.push("/home/");

  const handleEmailPress = () => {
    if (rootStore.hasAccepted) return handleNavigateToSignup();
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);
    rootStore.accept();
    handleNavigateToSignup();
  };

  const handleNavigateToSignup = async () => {
    if (!(await allowedLocationAsync())) return;
    if (!(await allowedNotificationsAsync())) return;

    navigateToSignup();
  };

  return (
    <ImageBackground
      imageStyle={{ resizeMode: "cover" }}
      style={{ flex: 1 }}
      source={require("src/assets/images/enjoit/root-bg.jpg")}
    >
      <ScreenView screenStyle={styles.screen}>
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Image
              source={require("src/assets/images/enjoit/logo.png")}
              contentFit="contain"
              style={styles.logo}
            />
          </View>

          <YStack>
            <Text style={styles.title}>
              {`Ordena, recoge, reserva\nlo que sea.`}
            </Text>

            <YStack gap={12}>
              <Button
                {...styles.email_button}
                pressStyle={styles.email_button__press}
                onPress={handleEmailPress}
              >
                <Icon
                  name="envelope"
                  size={36}
                  style={styles.button_icon}
                  color={"#FFFFFF"}
                />
                <Text style={styles.button_text}>Ingresar con email</Text>
              </Button>
              <Button
                {...styles.facebook_button}
                pressStyle={styles.facebook_button__press}
              >
                <Icon
                  name="sc-facebook"
                  size={36}
                  style={styles.button_icon}
                  color={"#FFFFFF"}
                />
                <Text style={styles.button_text}>Ingresar con Facebook</Text>
              </Button>
              <Button
                {...styles.google_button}
                pressStyle={styles.google_button__press}
              >
                <Image
                  source={require("src/assets/svg/google.svg")}
                  contentFit="contain"
                  style={styles.button_image}
                />
                <Text style={styles.button_text_2}>Ingresar con Google</Text>
              </Button>
              <Button
                {...styles.apple_button}
                pressStyle={styles.apple_button__press}
              >
                <Image
                  source={require("src/assets/svg/apple.svg")}
                  contentFit="contain"
                  style={styles.button_image}
                />
                <Text style={styles.button_text}>Ingresar con Apple ID</Text>
              </Button>
            </YStack>

            <YStack gap={32} marginTop={48}>
              <TouchableOpacity onPress={navigateToHomeAsGuest}>
                <Text style={styles.touchable_text}>Ingresa como invitado</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.touchable_text}>Ya tengo cuenta</Text>
              </TouchableOpacity>
            </YStack>
          </YStack>
        </View>

        <SheetBase open={open} setOpen={setOpen}>
          <TermsForm onSubmit={handleSubmit} />
        </SheetBase>
      </ScreenView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },

  logo_container: {
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    width: 136,
    height: 52,
  },

  title: {
    marginTop: "35%",
    marginBottom: 16,
    fontSize: 60,
    fontFamily: "RedHatText-Bold",
    lineHeight: 54,
    paddingVertical: 12,
    color: "#FFFFFF",
  },

  email_button: {
    backgroundColor: "#D30101",
    borderColor: "#D30101",
    borderRadius: 9999,
  },
  email_button__press: {
    backgroundColor: darken("#D30101"),
    borderColor: darken("#D30101"),
  },
  facebook_button: {
    backgroundColor: "#3C5B9A",
    borderColor: "#3C5B9A",
    borderRadius: 9999,
  },
  facebook_button__press: {
    backgroundColor: darken("#3C5B9A"),
    borderColor: darken("#3C5B9A"),
  },
  google_button: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderRadius: 9999,
  },
  google_button__press: {
    backgroundColor: darken("#FFFFFF"),
    borderColor: darken("#FFFFFF"),
  },
  apple_button: {
    backgroundColor: "#000000",
    borderColor: "#000000",
    borderRadius: 9999,
  },
  apple_button__press: {
    backgroundColor: lighten("#000000"),
    borderColor: lighten("#000000"),
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
    color: "#FFFFFF",
  },
  button_text_2: {
    fontFamily: "RedHatText-SemiBold",
    color: "#D30101",
  },

  touchable_text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
