import { useEffect, useState } from "react";
import { Platform, Dimensions, StatusBar, BackHandler } from "react-native";

import { Image } from "expo-image";

import { View } from "tamagui";

import StepOneForm from "src/components/Forms/ForgotPassword/StepOneForm";
import StepTwoForm from "src/components/Forms/ForgotPassword/StepTwoForm";
import StepThreeForm from "src/components/Forms/ForgotPassword/StepThreeForm";

import { FPIdentifierType, FPStepType } from "src/models/zod/auth";

const ForgotPasswordSheet = (props: {
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const [step, setStep] = useState<FPStepType>("step-1");
  const [identifier, setIdentifier] = useState<FPIdentifierType>({
    value: "",
    type: "",
  });
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleBack = () => {
    switch (step) {
      case "step-1":
        return props.onBack();
      case "step-2":
        return setStep("step-1");
      case "step-3":
        return setStep("step-2");
      default:
        return;
    }
  };

  const handleEnd = () => {
    props.onBack();
  };

  useEffect(() => {
    const backAction = () => {
      handleBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [step]);

  const CurrentStep = () => {
    switch (step) {
      case "step-1":
        return <StepOneForm setStep={setStep} setIdentifier={setIdentifier} />;
      case "step-2":
        return (
          <StepTwoForm
            setStep={setStep}
            setConfirmationCode={setConfirmationCode}
            identifier={identifier}
          />
        );
      case "step-3":
        return (
          <StepThreeForm
            identifier={identifier}
            confirmationCode={confirmationCode}
            onSuccess={handleEnd}
          />
        );
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
      <View style={{ marginTop: 16 }} onPress={handleBack}>
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
