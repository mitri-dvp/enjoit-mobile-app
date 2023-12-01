import React from "react";

import { Image } from "expo-image";

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

import { useForm, Controller } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { StyleSheet } from "react-native";
import { darken } from "src/utils/color";
import { useRouter } from "expo-router";

const TermsSchema = zodResolver(
  z.object({
    acceptedTerms: z.boolean(),
    acceptedDataTreatment: z.boolean(),
  })
);

const TermsSheet = (props: { onSubmit: (data: any) => void }) => {
  const router = useRouter();

  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: {
      acceptedTerms: false,
      acceptedDataTreatment: false,
    },
    resolver: TermsSchema,
    mode: "all",
  });

  const onSubmit = handleSubmit((data) => {
    props.onSubmit(data);
  });

  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 32,
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          marginBottom: 16,
          fontSize: 16,
          fontFamily: "Rajdhani-SemiBold",
          paddingVertical: 10,
          color: "#666666",
        }}
      >
        Términos y Condiciones
      </Text>
      <Separator style={{ borderColor: "#D8D8D8" }} />
      <YStack marginVertical={32} gap={32}>
        <Controller
          control={control}
          name={"acceptedTerms"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <XStack alignItems="center" gap={16}>
                <Checkbox
                  id={"acceptedTerms"}
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
                  htmlFor={"acceptedTerms"}
                  style={{
                    fontFamily: "Rajdhani-SemiBold",
                    color: "#666666",
                    flexShrink: 1,
                    lineHeight: 24,
                  }}
                >
                  Yo acepto los{" "}
                  <Text
                    style={{
                      fontFamily: "Rajdhani-SemiBold",
                      color: "#D30101",
                    }}
                  >
                    terminos y condiciones de Enjoit
                  </Text>
                </Label>
              </XStack>
            </>
          )}
        />
        <Controller
          control={control}
          name={"acceptedDataTreatment"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <XStack alignItems="center" gap={16}>
                <Checkbox
                  id={"acceptedDataTreatment"}
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
                  htmlFor={"acceptedDataTreatment"}
                  style={{
                    fontFamily: "Rajdhani-SemiBold",
                    color: "#666666",
                    flexShrink: 1,
                    lineHeight: 24,
                  }}
                >
                  Yo acepto y autorizo el{" "}
                  <Text
                    style={{
                      fontFamily: "Rajdhani-SemiBold",
                      color: "#D30101",
                    }}
                  >
                    tratamiento de datos de Enjoit
                  </Text>
                </Label>
              </XStack>
            </>
          )}
        />
      </YStack>
      <Button
        {...styles.submit_button}
        pressStyle={styles.submit_button__press}
        style={[!formState.isValid && styles.submit_button__disabled]}
        onPress={() => onSubmit()}
      >
        <Text
          style={[
            styles.button_text,
            !formState.isValid && styles.button_text__disabled,
          ]}
        >
          Acepto términos y condiciones
        </Text>
      </Button>
    </View>
  );
};

export default TermsSheet;

const styles = StyleSheet.create({
  submit_button: {
    backgroundColor: "#D30101",
    borderColor: "#D30101",
    borderRadius: 9999,
    alignSelf: "center",
    paddingHorizontal: 32,
  },
  submit_button__press: {
    backgroundColor: darken("#D30101"),
    borderColor: darken("#D30101"),
  },
  submit_button__disabled: {
    backgroundColor: "#F0F0F0",
    borderColor: "#F0F0F0",
  },
  button_text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#FFFFFF",
  },
  button_text__disabled: {
    fontFamily: "RedHatText-SemiBold",
    color: "#BCBCBC",
  },
  button_text__dark: {
    fontFamily: "RedHatText-SemiBold",
    color: "#D30101",
  },
});
