import { Image } from "expo-image";
import { useState } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { InputProps } from "tamagui";
import { Input, Text, Label, Button } from "tamagui";

const TextInputBase = (props: {
  labelText: string;
  inputId: string;
  inputPlaceholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  inputKeyboardType?: KeyboardTypeOptions;
  captionText?: string;
  error?: string;
  secureText?: boolean;
}) => {
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

  const TextInputError = () => {
    return <Text style={[styles.text, styles.text__error]}>{props.error}</Text>;
  };

  return (
    <View>
      <TextInputLabel />
      <View>
        <Input
          {...styles.input}
          id={props.inputId}
          style={{
            ...{ ...styles.text, ...(props.error && styles.input__error) },
          }}
          value={props.value}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          placeholder={props.inputPlaceholder}
          secureTextEntry={props.secureText && secureTextEntry}
          keyboardType={props.inputKeyboardType}
        />
        {props.secureText && <TextInputIcon />}
      </View>
      {props.captionText && <TextInputCaption />}
      {props.error && <TextInputError />}
    </View>
  );
};

export default TextInputBase;

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

  input: {
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
