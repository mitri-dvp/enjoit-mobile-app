import { StyleSheet } from "react-native";
import { darken } from "src/utils/color";

export const styles = StyleSheet.create({
  // UI //
  // Sheets?
  title: {
    alignSelf: "center",
    fontSize: 14,
    fontFamily: "RedHatText-SemiBold",
    color: "#666666",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "RedHatText-SemiBold",
    color: "#666666",
  },

  text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#666666",
  },
  text_center: {
    textAlign: "center",
  },
  text__error: {
    color: "#D30101",
  },

  // Form Styles //
  submit_button: {
    backgroundColor: "#D30101",
    borderColor: "#D30101",
    borderRadius: 9999,
    alignSelf: "center",
    paddingHorizontal: 32,
    width: "100%",
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

  touchable_text: {
    fontFamily: "RedHatText-SemiBold",
    color: "#D30101",
    textAlign: "center",
  },

  touchable_text__press: {
    color: darken("#D30101"),
  },
});
