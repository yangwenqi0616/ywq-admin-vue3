<template>
  <div class="theme-config">
    <el-card class="theme-config-display">
      夜间模式:
      <el-switch v-model="theme"/>
      <ThemePicker class="theme-config-display-picker"/>
    </el-card>
    <el-card class="theme-config-display">
      主题展示
      <div class="theme-config-display-block">
        <el-button type="primary">
          Primary
        </el-button>
        <el-button type="success">
          Success
        </el-button>
        <el-button type="info">
          Info
        </el-button>
        <el-button type="warning">
          Warning
        </el-button>
        <el-button type="danger">
          Danger
        </el-button>
      </div>
      <div class="theme-config-display-block">
        <el-button type="primary" icon="el-icon-edit"/>
        <el-button type="primary" icon="el-icon-share"/>
        <el-button type="primary" icon="el-icon-delete"/>
        <el-button type="primary" icon="el-icon-search">
          Search
        </el-button>
        <el-button type="primary">
          Upload
          <i class="el-icon-upload el-icon-right"/>
        </el-button>
      </div>
      <div class="theme-config-display-block">
        <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
          {{ tag.name }}
        </el-tag>
      </div>
      <div class="theme-config-display-block">
        <el-radio-group v-model="radio">
          <el-radio :label="1">
            Option A
          </el-radio>
          <el-radio :label="2">
            Option B
          </el-radio>
          <el-radio :label="3">
            Option C
          </el-radio>
        </el-radio-group>
      </div>
      <div class="theme-config-display-block">
        <el-slider v-model="slideValue"/>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { toggleClass } from "@/utils/common.ts";
import ThemePicker from "@/components/ThemePicker/index.vue";

export default {
  name: "ThemeConfig",
  components: {
    ThemePicker
  },
  data() {
    return {
      theme: false,
      tags: [
        {name: "Tag One", type: ""},
        {name: "Tag Two", type: "info"},
        {name: "Tag Three", type: "success"},
        {name: "Tag Four", type: "warning"},
        {name: "Tag Five", type: "danger"}
      ],
      slideValue: 50,
      radio: 1
    };
  },
  watch: {
    theme() {
      toggleClass(document.body, "custom-theme");
    }
  }
};
</script>

<style lang="scss" scoped>
.theme-config {
  &-display {
    font-size: 25px;
    margin: 10px;
    color: var(--mainColor);

    &-block {
      padding: 20px 30px;

      .tag-item {
        margin-right: 10px;
      }
    }

    ::v-deep &-picker {
      float: right !important;
    }
  }
}
</style>
