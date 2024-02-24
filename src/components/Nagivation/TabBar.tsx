import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "tamagui";
import { XStack } from "tamagui";
import TabItem from "./TabItem";

const TabBar = (props: BottomTabBarProps) => {
  const { descriptors, insets, navigation, state } = props;

  return (
    <XStack style={styles.container}>
      {state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          routeName={route.name}
          routeKey={route.key}
          isFocused={state.index === index}
          tabBarProps={props}
        />
      ))}
    </XStack>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
    borderTopWidth: 2,
    borderTopColor: "#F1F1F1",
  },
});
