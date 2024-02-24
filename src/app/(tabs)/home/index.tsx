import { useEffect, useState } from "react";
import { StyleSheet, Platform, StatusBar } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

import { Button, Text, View } from "tamagui";

import ScreenView from "src/components/ScreenView";
import SheetBase from "src/components/Sheets/SheetBase";
import TermsForm from "src/components/Forms/TermsForm";

import { darken, lighten } from "src/utils/color";
import { allowedNotificationsAsync } from "src/utils/notifications";
import { allowedLocationAsync } from "src/utils/location";
import { useUserStore } from "src/store/user";
import { User } from "src/models/zod";

import { styles as shared } from "src/styles/shared";
import SearchBar from "src/components/Forms/SearchBar";

export default function Home() {
  const router = useRouter();

  const user = useUserStore().user as User;

  const [open, setOpen] = useState(false);

  const handleEmailPress = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    setOpen(false);

    if (!(await allowedLocationAsync())) return;
    if (!(await allowedNotificationsAsync())) return;

    router.push("/signup");
  };

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

        <SearchBar />

        <Text style={styles.text}>role: {user.role}</Text>
        <Text style={styles.text}>email: {user.email}</Text>
        <Text style={styles.text}>nickName: {user.nickName}</Text>
        <Text style={styles.text}>firstName: {user.firstName}</Text>
        <Text style={styles.text}>lastName: {user.lastName}</Text>
      </View>

      <SheetBase open={open} setOpen={setOpen}>
        <TermsForm onSubmit={handleSubmit} />
      </SheetBase>
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
