import { Module } from 'vuex';
import { RootState } from '../index';

const mutations = {
  ADD_VISITED_VIEW: (state: any, view: any) => {
    if (state.visitedViews.some((v: { path: any; }) => v.path === view.path)) return;
    const simpleView = {
      fullPath: view.fullPath,
      hash: view.hash,
      meta: view.meta,
      name: view.name,
      params: view.params,
      path: view.path,
      query: view.query
    };
    state.visitedViews.push(
        Object.assign({}, simpleView, {
          title: view.meta.title || 'no-name'
        })
    );
  },
  ADD_CACHED_VIEW: (state: any, view: any) => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },

  DEL_VISITED_VIEW: (state: any, view: any) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  DEL_CACHED_VIEW: (state: any, view: any) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },

  DEL_OTHERS_VISITED_VIEWS: (state: any, view: any) => {
    state.visitedViews = state.visitedViews.filter((v: { meta: { affix: any; }; path: any; }) => {
      return v.meta.affix || v.path === view.path;
    });
  },
  DEL_OTHERS_CACHED_VIEWS: (state: any, view: any) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = [];
    }
  },
  DEL_ALL_VISITED_VIEWS: (state: any) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter((tag: { meta: { affix: any; }; }) => tag.meta.affix);
    state.visitedViews = affixTags;
  },
  DEL_ALL_CACHED_VIEWS: (state: any) => {
    state.cachedViews = [];
  },
  UPDATE_VISITED_VIEW: (state: any, view: any) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
};

const actions = {
  addView({ dispatch }: any, view: any) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView({ commit }: any, view: any) {
    commit('ADD_VISITED_VIEW', view);
  },
  addCachedView({ commit }: any, view: any) {
    commit('ADD_CACHED_VIEW', view);
  },
  delView({ dispatch, state }: any, view: any) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view);
      dispatch('delCachedView', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delVisitedView({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view);
      resolve([...state.visitedViews]);
    });
  },
  delCachedView({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews]);
    });
  },
  delOthersViews({ dispatch, state }: any, view: any) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view);
      dispatch('delOthersCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delOthersVisitedViews({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.visitedViews]);
    });
  },
  delOthersCachedViews({ commit, state }: any, view: any) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...state.cachedViews]);
    });
  },
  delAllViews({ dispatch, state }: any, view: any) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view);
      dispatch('delAllCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delAllVisitedViews({ commit, state }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS');
      resolve([...state.visitedViews]);
    });
  },
  delAllCachedViews({ commit, state }: any) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS');
      resolve([...state.cachedViews]);
    });
  },
  updateVisitedView({ commit }: any, view: any) {
    const simpleView = {
      fullPath: view.fullPath,
      hash: view.hash,
      meta: view.meta,
      name: view.name,
      params: view.params,
      path: view.path,
      query: view.query
    };
    commit('UPDATE_VISITED_VIEW', simpleView);
  }
};
const tagsView: Module<TagsViewState, RootState> = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations,
  actions
};
type TagsViewState = {
  visitedViews: [],
  cachedViews: []
}
export default tagsView;
