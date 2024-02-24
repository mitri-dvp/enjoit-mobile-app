import { StyleSheet, Platform, StatusBar } from "react-native";

import { Image } from "expo-image";

import { Text, View } from "tamagui";

import ScreenView from "src/components/ScreenView";

import { styles as shared } from "src/styles/shared";

export default function Orders() {
  return (
    <ScreenView screenStyle={styles.screen}>
      <View style={styles.container}>
        <View style={styles.logo_container}>
          <Image
            source={require("src/assets/images/enjoit/logo-light.jpg")}
            contentFit="contain"
            style={styles.logo}
          />
        </View>
        <Text style={[styles.text, { fontSize: 32 }]}>Chat</Text>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  ...shared,
  screen: {
    marginTop: Platform.select({ android: StatusBar.currentHeight }),
    backgroundColor: "rgb(255, 255, 255)",
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
});
