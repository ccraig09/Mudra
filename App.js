import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Providers from "./navigation";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
// import orderReducer from "./store/orders";
import cartReducer from "./store/cartReducer";


const rootReducer = combineReducers({
  cart: cartReducer,
  // orders: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  return (
    <Provider store={store}>
      <Providers />
    </Provider>
  );
}
