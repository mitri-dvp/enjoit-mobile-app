import { useEffect, useState } from "react";
import { Pressable, TextStyle, StyleProp } from "react-native";

import { Input, Button } from "tamagui";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // https://github.com/mmazzarolo/react-native-modal-datetime-picker
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";

const DateTimePickerBase = (props: {
  date?: Date;
  type: "date" | "time";
  triggerStyle?: StyleProp<any>;
  textStyle?: TextStyle;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  accentColor?: string;
  textColor?: string;
  buttonTextColorIOS?: string;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(props.date);

  const getDateValue = (date: Date) => {
    if (type === "date") return date.toLocaleDateString();
    if (type === "time") return date.toLocaleTimeString();
  };

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    props.onConfirm && props.onConfirm(date);
    hideDatePicker();
  };

  const type = props.type || "date";

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        <Input
          {...props.triggerStyle}
          style={props.textStyle}
          value={date && getDateValue(date)}
          placeholder={props.placeholder}
          editable={false}
        />
        <Button
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        >
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
        date={date}
        isVisible={show}
        mode={type}
        // display="inline"
        accentColor={props.accentColor}
        textColor={props.textColor}
        buttonTextColorIOS={props.buttonTextColorIOS}
        onChange={props.onChange}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DateTimePickerBase;
