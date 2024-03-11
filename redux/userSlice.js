import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../constants/firebase_config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const login = createAsyncThunk("user/login", async (params) => {
  try {
    let response = await signInWithEmailAndPassword(
      auth,
      params.email,
      params.password
    );
    return response;
  } catch (error) {
    // console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorCode;
  }
});
export const signUp = createAsyncThunk("user/signUp", async (params) => {
  try {
    let response = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password
    );
    return response;
  } catch (error) {
    // console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorCode;
  }
});
export const createUserData = createAsyncThunk(
  "user/createUserData",
  async (params) => {
    let colRef = collection(db, "users");

    try {
      let response = await addDoc(colRef, params);
      return response;
    } catch (error) {
      // console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode;
    }
  }
);
export const getUserData = createAsyncThunk("user/getUserData", async () => {
  let auth = getAuth();
  let user = auth.currentUser;
  let colRef = query(collection(db, "users"), where("email", "==", user.email));
  try {
    let result ;
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc) => {
      console.log('result', doc.data());
      result = doc.data();
    });
    return result
  } catch (error) {
    // console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorCode;
  }
});

const initialState = {
  userData: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
    // sign Up
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });
    // createUserData
    builder.addCase(createUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserData.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createUserData.rejected, (state) => {
      state.loading = false;
    });
    // getUserData
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload
      state.loading = false;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
