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

const DataTreatmentSheet = (props: { onBack: () => void }) => {
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 32,
      }}
    >
      <View style={{ marginTop: 16 }} onPress={props.onBack}>
        <Image
          source={require("src/assets/svg/chevron-left.svg")}
          contentFit="contain"
          style={{ width: 24, height: 24 }}
        />
      </View>
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
        Tratamiento de Datos
      </Text>
      <View style={{ gap: 16 }}>
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
      </View>
    </View>
  );
};

export default DataTreatmentSheet;
