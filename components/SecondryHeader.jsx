import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SecondryHeader({ title }) {
  let navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={25} color="white" />
        <Text style={{ color: COLORS.white, fontSize: SIZES.medium + 1 }}>
          Back
        </Text>
      </Pressable>
      <View>
        <Text style={styles.headerStyle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 0.2,
    paddingTop: SIZES.small + 6,
    paddingBottom: SIZES.small + 6,
  },
  backButton: {
    position: "absolute",
    left: SIZES.small + 5,
    top: SIZES.small + 6,
    flexDirection: "row",
    gap: SIZES.small - 3,
    alignItems: "center",
    zIndex: 99999,
  },
  headerStyle: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large + 2,
    textAlign: "center",
    left: SIZES.small,
  },
});
