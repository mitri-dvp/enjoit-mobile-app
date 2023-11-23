import {
  ScrollView,
  SafeAreaView,
  Platform,
  useColorScheme,
  StatusBar,
} from "react-native";

const ScreenView = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

  const bgColor = colorScheme === "dark" ? "dark" : "white";

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.select({ android: StatusBar.currentHeight }),
        backgroundColor: bgColor,
      }}
    >
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default ScreenView;
