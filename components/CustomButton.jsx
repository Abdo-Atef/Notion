import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";

export default function CustomButton({ title, icon, buttonStyle , pressHandler }) {
  if (icon) {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, buttonStyle]}
        onPress={pressHandler && pressHandler}
      >
        <ActivityIndicator color={'black'}/>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonStyle]}
      onPress={pressHandler && pressHandler}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.gold,
    padding: SIZES.medium - 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
  },
  buttonTitle: {
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },
});
