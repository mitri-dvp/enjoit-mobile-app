import { ViewStyle, TextStyle, StyleProp } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Input,
  Button,
  Adapt,
  Select,
  SelectProps,
  Sheet,
  XStack,
  YStack,
} from "tamagui";
import { Image } from "expo-image";

import React from "react";

const SelectBase = (props: {
  triggerStyle?: StyleProp<any>;
  textStyle?: TextStyle;
  select?: SelectProps;
  placeholder?: string;
  items: { name: string; value: string }[];
}) => {
  return (
    <Select {...props.select}>
      <Select.Trigger
        style={props.triggerStyle}
        pressStyle={props.triggerStyle}
        iconAfter={
          <Image
            source={require("src/assets/svg/select-arrow.svg")}
            contentFit="contain"
            style={{ width: 24, height: 24 }}
          />
        }
      >
        <Select.Value style={props.textStyle} placeholder={props.placeholder} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet native modal dismissOnSnapToBottom snapPointsMode={"fit"}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Icon name="chevron-up" size={20} />
          </YStack>
        </Select.ScrollUpButton>
        <Select.Viewport>
          <XStack>
            <Select.Group space="$0">
              {props.items.map((item, i) => {
                return (
                  <Select.Item index={i} key={item.name} value={item.value}>
                    <Select.ItemText>{item.name}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Icon name="check" size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Group>
            {/* special icon treatment for native */}
            {/* {props.select.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={"$4"}
                pointerEvents="none"
              >
                <Icon name="chevron-down" />
              </YStack>
            )} */}
          </XStack>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Icon name="chevron-down" />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

export default SelectBase;
