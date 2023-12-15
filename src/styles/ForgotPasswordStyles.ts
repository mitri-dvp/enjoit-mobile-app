import { StyleSheet } from "react-native";
import { darken } from "src/utils/color";

export const styles = StyleSheet.create({
  submit_button: {
    backgroundColor: "#D30101",
    borderColor: "#D30101",
    borderRadius: 9999,
    alignSelf: "center",
    paddingHorizontal: 32,
    marginTop: 16,
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
    width: "100%",
    textAlign: "center",
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

  title: {
    alignSelf: "center",
    fontSize: 14,
    fontFamily: "RedHatText-SemiBold",
    paddingVertical: 12,
    color: "#666666",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "RedHatText-SemiBold",
    paddingVertical: 12,
    color: "#666666",
    marginBottom: 16,
  },

  text: {
    fontFamily: "Rajdhani-SemiBold",
    color: "#D30101",
  },
  text__press: {
    color: darken("#D30101"),
  },
});
