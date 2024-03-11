import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { FlashList } from "@shopify/flash-list";
import NoteCard from "../components/NoteCard";
import HomeHeader from "../components/HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../redux/noteSlice";

export default function Home() {
  const {notes, loading} = useSelector(state => state.notes);
  const [refreshing, setRefreshing] = useState(false);
  let dispatch = useDispatch();
  const fetchData = async () => {
    setRefreshing(true)
    await dispatch(getNotes());
    setRefreshing(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      {!loading ? (
        <React.Fragment>
          {notes.length > 0 ? (
            <FlashList
              data={notes}
              // ListHeadnoteserComponent={HomeHeader}
              renderItem={({ item }) => <NoteCard data={item}/>}
              estimatedItemSize={200}
              refreshing={refreshing}
              onRefresh={fetchData}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: SIZES.large, color: COLORS.white }}>
                There Are No Notes Yet
              </Text>
            </View>
          )}
        </React.Fragment>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            color={COLORS.gold}
            size={SIZES.xLarge + 10}
            style={{ bottom: 50 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
