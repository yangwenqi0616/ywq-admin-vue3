<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        class="tags-view-item no-select"
        v-for="(tag,i) in visitedViews"
        :ref="el => { if (el) tags[i] = el }"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent="openMenu(tag,$event)">
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li v-if="isActive(selectedTag)" @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane';
import { mapState, useStore } from 'vuex';
import path from 'path';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch, nextTick } from 'vue';

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const scrollPane = ref(null);
    const tags = ref([]);
    const addTags = () => {
      const { name } = route;
      if (name) {
        store.dispatch('tagsView/addView', route);
      }
    };
    const moveToCurrentTag = () => {
      nextTick(() => {
        for (const tag of tags.value) {
          if (tag.to.path === route.path) {
            scrollPane.value.moveToTarget(tag);
            if (tag.to.fullPath !== route.fullPath) {
              store.dispatch('tagsView/updateVisitedView', route);
            }
            break;
          }
        }
      });
    };
    watch(
      () => route.path,
      () => {
        addTags();
        moveToCurrentTag();
      }
    );
    return {
      routes: router.getRoutes(),
      scrollPane,
      tags
    };
  },
  computed: {
    ...mapState({
      visitedViews: state => state.tagsView.visitedViews
    }),
    isAffix() {
      return tag => tag?.meta?.affix;
    },
    isActive() {
      return route => route.path === this.$route.path;
    },
    filterAffixTags() {
      return (routes = this.routes, basePath = '/') => {
        let tags = [];
        routes.forEach(route => {
          if (route?.meta.affix) {
            const tagPath = path.resolve(basePath, route.path);
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: route.meta
            });
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path);
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags];
            }
          }
        });
        return tags;
      };
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    }
  },
  mounted() {
    this.initTags();
  },
  methods: {
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes);
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag);
        }
      }
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        this.$nextTick(() => {
          this.$router.replace({
            path: '/refresh'
          });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag);
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        this.$router.push('/');
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      let left = e.clientX, top = e.clientY;
      if (innerWidth - left < menuMinWidth) {
        left = innerWidth - menuMinWidth;
      }
      this.top = top + 14;
      this.left = left;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handleScroll() {
      this.closeMenu();
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 35px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  background: url("~@/assets/bk_2.jpg") 0 -39px no-repeat;
  background-size: cover;

  .tags-view-wrapper {
    display: flex;
    align-items: center;

    .tags-view-item {
      display: inline-block;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      border: 1px solid #d8dce5;
      color: #fff;
      background: rgba(47, 65, 86, .7);
      padding: 0 8px;
      font-size: 15px;
      margin-left: 5px;
      margin-top: 4px;
      border-radius: 5px;

      &:first-of-type {
        margin-left: 15px;
      }

      &.active {
        background-color: #c9d7e1fc;
        color: #304156;

        &::before {
          content: '';
          background: #304156;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }

      .el-icon-close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -1px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
