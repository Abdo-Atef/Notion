import { View, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES } from "../constants/theme";
import { FlashList } from "@shopify/flash-list";
import NoteCard from "../components/NoteCard";
import CustomTextInput from "../components/CustomTextInput";
import { Ionicons } from "@expo/vector-icons";
import { getNotes } from "../redux/noteSlice";

export default function Search() {
  let dispatch = useDispatch();
  const [SearchResult, setSearchResult] = useState([]);
  const { notes, loading } = useSelector((state) => state.notes);

  const fetchData = async () => {
    await dispatch(getNotes());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (value) => {
    const result = notes.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    value ? setSearchResult(result) : setSearchResult([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInput}>
        <Ionicons name="search-outline" size={24} color={COLORS.white} />
        <CustomTextInput
          borderColor={COLORS.bg}
          placeholder={"Enter the name of note"}
          inputStyles={{ padding: 0 , flex:1}}
          onChangeText={(value) => handleChange(value)}
        />
      </View>
      <FlashList
        data={SearchResult}
        renderItem={({ item }) => <NoteCard data={item} />}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  searchInput: {
    borderColor: COLORS.gold,
    borderWidth: 1,
    margin: SIZES.large,
    marginTop: SIZES.xLarge + 3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.medium,
    paddingLeft: SIZES.small + 5,
  },
});
