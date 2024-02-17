import { StyleSheet } from "react-native";
import { darken } from "src/utils/color";

export const styles = StyleSheet.create({
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

  separator_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 20,
  },

  submit_button: {
    backgroundColor: "#D30101",
    borderColor: "#D30101",
    borderRadius: 9999,
    alignSelf: "center",
    paddingHorizontal: 32,
    marginTop: 32,
    minWidth: "50%",
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
