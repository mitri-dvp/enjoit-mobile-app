import { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";

import { useRouter } from "expo-router";
import { Image } from "expo-image";

import { View, Text, YStack } from "tamagui";

import { TouchableOpacity } from "react-native-gesture-handler";

import ScreenView from "src/components/ScreenView";
import LoginForm from "src/components/Forms/LoginForm";
import SheetBase from "src/components/Sheets/SheetBase";
import ForgotPasswordSheet from "src/components/Sheets/ForgotPasswordSheet";
import LoginAsGuest from "src/components/LoginAsGuest";

import { styles as shared } from "src/styles/shared";

export default function Login() {
  const router = useRouter();

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigateToSignup = () => router.push("/signup");

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
            style={styles.logo}
          />
        </View>

        <LoginForm />

        <YStack gap={32} marginTop={64}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.touchable_text}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.touchable_text}>Regístrate</Text>
          </TouchableOpacity>
          <LoginAsGuest>
            <TouchableOpacity>
              <Text style={styles.touchable_text}>Ingresa como invitado</Text>
            </TouchableOpacity>
          </LoginAsGuest>
        </YStack>
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
  ...shared,

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
  logo: {
    width: 128,
    height: 128,
    borderRadius: 24,
  },
});
