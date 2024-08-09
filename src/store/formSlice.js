import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",

  initialState: {
    formPersistedValues: {},
  },

  reducers: {
    updateFormField(currentState, actions) {
      const { name, value } = actions.payload;

      console.log(actions.payload, "stoe");

      // Check if the key (field name) exists in formPersistedValues
      if (currentState.formPersistedValues.hasOwnProperty(name)) {
        // Update the value if the key exists
        currentState.formPersistedValues[name] = value;
      } else {
        // Add the key-value pair if the key does not exist
        currentState.formPersistedValues = {
          ...currentState.formPersistedValues,
          [name]: value,
        };
      }
    },

    clearFormField(currentState) {
      currentState.formPersistedValues = {};
    },
  },
});

export const formSliceAction = formSlice.actions;

export default formSlice;
