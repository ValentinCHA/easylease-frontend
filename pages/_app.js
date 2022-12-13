import "../styles/globals.css";
import Head from "next/head";

// redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import contrat from "../reducers/contrat";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const reducers = combineReducers({ user, contrat });
const persistConfig = {
  key: "easyLease75",
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>EasyLease</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
