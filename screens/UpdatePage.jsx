import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import SecondryHeader from "../components/SecondryHeader";
import CustomTextInput from "../components/CustomTextInput";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, updateNote } from "../redux/noteSlice";

export default function UpdatePage({ navigation, route }) {
  let dispatch = useDispatch();
  const { loading } = useSelector((state) => state.notes);
  let data = route.params.data;
  let validationSchema = object({
    title: string().required("title is required"),
    content: string().required("content is required"),
  });

  const HandleSubmit = async (values, { resetForm }) => {
    const params = {
      id: data.id,
      title: values.title,
      content: values.content,
    };
    await dispatch(updateNote(params));
    await dispatch(getNotes());
    navigation.goBack();
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <SecondryHeader title={"Update Note"} />
      <Formik
        initialValues={{ title: data.title, content: data.content }}
        onSubmit={(values, { resetForm }) =>
          HandleSubmit(values, { resetForm })
        }
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          resetForm,
        }) => (
          <React.Fragment>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Title:</Text>
                <CustomTextInput
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  // defaultValue = {data.title}
                  value={values.title}
                  borderColor={
                    errors.title && touched.title ? "red" : COLORS.gold
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Content:</Text>
                <CustomTextInput
                  multiline={true}
                  numberOfLines={8}
                  onChangeText={handleChange("content")}
                  onBlur={handleBlur("content")}
                  value={values.content}
                  borderColor={
                    errors.content && touched.content ? "red" : COLORS.gold
                  }
                />
              </View>
              {loading ? (
                <CustomButton icon={true} buttonStyle={{ width: "90%", marginTop: SIZES.small }} />
              ) : (
                <CustomButton
                  title={"Update"}
                  buttonStyle={{ width: "90%", marginTop: SIZES.small }}
                  pressHandler={handleSubmit}
                />
              )}
            </View>
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: SIZES.xLarge + 20,
  },
  inputContainer: {
    width: "90%",
    marginVertical: SIZES.small,
  },
  inputTitle: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: SIZES.large - 1,
    marginLeft: 2,
  },
});
