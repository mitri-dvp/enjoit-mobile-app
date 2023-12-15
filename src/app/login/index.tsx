import { useEffect, useState } from "react";

import { StyleSheet, Dimensions } from "react-native";

import { useNavigation, useRouter } from "expo-router";
import { Image } from "expo-image";

import { View, Text } from "tamagui";

import { TouchableOpacity } from "react-native-gesture-handler";

import ScreenView from "src/components/ScreenView";
import LoginForm from "src/components/Forms/LoginForm";
import SheetBase from "src/components/Sheets/SheetBase";
import ForgotPasswordSheet from "src/components/Sheets/ForgotPasswordSheet";

export default function Login() {
  const navigation = useNavigation();
  const router = useRouter();

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigateToSignup = () => router.push("/signup");
  const navigateToHomeAsGuest = () => router.push("/home/");

  const handleForgotPassword = () => {
    toggleForgotPasswordSheet();
  };

  const toggleForgotPasswordSheet = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <ScreenView screenStyle={styles.screen} scrollViewStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.logo_container}>
          <Image
            source={require("src/assets/images/icon.png")}
            contentFit="contain"
            style={{ width: 128, height: 128, borderRadius: 24 }}
          />
        </View>
        <LoginForm />
        <View style={styles.navigation_container}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.button_text__dark}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.button_text__dark}>Regístrate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToHomeAsGuest}>
            <Text style={styles.button_text__dark}>Ingresa como invitado</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SheetBase
        open={showForgotPassword}
        setOpen={setShowForgotPassword}
        maxHeight={"unset"}
      >
        <ForgotPasswordSheet
          onBack={toggleForgotPasswordSheet}
          onSuccess={toggleForgotPasswordSheet}
        />
      </SheetBase>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  scrollView: { flex: 1 },

  container: {
    flex: 1,
    minHeight: Dimensions.get("screen").height,
    paddingVertical: 64,
    paddingHorizontal: 32,
    backgroundColor: "#FFFFFF",
  },

  logo_container: {
    justifyContent: "center",
    flexDirection: "row",
  },

  text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#666666",
  },

  label: {
    marginVertical: 8,
  },

  input: {
    borderColor: "#8B8B8B",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },

  navigation_container: {
    marginTop: 64,
    alignItems: "center",
    gap: 32,
  },

  button_text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#FFFFFF",
  },
  button_text__disabled: {
    fontFamily: "RedHatText-SemiBold",
    color: "#BCBCBC",
  },
  button_text__dark: {
    fontFamily: "RedHatText-SemiBold",
    color: "#D30101",
  },
});
