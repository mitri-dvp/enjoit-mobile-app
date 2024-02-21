import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { styles as shared } from "src/styles/shared";

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

const TermsSheet = (props: { onBack: () => void; onConfirm: () => void }) => {
  return (
    <View style={styles.container}>
      <YStack marginTop={16} onPress={props.onBack}>
        <Image
          source={require("src/assets/svg/chevron-left.svg")}
          contentFit="contain"
          style={styles.icon}
        />
      </YStack>

      <Text style={styles.title}>Términos y Condiciones</Text>

      <YStack gap={16} marginVertical={16}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quas
          alias explicabo quod exercitationem commodi, soluta rem voluptates
          aperiam ratione magni natus autem asperiores inventore iusto molestias
          ab perspiciatis. Unde.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quas
          alias explicabo quod exercitationem commodi, soluta rem voluptates
          aperiam ratione magni natus autem asperiores inventore iusto molestias
          ab perspiciatis. Unde.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quas
          alias explicabo quod exercitationem commodi, soluta rem voluptates
          aperiam ratione magni natus autem asperiores inventore iusto molestias
          ab perspiciatis. Unde.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quas
          alias explicabo quod exercitationem commodi, soluta rem voluptates
          aperiam ratione magni natus autem asperiores inventore iusto molestias
          ab perspiciatis. Unde.
        </Text>
      </YStack>

      <YStack marginVertical={16}>
        <Button
          {...styles.submit_button}
          pressStyle={styles.submit_button__press}
          onPress={() => props.onConfirm()}
        >
          <Text style={[styles.button_text]}>Aceptar</Text>
        </Button>
      </YStack>
    </View>
  );
};

export default TermsSheet;

const styles = StyleSheet.create({
  ...shared,

  container: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  icon: {
    width: 24,
    height: 24,
  },

  title: {
    fontSize: 16,
    fontFamily: "Rajdhani-SemiBold",
    color: "#666666",
    paddingVertical: 12,
    alignSelf: "center",
  },
});
