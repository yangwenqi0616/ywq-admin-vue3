<template>
  <template v-for="(item, index) in columns">
    <el-table-column
      v-if="!item.hidden && item.type !== 'slot'"
      :key="index + item.label"
      :prop="item.prop"
      :label="item.label"
      :align="item.align || align"
      :render-header="item.renderHeader"
      :min-width="item.minWidth"
      :width="item.width"
      show-overflow-tooltip
    >
      <template v-if="item.children">
        <!--        占位,去掉该注释,子表头不渲染-->
        <TableColumn :columns="item.children" :align="align">
          <template v-for="slot in Object.keys(customSlots)" #[slot]="scope">
            <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </template>
      <template v-if="!item.children" v-slot="scope">
        <span>{{
          scope.row[item.prop] || (scope.row[item.prop] === 0 ? 0 : '-')
        }}</span>
      </template>
    </el-table-column>
    <slot v-else-if="item.type === 'slot'" :name="item.slotName" />
  </template>
</template>
<script>
import { reactive, getCurrentInstance } from 'vue';

export default {
  name: 'TableColumn',
  props: {
    columns: Array,
    align: {
      default: 'center'
    }
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const customSlots = reactive({
      ...proxy.$slots
    });
    return {
      customSlots
    };
  }
};
</script>
