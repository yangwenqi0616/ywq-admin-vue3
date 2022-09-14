<template>
  <div class="el-table-pagination-wrapper">
    <el-scrollbar>
      <el-table
        :data="tableParams.tableData"
        ref="innerTable"
        :row-key="getRowKeys"
        :cell-style="{
          height: '40px',
          color: '#00244D'
        }"
        header-cell-class-name="table-header-cell"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="selection"
          :reserve-selection="reserveSelection"
          type="selection"
          width="55"
        >
        </el-table-column>
        <template v-for="(item, index) in columns">
          <el-table-column
            v-if="!item.hidden && item.type !== 'slot'"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align || align"
            :render-header="item.renderHeader"
            :min-width="item.minWidth"
            :width="item.width"
            show-overflow-tooltip
          >
            <template v-slot="scope">
              <span>{{ String(scope.row[item.prop]) || '-' }}</span>
            </template>
          </el-table-column>
          <slot v-else-if="item.type === 'slot'" :name="item.slotName" />
        </template>
        <template #empty>
          <div class="">暂无数据</div>
        </template>
      </el-table>
    </el-scrollbar>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      background
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      :total="tableParams.pageTotal"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  columns: Array,
  pageParams: {
    default: {}
  },
  selection: {
    default: true
  },
  reserveSelection: {
    default: false
  },
  align: {
    default: 'center'
  }
});
const tableParams = ref<any>({});
const currentPage = ref(1);
const pageSize = ref(10);

const emit = defineEmits(['handleSelectionChange', 'handleSizeChange', 'handleCurrentChange']);

watch(
  props.pageParams,
  value => {
    tableParams.value = Object.assign({}, value);
    currentPage.value = tableParams.value.currentPage;
    pageSize.value = tableParams.value.pageSize;
  },
  {
    immediate: true,
    deep: true
  }
);

const handleSelectionChange = (row: any) => {
  emit('handleSelectionChange', row);
};
const handleSizeChange = (val: number) => {
  emit('handleSizeChange', val);
};
const handleCurrentChange = (val: number) => {
  emit('handleCurrentChange', val);
};

const getRowKeys = (row: any) => {
  if (row.id) {
    return row.id;
  }
};
</script>

<style lang="scss" scoped>
.el-table-pagination-wrapper {
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;

  .el-table {
    background: transparent;
    border: 1px solid #eee;
    border-bottom: none;

    ::v-deep {
      .el-table__cell {
        padding: 0;
      }

      .table-header-cell {
        background: #F7F8FB;
        height: 40px;
        color: #657B8B;
      }
    }
  }

  .el-pagination {
    padding: 12px 0;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    flex: 0 0 52px;
  }
}
</style>
