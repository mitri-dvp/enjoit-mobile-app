import { useEffect } from "react";
import { useNavigation } from "expo-router";
import ScreenView from "src/components/ScreenView";
import { Link, View } from "src/components/Themed";

import { ImageBackground } from "react-native";

export default function Root() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ImageBackground
      imageStyle={{
        resizeMode: "cover",
      }}
      style={{
        flex: 1,
      }}
      source={require("src/assets/images/enjoit/root-bg.jpg")}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          justifyContent: "center",
        }}
      ></View>
    </ImageBackground>
  );
}
