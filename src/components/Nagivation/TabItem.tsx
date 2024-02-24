import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import { Image } from "expo-image";

import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, YStack } from "tamagui";

const TabItem = ({
  routeName,
  routeKey,
  isFocused,
  tabBarProps,
}: {
  routeName: string;
  routeKey: string;
  isFocused: boolean;
  tabBarProps: BottomTabBarProps;
}) => {
  const { navigation } = tabBarProps;

  const getTabItemOptions = (): { label: string; icon: string } => {
    switch (routeName) {
      case "home":
        return {
          label: "Inicio",
          icon: require("src/assets/svg/navigation/home.svg"),
        };
      case "orders":
        return {
          label: "Mis pedidos",
          icon: require("src/assets/svg/navigation/file.svg"),
        };
      case "chat":
        return {
          label: "Chat",
          icon: require("src/assets/svg/navigation/chat.svg"),
        };
      case "profile":
        return {
          label: "Perfil",
          icon: require("src/assets/svg/navigation/user.svg"),
        };
      default:
        return {
          label: routeName,
          icon: require("src/assets/svg/navigation/home.svg"),
        };
    }
  };
  const { label, icon } = getTabItemOptions();

  const handleTabBarItemPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isFocused && styles.container__active]}
      onPress={handleTabBarItemPress}
    >
      <Image
        source={icon}
        contentFit="contain"
        style={{ width: 24, height: 24 }}
      />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    gap: 4,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  container__active: {
    borderBottomColor: "#D30101",
  },
});
