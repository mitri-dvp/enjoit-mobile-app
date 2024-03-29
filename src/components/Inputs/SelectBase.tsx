import React from "react";

import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import {
  Input,
  Button,
  Adapt,
  Select,
  SelectProps,
  Sheet,
  Text,
  View,
  Label,
  XStack,
  YStack,
  ScrollView,
} from "tamagui";

import { Controller } from "react-hook-form";
import { Control, FieldError } from "react-hook-form/dist/types";

const SelectInputBase = (props: {
  labelText: string;
  inputId: string;
  placeholder?: string;
  headerText?: string;
  control: Control<any>;
  items: { name: string; value: string; icon?: React.ReactElement }[];
}) => {
  const SelectInputLabel = (): React.ReactElement => (
    <Label {...styles.label} style={styles.text} htmlFor={props.inputId}>
      {props.labelText}
    </Label>
  );

  const SelectInputError = ({ error }: { error: FieldError }) => {
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
          <SelectInputLabel />
          <Select
            onValueChange={(value) => onChange(value)}
            defaultValue={value}
          >
            <Select.Trigger
              style={{
                ...{ ...styles.input, ...(error && styles.input__error) },
              }}
              pressStyle={{
                ...{ ...styles.input, ...(error && styles.input__error) },
              }}
              iconAfter={
                <Image
                  source={require("src/assets/svg/select-arrow.svg")}
                  contentFit="contain"
                  style={{ width: 24, height: 24 }}
                />
              }
            >
              <Select.Value
                style={styles.text}
                placeholder={props.placeholder}
              />
            </Select.Trigger>

            <Adapt>
              <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                <Sheet.Overlay
                  animation="quick"
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
                <Sheet.Frame>
                  <Sheet.ScrollView
                    maxHeight={Dimensions.get("window").height * 0.75}
                  >
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.Viewport>
                {props.headerText && (
                  <Text
                    style={{
                      alignSelf: "center",
                      fontFamily: "RedHatText-SemiBold",
                      paddingVertical: 32,
                      color: "#666666",
                    }}
                  >
                    {props.headerText}
                  </Text>
                )}
                {props.items.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.value}>
                      {item.icon && item.icon}
                      {item.name}
                      {/*
                        To Allow the Icon to be redered properly and keep
                        the item selection working, display was set to none
                      */}
                      <Select.ItemText display="none">
                        {item.name}
                      </Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Image
                          source={require("src/assets/svg/check.svg")}
                          contentFit="contain"
                          style={{ width: 24, height: 24 }}
                        />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                })}
              </Select.Viewport>
            </Select.Content>
          </Select>
          {error && <SelectInputError error={error} />}
        </>
      )}
    />
  );
};

export default SelectInputBase;

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
