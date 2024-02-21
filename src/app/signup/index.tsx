import { useEffect } from "react";

import { StyleSheet, Dimensions } from "react-native";

import { useNavigation } from "expo-router";
import { Image } from "expo-image";

import { View } from "tamagui";

import ScreenView from "src/components/ScreenView";
import SignupForm from "src/components/Forms/SignupForm";
import { styles as shared } from "src/styles/shared";

export default function Signup() {
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
            style={styles.logo}
          />
        </View>

        <SignupForm />
      </View>
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
