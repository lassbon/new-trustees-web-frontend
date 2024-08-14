import { combineReducers } from "redux";
import formSlice from "./formSlice";
import securitySlice from "./securitySlice";

const rootReducer = combineReducers({
  form: formSlice.reducer,
  security: securitySlice.reducer,
});

export default rootReducer;
