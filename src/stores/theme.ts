import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// options 写法
// interface State {
//   themeColor: string;
// }
//
// export const useThemeStore = defineStore('theme', {
//   state: (): State => ({
//     themeColor: '#006600'
//   }),
//   getters: {},
//   actions: {
//     // 没有作为第一个参数的上下文，用 `this` 代替
//     changeTheme(color: string) {
//       this.themeColor = color;
//     },
//     // easily reset state using `$reset`
//     clearUser() {
//       this.$reset();
//     }
//   },
//   persist: {
//     enabled: true,
//     // 数据默认是存在sessionStorage里，需要修改的话如下：
//     strategies: [
//       {
//         key: 'piniaStore', // 设置存储的key
//         storage: localStorage, // 表示存储在localStorage
//         paths: ['themeColor'] // 指定要长久化的字段,默认所有 state 都会进行缓存,如果你不想所有的数据都持久化存储，那么可以通过 paths 指定要长久化的字段，其余的字段则不会进行长久化，
//       }
//     ]
//   }
// });

// setup 写法
// ref()成为state属性，computed()变成getters,function变成actions
export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeColor = ref('#006600');
    const changeTheme = (color: string) => {
      themeColor.value = color;
    };
    return { themeColor, changeTheme };
  },
  {
    persist: {
      enabled: true,
      // 数据默认是存在sessionStorage里，需要修改的话如下：
      strategies: [
        {
          key: 'piniaStore', // 设置存储的key
          storage: localStorage, // 表示存储在localStorage
          paths: ['themeColor'] // 指定要长久化的字段,默认所有 state 都会进行缓存,如果你不想所有的数据都持久化存储，那么可以通过 paths 指定要长久化的字段，其余的字段则不会进行长久化，
        }
      ]
    }
  }
);
