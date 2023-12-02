import { Sheet } from "tamagui";
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  Dimensions,
} from "react-native";

const SheetBase = (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.FunctionComponentElement<any>;
}) => {
  return (
    <Sheet
      modal
      open={props.open}
      onOpenChange={props.setOpen}
      snapPointsMode="fit"
    >
      <Sheet.Overlay
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Frame>
        <Sheet.ScrollView maxHeight={Dimensions.get("window").height * 0.75}>
          {props.children}
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};

export default SheetBase;
