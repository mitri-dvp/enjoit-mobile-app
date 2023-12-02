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

import { TermsSchema, TermsValues } from "src/schemas/TermsSchema";

import { styles } from "src/styles/TermsStyles";

export default function TermsForm(props: { onSubmit: (data: any) => void }) {
  const { control, handleSubmit, getValues, formState } = useForm({
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
    // router.push("/modals/test-modal");
  };
  const toggleDataTreatmentSheet = () => {
    setShowDataTreatmentSheet(!showDataTreatmentSheet);
    // router.push("/modals/test-modal");
  };

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
        <CheckboxInputBase
          control={control}
          inputId={"acceptedTerms"}
          labelContent={
            <>
              Yo acepto los{" "}
              <Text
                style={{
                  fontFamily: "Rajdhani-SemiBold",
                  color: "#D30101",
                }}
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
                style={{
                  fontFamily: "Rajdhani-SemiBold",
                  color: "#D30101",
                }}
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
        <TermsSheet onBack={toggleTermsSheet} />
      </SheetBase>
      <SheetBase
        open={showDataTreatmentSheet}
        setOpen={setShowDataTreatmentSheet}
      >
        <DataTreatmentSheet onBack={toggleDataTreatmentSheet} />
      </SheetBase>
    </View>
  );
}
