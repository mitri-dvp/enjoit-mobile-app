import { useEffect } from "react";

import { StyleSheet, Dimensions } from "react-native";

import { useNavigation } from "expo-router";
import { Image } from "expo-image";

import { View } from "tamagui";

import ScreenView from "src/components/ScreenView";
import LoginForm from "src/components/Forms/LoginForm";

export default function Login() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
      </View>
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
});
