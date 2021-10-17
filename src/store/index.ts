import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import loginStore from "@/views/login/store";

export default createStore<RootState>({
  state: {
    user: undefined
  },
  mutations: {
    /**
     * 修改用户
     */
    changeUser(state, payload?: User) {
      state.user = payload;
    }
  },
  actions: {},
  modules: {
    loginStore
  },
  plugins: [createPersistedState({
    storage: sessionStorage,
    reducer(val) {
      const {...modules} = val;
      return modules;
    }
  })]
});

// 根store
export type RootState = {
  user?: User; // 当前登陆用户
};

// 用户信息
export type User = {
  username: string; //  账号
  name: string; // 用户姓名
  id: string; // 用户id
  photo: string; // 照片
  type: number;
  authorities: {
    authority: "ADMIN" | "USER"; // ADMIN 为管理员 USER 普通用户
  }[];
};
