import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

export default function HomeHeader() {

  const navigation = useNavigation();
  const navigationHandler = ()=> {
    navigation.navigate('AddNotePage')
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Notes</Text>
      </View>

      <CustomButton
        title={"New Note"}
        buttonStyle={{
          padding: SIZES.small + 1,
          paddingHorizontal: SIZES.large,
        }}
        pressHandler={navigationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.medium,
    paddingBottom: 0,
    marginVertical:SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.gold,
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    marginLeft: SIZES.small,
  },
});
