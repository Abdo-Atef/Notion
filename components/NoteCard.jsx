import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { useDispatch } from "react-redux";
import { deleteNote, getNotes } from "../redux/noteSlice";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NoteCard({ data }) {
  let dispatch = useDispatch();
  let navigation = useNavigation();

  const handleDelete = async () => {
    await dispatch(deleteNote(data.id));
    dispatch(getNotes());
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.content}>{data.content}</Text>
      </View>
      <View style={styles.methods}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("UpdatePage", { data });
          }}
        >
          <FontAwesome6
            name="pen-to-square"
            size={SIZES.xLarge - 2}
            color={COLORS.gold}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
          <View>
            <Ionicons name="trash" size={SIZES.xLarge - 2} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.second,
    marginVertical: SIZES.small,
    padding: SIZES.xLarge,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large + 1,
    marginBottom: SIZES.small,
  },
  content: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium + 1,
  },
  methods: {
    flexDirection: "row",
    gap: SIZES.small,
    justifyContent: "flex-end",
    marginTop: SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.bg,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
  },
});
