import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth";
import { credenciadosReducer } from "./credenciados";
import { eventosReducer } from "./eventos";

const appReducer = combineReducers({
  auth: authReducer,
  credenciados: credenciadosReducer,
  eventos: eventosReducer,
});

const rootReducer = (state, action) => {

  // console.log("action: ", action.type);

  if (action.type === "USER_LOGOUT") {
    Object.keys(state).forEach(key => {
        storage.removeItem(`persist:${key}`);
    });
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;