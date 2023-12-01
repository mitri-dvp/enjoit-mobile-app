import React from "react";

import { StyleSheet } from "react-native";
import { Image } from "expo-image";

import { Text, Label, XStack, Checkbox } from "tamagui";

import { Controller } from "react-hook-form";
import { Control, FieldError } from "react-hook-form/dist/types";

const CheckboxInputBase = (props: {
  labelContent: React.FunctionComponentElement<any>;
  inputId: string;
  placeholder?: string;
  control: Control<any>;
}) => {
  return (
    <Controller
      control={props.control}
      name={props.inputId}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <XStack alignItems="center" gap={16}>
            <Checkbox
              id={props.inputId}
              style={{ alignSelf: "flex-start" }}
              onCheckedChange={onChange}
              unstyled
            >
              <Image
                source={
                  value
                    ? require("src/assets/svg/checkbox.svg")
                    : require("src/assets/svg/checkbox-outline.svg")
                }
                contentFit="contain"
                style={{ width: 24, height: 24 }}
              />
            </Checkbox>

            <Label
              htmlFor={props.inputId}
              style={{
                fontFamily: "Rajdhani-SemiBold",
                color: "#666666",
                flexShrink: 1,
                lineHeight: 24,
              }}
            >
              {props.labelContent}
            </Label>
          </XStack>
        </>
      )}
    />
  );
};

export default CheckboxInputBase;

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
  icon_select: {},
});
