import { useEffect, useState } from "react";
import { Pressable, TextStyle, StyleProp, StyleSheet } from "react-native";

import { Image } from "expo-image";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // https://github.com/mmazzarolo/react-native-modal-datetime-picker

import { Input, Button, Label, Text } from "tamagui";
import { Controller } from "react-hook-form";
import { Control, FieldError } from "react-hook-form/dist/types";

import dayjs from "src/utils/dayjs";

const DateTimeInputBase = (props: {
  date?: Date;
  type: "date" | "time";
  labelText: string;
  inputId: string;
  control: Control<any>;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  buttonTextColorIOS?: string;
}) => {
  const [show, setShow] = useState(false);

  const getDateValue = (date: Date) => {
    if (type === "date") return date.toLocaleDateString();
    if (type === "time") return date.toLocaleTimeString();
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const type = props.type || "date";

  const DateTimeInputLabel = (): React.ReactElement => (
    <Label {...styles.label} style={styles.text} htmlFor={props.inputId}>
      {props.labelText}
    </Label>
  );

  const DateTimeInputError = ({ error }: { error: FieldError }) => {
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
          <DateTimeInputLabel />
          <Pressable onPress={() => setShow(true)}>
            <Input
              {...styles.input}
              style={{
                ...{ ...styles.text, ...(error && styles.input__error) },
              }}
              value={value ? getDateValue(value) : ""}
              placeholder={props.placeholder}
              editable={false}
            />
            <Button style={styles.icon_button} onPress={() => setShow(true)}>
              <Image
                source={require("src/assets/svg/calendar.svg")}
                contentFit="contain"
                style={{ width: 24, height: 24 }}
              />
            </Button>
          </Pressable>

          <DateTimePickerModal
            cancelTextIOS={props.cancelText}
            confirmTextIOS={props.confirmText}
            date={value}
            isVisible={show}
            mode={type}
            minimumDate={dayjs().subtract(85, "years").toDate()}
            maximumDate={dayjs().subtract(3, "years").toDate()}
            // display="inline"
            buttonTextColorIOS={props.buttonTextColorIOS}
            onConfirm={(date: Date) => {
              onChange(date);
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
          />

          {error && <DateTimeInputError error={error} />}
        </>
      )}
    />
  );
};

export default DateTimeInputBase;

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
