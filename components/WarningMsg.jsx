import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import CustomButton from "./CustomButton";

export default function WarningMsg({title, content, setModalResult}) {
  return (
    <View style={styles.container}>
      <View style={styles.boxCo}>
        <View style={styles.header}>
          <Text style={{ color: 'red', fontSize:SIZES.large, fontFamily:FONTS.semiBold }}>{title}</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ color: COLORS.white, fontSize:SIZES.medium + 2 }}>{content}</Text>
        </View>
        <View style={styles.bottom}>
          <CustomButton 
          title="ok" 
          buttonStyle={{paddingVertical:2, paddingHorizontal:SIZES.large + 2 ,backgroundColor:'#d53343'}} 
          pressHandler={()=> setModalResult(true)}
          
          />
          <CustomButton 
          title="cancel" 
          buttonStyle={{paddingVertical:2 ,
          backgroundColor:COLORS.gray}}
          pressHandler={()=> setModalResult(false)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 5,
    backgroundColor: "#1e1e1fcc",
    justifyContent: "center",
    alignItems: "center",
  },
  boxCo: {
    backgroundColor: '#202124',
    width: "90%",
    maxWidth: 350,
    // height: "30%",
    // maxHeight: 210,
    borderRadius: SIZES.small,
  },
  header: {
    padding: SIZES.large,
    borderBottomColor:COLORS.white,
    borderBottomWidth:.4,
  },
  content: {
    padding: SIZES.large,
    paddingVertical:SIZES.xLarge + 2
  },
  bottom: {
    flexDirection:'row',
    justifyContent:'flex-end',
    gap:SIZES.small,
    padding: SIZES.large,
    borderTopColor:COLORS.white,
    borderTopWidth:.4,
  },
});
