import { combineReducers } from "redux";
import formSlice from "./formSlice";

const rootReducer = combineReducers({
  form: formSlice.reducer,
});

export default rootReducer;
