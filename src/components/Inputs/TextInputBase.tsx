import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View, KeyboardTypeOptions } from "react-native";
import { Input, Text, Label, Button } from "tamagui";
import { Controller } from "react-hook-form";
import { Control, FieldError } from "react-hook-form/dist/types";

const TextInputBase = (props: {
  labelText?: string;
  inputId: string;
  placeholder: string;
  control: Control<any>;
  inputKeyboardType?: KeyboardTypeOptions;
  captionText?: string;
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
        fieldState: { error },
      }) => (
        <>
          {!!props.labelText && <TextInputLabel />}
          <View>
            <Input
              {...styles.input}
              id={props.inputId}
              style={{
                ...{ ...styles.text, ...(error && styles.input__error) },
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={props.placeholder}
              secureTextEntry={props.secureText && secureTextEntry}
              keyboardType={props.inputKeyboardType}
            />
            {!!props.secureText && <TextInputIcon />}
          </View>
          {!!props.captionText && <TextInputCaption />}
          {!!error && <TextInputError error={error} />}
        </>
      )}
    />
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
