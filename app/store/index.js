import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";

const persistConfig = {
  key: 'root',
  storage,
}

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  applyMiddleware(thunk)
);
export const persistor = persistStore(store);