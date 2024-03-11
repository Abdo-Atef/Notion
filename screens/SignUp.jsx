import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { Formik } from "formik";
import { number, object, string } from "yup";
import { createUserData, signUp } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignUp({ navigation }) {
  let validationSchema = object({
    userName: string().required("Name is required"),
    email: string().email("Email not valid").required("Email is required"),
    password: string().required("Password is required"),
    age: string().matches('^[0-9]{0,3}$','Not valid age').required("Age is required"),
    phone: string().matches('^01[0-2][0-9]{8}$','Not valid phone').required("Phone is required"),
  });

  let { loading } = useSelector((state) => state.user);
  const [Status, setStatus] = useState(null);
  let dispatch = useDispatch();

  async function handleSignUp(values) {
    let result = await dispatch(signUp(values));
    if (result.payload._tokenResponse) {
      let userData = {
        userName : values.userName,
        email: (values.email).toLowerCase(),
        age: values.age,
        phone: values.phone,
      }
      await dispatch(createUserData(userData));
      setStatus("success");
    } else {
      setStatus(result.payload);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: SIZES.xLarge,
        }}
      >
        <View>
          <Text style={styles.signUpTitle}>Create New Account</Text>
        </View>
        <View
          style={{
            width: "80%",
            marginTop: SIZES.xLarge,
          }}
        >
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              phone: "",
              age: "",
            }}
            onSubmit={(values) => handleSignUp(values)}
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
                  placeholder="Enter The Name"
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                  borderColor={
                    errors.userName && touched.userName ? "red" : COLORS.gold
                  }
                />
                {errors.userName && touched.userName && (
                  <Text style={styles.textError}>{errors.userName}</Text>
                )}
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
                <CustomTextInput
                  placeholder="Enter The Phone"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  borderColor={
                    errors.phone && touched.phone ? "red" : COLORS.gold
                  }
                  keyboardType="phone-pad"
                />
                {errors.phone && touched.phone && (
                  <Text style={styles.textError}>{errors.phone}</Text>
                )}
                <CustomTextInput
                  placeholder="Enter The Age"
                  onChangeText={handleChange("age")}
                  onBlur={handleBlur("age")}
                  value={values.age}
                  borderColor={errors.age && touched.age ? "red" : COLORS.gold}
                  keyboardType="number-pad"
                />
                {errors.age && touched.age && (
                  <Text style={styles.textError}>{errors.age}</Text>
                )}

                {Status == "success" ? (
                  <View>
                    <Text
                      style={{
                        color: "green",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      Account created successfully
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      {Status}
                    </Text>
                  </View>
                )}

                <View style={{ marginTop: SIZES.xLarge + 10 }}>
                  {loading ? (
                    <CustomButton icon={true} />
                  ) : (
                    <CustomButton title="Sign Up" pressHandler={handleSubmit} />
                  )}
                </View>
              </View>
            )}
          </Formik>
          <View style={{ marginVertical: SIZES.small + 3 }}>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.semiBold,
                textAlign: "center",
              }}
            >
              You Have An Account Already?
            </Text>
          </View>
          <View>
            <CustomButton
              title="Login"
              pressHandler={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ScrollView>
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
  signUpTitle: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
  },
  textError: {
    color: "red",
    fontSize: SIZES.medium,
    marginTop: SIZES.small - 5,
    marginBottom: SIZES.small - 2,
    paddingLeft: 3,
  },
});
