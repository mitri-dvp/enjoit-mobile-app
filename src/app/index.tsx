import { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";

import { useNavigation } from "expo-router";
import { Image } from "expo-image";
import Icon from "@expo/vector-icons/EvilIcons";

import { Button, Text, View } from "tamagui";

import ScreenView from "src/components/ScreenView";
import { Color } from "src/utils/color";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Root() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ImageBackground
      imageStyle={{ resizeMode: "cover" }}
      style={{ flex: 1 }}
      source={require("src/assets/images/enjoit/root-bg.jpg")}
    >
      <ScreenView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Image
              source={require("src/assets/images/enjoit/logo.png")}
              contentFit="contain"
              style={{ width: 136, height: 52 }}
            />
          </View>
          <View>
            <Text style={styles.title}>
              {`Ordena, recoge, reserva\nlo que sea.`}
            </Text>

            <View style={{ gap: 12 }}>
              <Button
                {...styles.email_button}
                pressStyle={styles.email_button__press}
              >
                <Icon
                  name="envelope"
                  size={36}
                  style={styles.button_icon}
                  color={"#FFFFFF"}
                />
                <Text style={styles.button_text}>Ingresar con Email</Text>
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
            </View>
            <View
              style={{
                gap: 32,
                marginTop: 48,
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Text style={styles.button_text}>Ingresa como Invitado</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.button_text}>Ya tengo cuenta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 16,
  },

  logo_container: {
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    marginTop: "35%",
    marginBottom: 16,
    fontSize: 60,
    fontFamily: "RedHatText-Bold",
    lineHeight: 54,
    paddingVertical: 10,
    color: "#FFFFFF",
  },

  email_button: {
    backgroundColor: "#D30101",
    borderColor: "#D30101",
    borderRadius: 9999,
  },
  email_button__press: {
    backgroundColor: Color("#D30101").darken().toString(),
    borderColor: Color("#D30101").darken().toString(),
  },
  facebook_button: {
    backgroundColor: "#3C5B9A",
    borderColor: "#3C5B9A",
    borderRadius: 9999,
  },
  facebook_button__press: {
    backgroundColor: Color("#3C5B9A").darken().toString(),
    borderColor: Color("#3C5B9A").darken().toString(),
  },
  google_button: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderRadius: 9999,
  },
  google_button__press: {
    backgroundColor: Color("#FFFFFF").darken().toString(),
    borderColor: Color("#FFFFFF").darken().toString(),
  },
  apple_button: {
    backgroundColor: "#000000",
    borderColor: "#000000",
    borderRadius: 9999,
  },
  apple_button__press: {
    backgroundColor: Color("#000000").lighten().toString(),
    borderColor: Color("#000000").lighten().toString(),
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
});
