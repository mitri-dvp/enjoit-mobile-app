import { useState } from "react";

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

import { useForm } from "react-hook-form";

import CheckboxInputBase from "src/components/Inputs/CheckboxInputBase";

import SheetBase from "src/components/Sheets/SheetBase";
import TermsSheet from "src/components/Sheets/TermsSheet";
import DataTreatmentSheet from "src/components/Sheets/DataTreatmentSheet";

import { TermsSchema, TermsValues } from "src/schemas/root";

import { styles as shared } from "src/styles/shared";
import { StyleSheet } from "react-native";

export default function TermsForm(props: { onSubmit: (data: any) => void }) {
  const { control, handleSubmit, formState, setValue } = useForm({
    defaultValues: TermsValues,
    resolver: TermsSchema,
    mode: "all",
  });

  const onSubmit = handleSubmit((data) => {
    props.onSubmit(data);
  });

  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showDataTreatmentSheet, setShowDataTreatmentSheet] = useState(false);

  const toggleTermsSheet = () => {
    setShowTermsSheet(!showTermsSheet);
  };
  const confirmTermsSheet = () => {
    setValue("acceptedTerms", true);
    toggleTermsSheet();
  };
  const toggleDataTreatmentSheet = () => {
    setShowDataTreatmentSheet(!showDataTreatmentSheet);
  };
  const confirmDataTreatmentSheet = () => {
    setValue("acceptedDataTreatment", true);
    toggleDataTreatmentSheet();
  };

  return (
    <View style={styles.container}>
      <YStack marginBottom={16}>
        <Text style={styles.title}>Términos y Condiciones</Text>
      </YStack>

      <Separator style={{ borderColor: "#D8D8D8" }} />

      <YStack marginVertical={32} gap={32}>
        <CheckboxInputBase
          control={control}
          inputId={"acceptedTerms"}
          labelContent={
            <>
              Yo acepto los{" "}
              <Text
                style={styles.touchable_text}
                pressStyle={styles.touchable_text__press}
                onPress={toggleTermsSheet}
              >
                terminos y condiciones de Enjoit
              </Text>
            </>
          }
        />
        <CheckboxInputBase
          control={control}
          inputId={"acceptedDataTreatment"}
          labelContent={
            <>
              Yo acepto y autorizo el{" "}
              <Text
                style={styles.touchable_text}
                pressStyle={styles.touchable_text__press}
                onPress={toggleDataTreatmentSheet}
              >
                tratamiento de datos de Enjoit
              </Text>
            </>
          }
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

      <SheetBase open={showTermsSheet} setOpen={setShowTermsSheet}>
        <TermsSheet onBack={toggleTermsSheet} onConfirm={confirmTermsSheet} />
      </SheetBase>

      <SheetBase
        open={showDataTreatmentSheet}
        setOpen={setShowDataTreatmentSheet}
      >
        <DataTreatmentSheet
          onBack={toggleDataTreatmentSheet}
          onConfirm={confirmDataTreatmentSheet}
        />
      </SheetBase>
    </View>
  );
}

const styles = StyleSheet.create({
  ...shared,

  container: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  title: {
    fontSize: 16,
    fontFamily: "Rajdhani-SemiBold",
    color: "#666666",
    paddingVertical: 12,
    alignSelf: "center",
  },

  touchable_text: {
    ...shared.touchable_text,
    fontFamily: "Rajdhani-SemiBold",
  },
});
