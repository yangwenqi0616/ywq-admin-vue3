import store from '@/store';
import { DirectiveBinding } from 'vue';

export const directive = (Vue: any) => {
  /**
   * 自定义权限指令,用于显隐权限点
   * @param {HTMLElement} el - 权限元素
   * @param {DirectiveBinding} binding
   */
  Vue.directive('permission', (el: HTMLElement, binding: DirectiveBinding) => {
        const { value } = binding;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const permissionList = store.state.loginStore.permissionList;
        if (permissionList.length > 0) {
          if (value && value.length > 0) {
            const hasPermission = permissionList.includes(value);
            if (!hasPermission) {
              el.style.display = 'none';
            }
          } else {
            el.style.display = 'none';
          }
        }
      }
  );
};
