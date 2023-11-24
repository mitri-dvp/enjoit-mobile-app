import {
  ScrollView,
  SafeAreaView,
  Platform,
  useColorScheme,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";

const ScreenView = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  const colorScheme = useColorScheme();

  const bgColor = colorScheme === "dark" ? "dark" : "white";

  return (
    <SafeAreaView
      style={[
        {
          paddingTop: Platform.select({ android: StatusBar.currentHeight }),
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default ScreenView;
