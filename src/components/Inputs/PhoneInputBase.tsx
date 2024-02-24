import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, KeyboardTypeOptions } from "react-native";
import { Input, Text, Label, Button } from "tamagui";
import { Controller } from "react-hook-form";
import { Control, FieldError } from "react-hook-form/dist/types";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

const PhoneInputBase = (props: {
  labelText: string;
  inputId: string;
  placeholder: string;
  control: Control<any>;
  inputKeyboardType?: KeyboardTypeOptions;
  captionText?: string;
  secureText?: boolean;
}) => {
  const [countryCode, setCountryCode] = useState("+57");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const TextInputIcon = () => (
    <Button style={styles.icon_button} onPress={toggleSecureEntry}>
      <Image
        source={
          secureTextEntry
            ? require("src/assets/svg/eye.svg")
            : require("src/assets/svg/eye-dash.svg")
        }
        contentFit="contain"
        style={{ width: 24, height: 24 }}
      />
    </Button>
  );

  const TextInputLabel = (): React.ReactElement => (
    <Label {...styles.label} style={styles.text} htmlFor={props.inputId}>
      {props.labelText}
    </Label>
  );

  const TextInputCaption = () => {
    return <Text style={styles.text}>{props.captionText}</Text>;
  };

  const TextInputError = ({ error }: { error: FieldError }) => {
    return (
      <Text style={[styles.text, styles.text__error]}>{error.message}</Text>
    );
  };

  return (
    <Controller
      control={props.control}
      name={props.inputId}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, isTouched },
      }) => {
        useEffect(() => {
          if (isValidPhoneNumber(value)) {
            let parsedPhoneNumber = parsePhoneNumber(value);
            setCountryCode("+" + parsedPhoneNumber.countryCallingCode);
            setPhoneNumber(parsedPhoneNumber.nationalNumber);
          }
        }, []);

        const handleChange = (value: string, type: string) => {
          const countryCodeValue = type === "countryCode" ? value : countryCode;
          const phoneNumberValue = type === "phoneNumber" ? value : phoneNumber;
          if (type === "countryCode") setCountryCode(value);
          if (type === "phoneNumber") setPhoneNumber(value);
          const phoneValue = countryCodeValue + phoneNumberValue;
          if (isTouched) onChange(phoneValue);
        };

        return (
          <>
            <TextInputLabel />
            <View style={{ flexDirection: "row", gap: 16, width: "100%" }}>
              <Input
                {...styles.input_country}
                style={{
                  ...{ ...styles.text, ...(error && styles.input__error) },
                }}
                value={countryCode}
                onChangeText={(value) => handleChange(value, "countryCode")}
                secureTextEntry={props.secureText && secureTextEntry}
              />
              <Input
                {...styles.input_phone}
                id={props.inputId}
                style={{
                  ...{ ...styles.text, ...(error && styles.input__error) },
                }}
                value={phoneNumber}
                onChangeText={(value) => handleChange(value, "phoneNumber")}
                onBlur={() => {
                  onBlur();
                  const phoneValue = countryCode + phoneNumber;
                  onChange(phoneValue);
                }}
                placeholder={props.placeholder}
                secureTextEntry={props.secureText && secureTextEntry}
                keyboardType="number-pad"
              />
              {props.secureText && <TextInputIcon />}
            </View>
            {props.captionText && <TextInputCaption />}
            {error && <TextInputError error={error} />}
          </>
        );
      }}
    />
  );
};

export default PhoneInputBase;

const styles = StyleSheet.create({
  text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#666666",
  },

  text__error: {
    color: "#D30101",
  },

  label: {
    marginVertical: 8,
  },

  input_country: {
    aspectRatio: "1.25 / 1",
    paddingHorizontal: 0,
    textAlign: "center",
    borderColor: "#8B8B8B",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },

  input_phone: {
    flexGrow: 1,
    flexShrink: 1,
    borderColor: "#8B8B8B",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },

  input__error: {
    borderColor: "#D30101",
  },

  icon_button: {
    position: "absolute",
    right: 0,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});
