import { configureStore } from "@reduxjs/toolkit";
import game from "~/store/game";
import modal from "~/store/modal";
import auth from "~/store/auth";
import app from "~/store/app";

const store = configureStore({
  reducer: {
    game,
    modal,
    auth,
    app,
  },
  devTools: false,
});

export default store;
