import { useEffect } from "react";

import { StyleSheet, Dimensions } from "react-native";

import { useNavigation } from "expo-router";
import { Image } from "expo-image";

import { Text, View, Separator, Label, Input } from "tamagui";

import ScreenView from "src/components/ScreenView";

export default function Root() {
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Image
            source={require("src/assets/svg/user.svg")}
            contentFit="contain"
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.text}>Cuenta</Text>
        </View>

        <Separator style={{ marginTop: 20, borderColor: "#D8D8D8" }} />

        <View>
          <Label {...styles.label} style={styles.text} htmlFor="name">
            Nickname
          </Label>
          <Input
            {...styles.input}
            style={[styles.text]}
            id="name"
            placeholder="Ingresa nickname"
          />
        </View>
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
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: "#FFFFFF",
  },

  logo_container: {
    paddingVertical: 64,
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
