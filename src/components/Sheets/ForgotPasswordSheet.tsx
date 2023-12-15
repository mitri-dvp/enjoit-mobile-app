import { Platform, Dimensions, StatusBar } from "react-native";

import { Image } from "expo-image";

import { styles } from "src/styles/ForgotPasswordStyles";

import {
  Button,
  Checkbox,
  Label,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

import StepOneForm from "src/components/Forms/ForgotPassword/StepOneForm";
import StepTwoForm from "../Forms/ForgotPassword/StepTwoForm";
import { useForgotPasswordStore } from "src/store/forgotPasswordStore";
import { useEffect } from "react";

const ForgotPasswordSheet = (props: {
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const forgotPasswordStore = useForgotPasswordStore();

  useEffect(() => {
    return () => forgotPasswordStore.reset();
  }, []);

  const CurrentStep = () => {
    switch (forgotPasswordStore.step) {
      case "step-1":
        return <StepOneForm />;
      case "step-2":
        return <StepTwoForm />;

      default:
        return <></>;
    }
  };

  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 32,
        height:
          Dimensions.get("window").height -
          (Platform.select({ android: StatusBar.currentHeight }) || 0),
      }}
    >
      <View style={{ marginTop: 16 }} onPress={props.onBack}>
        <Image
          source={require("src/assets/svg/chevron-left.svg")}
          contentFit="contain"
          style={{ width: 24, height: 24 }}
        />
      </View>

      <CurrentStep />
    </View>
  );
};

export default ForgotPasswordSheet;
