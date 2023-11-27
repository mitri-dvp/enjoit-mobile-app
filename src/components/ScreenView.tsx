import {
  ScrollView,
  SafeAreaView,
  Platform,
  useColorScheme,
  StatusBar,
  ViewStyle,
} from "react-native";

const ScreenView = ({
  children,
  screenStyle,
  scrollViewStyle,
}: {
  children: React.ReactNode;
  screenStyle?: ViewStyle;
  scrollViewStyle?: ViewStyle;
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
        screenStyle,
      ]}
    >
      <ScrollView style={scrollViewStyle}>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default ScreenView;
