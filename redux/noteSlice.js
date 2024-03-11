import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../constants/firebase_config";
import { getAuth } from "firebase/auth";

export const getNotes = createAsyncThunk("notes/getNotes", async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const colRef = query(
      collection(db, "notes"),
      where("creator", "==", user.uid)
    );
    const querySnapshot = await getDocs(colRef);
    const newData = [];
    querySnapshot.forEach((doc) => {
      newData.push({ id: doc.id, ...doc.data() });
    });
    return newData;
  } catch (error) {
    console.log(error);
  }
});
export const addNote = createAsyncThunk("notes/addNote", async (params) => {
  const colRef = collection(db, "notes");
  const auth = getAuth();
  const user = auth.currentUser;
  let uid = user.uid;
  // console.log(uid);
  try {
    await addDoc(colRef, {
      title: params.title,
      content: params.content,
      creator: uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
});
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (params) => {
    const docRef = doc(db, "notes", params.id);
    try {
      updateDoc(docRef, {
        title: params.title,
        content: params.content,
      });
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  const docRef = doc(db, "notes", id);
  try {
    deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  notes: [],
  loading: false,
};

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    // get Notes
    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.loading = false;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      state.loading = false;
    });
    // add Note
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addNote.rejected, (state, action) => {
      state.loading = false;
    });
    // update Note
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
    });
    // delete Note
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default NoteSlice.reducer;
