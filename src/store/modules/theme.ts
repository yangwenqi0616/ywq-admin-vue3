import { Module } from "vuex";
import { RootState } from "../index";

const mutations = {
  CHANGE_THEME: (state: any, color: string) => {
    state.themeColor = color;
  }
};

const actions = {
  changeTheme({commit}: any, color: string) {
    commit("CHANGE_THEME", color);
  }
};

const theme: Module<ThemeState, RootState> = {
  namespaced: true,
  state: {
    themeColor: "#409EFF"
  },
  mutations,
  actions
};

type ThemeState = {
  themeColor: string,
}

export default theme;
