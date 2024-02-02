import store from "~/store";
import { _setTheme } from "~/store/app";

export const setTheme = (data) => store.dispatch(_setTheme(data));
