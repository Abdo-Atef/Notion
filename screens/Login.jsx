import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { Formik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";

export default function Login({ navigation }) {
  let validationSchema = object({
    email: string().email("Email not valid").required("Email is required"),
    password: string().required("Password is required"),
  });

  let { loading } = useSelector((state) => state.user);
  const [Error, setError] = useState(null);
  let dispatch = useDispatch();

  const handleLogin = async (values) => {
    let result = await dispatch(login(values));
    console.log(result.payload);
    if (result.payload == 'auth/invalid-credential') {
      setError('Email or Password is not correct')
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.loginTitle}>Notion</Text>
      </View>
      <View
        style={{
          width: "80%",
          marginTop: SIZES.xLarge,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleLogin(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ marginTop: SIZES.small }}>
              <CustomTextInput
                placeholder="Enter The Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                borderColor={
                  errors.email && touched.email ? "red" : COLORS.gold
                }
                keyboardType='email-address'
              />
              {errors.email && touched.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}
              <CustomTextInput
                placeholder="Enter The Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                borderColor={
                  errors.password && touched.password ? "red" : COLORS.gold
                }
                secureTextEntry={true}
              />
              {errors.password && touched.password && (
                <Text style={styles.textError}>{errors.password}</Text>
              )}
              {Error ? (
                <View>
                  <Text
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    Email or password is not correct
                  </Text>
                </View>
              ) : (
                ""
              )}
              <View style={{ marginTop: SIZES.xLarge + 20 }}>
                {loading ? (
                  <CustomButton icon={true} />
                ) : (
                  <CustomButton title="Login" pressHandler={handleSubmit} />
                )}
              </View>
            </View>
          )}
        </Formik>
        <View style={{ marginVertical: SIZES.small + 3 }}>
          <Text style={styles.altText}>Don't Have An Account?</Text>
        </View>
        <View>
          <CustomButton
            title="Sign Up"
            pressHandler={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
  },
  loginTitle: {
    color: COLORS.gold,
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 22,
    letterSpacing: 2,
  },
  altText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
  },
  textError: {
    color: "red",
    fontSize: SIZES.medium,
    marginTop: SIZES.small - 5,
    marginBottom: SIZES.small - 2,
    paddingLeft: 3,
  },
});
