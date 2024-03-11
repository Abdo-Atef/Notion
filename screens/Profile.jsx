import { View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../constants/firebase_config";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import CustomButton from "../components/CustomButton";
import { getUserData } from "../redux/userSlice";
import WarningMsg from "../components/WarningMsg";

export default function Profile() {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  const [exitModal, setexitModal] = useState(false);
  // console.log(userData);
  async function logout() {
    signOut(auth);
  }

  const setModalResult = async (result) => {
    if (result) {
      await signOut(auth);
      setexitModal(false)
    }
    else{
      setexitModal(false)
    }
  }

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {exitModal && 
      <WarningMsg
      title={'Sign out'} 
      content={'Are you sure you want to Sign out?'} 
      setModalResult={setModalResult}
      /> }
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile Info</Text>
      </View>
      {userData ? (
        <View style={{ margin: SIZES.small, padding: SIZES.small }}>
          <View style={styles.lineStyle}>
            <Text style={styles.textStyle}>Name : </Text>
            <TextInput
              style={styles.inputStyle}
              defaultValue={userData?.userName}
              editable={false}
            />
          </View>
          <View style={styles.lineStyle}>
            <Text style={styles.textStyle}>Email : </Text>
            <TextInput
              style={styles.inputStyle}
              defaultValue={userData?.email}
              editable={false}
            />
          </View>
          <View style={styles.lineStyle}>
            <Text style={styles.textStyle}>Phone : </Text>
            <TextInput
              style={styles.inputStyle}
              defaultValue={userData?.phone}
              editable={false}
            />
          </View>
          <View style={styles.lineStyle}>
            <Text style={styles.textStyle}>Age : </Text>
            <TextInput
              style={styles.inputStyle}
              defaultValue={userData?.age}
              editable={false}
            />
          </View>
        </View>
      ) : (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator color={COLORS.gold} size={SIZES.xLarge + 10} style={{bottom: 50}}/>
        </View>
      )}

      <View style={styles.button}>
        <CustomButton
          title={"Sign out"}
          buttonStyle={{ backgroundColor: COLORS.gold }}
          pressHandler={setexitModal}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  headerContainer: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 0.5,
    paddingVertical: SIZES.small,
  },
  headerText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.gold,
    fontSize: SIZES.xLarge + 3,
    textAlign: "center",
  },
  lineStyle: {
    flexDirection: "row",
    marginVertical: SIZES.large,
    gap: SIZES.small,
    alignItems: "center",
  },
  textStyle: {
    color: COLORS.gray,
    fontSize: SIZES.large,
    flexBasis: "18%",
  },
  inputStyle: {
    color: COLORS.gray,
    fontSize: SIZES.large,
    backgroundColor: "#131212",
    borderColor: COLORS.white,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    paddingLeft: SIZES.medium,
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: SIZES.xLarge + 5,
    left: SIZES.large,
    right: SIZES.large,
  },
});
