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
        <TableColumn :columns="columns" :align="align">
          <template v-for="slot in Object.keys(customSlots)" #[slot]="scope">
            <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
        <template #empty>
          <div class="empty">
            <img src="@/assets/no_data.png" alt="">
            <div class="">暂无数据</div>
          </div>
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
import { ref, reactive, watch, defineProps, defineEmits, getCurrentInstance } from 'vue';
import TableColumn from './TableColumn.vue';

const { proxy } = getCurrentInstance();
const customSlots = reactive({
  ...proxy.$slots
});

const props = defineProps({
  columns: Array,
  pageParams: {
    default: {}
  },
  selection: {
    default: false
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

    .empty {
      font-size: 12px;
      color: #657B8B;
      margin-top: 20px;

      img {
        width: 61.02px;
        height: 76px;
      }
    }

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

    // 滚动条的宽度
    ::v-deep {
      .el-table__body-wrapper::-webkit-scrollbar {
        width: 6px; // 横向滚动条
        height: 6px; // 纵向滚动条 必写
      }

      .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 3px;

        &:hover {
          background-color: #ccc;
        }
      }

      .el-table__fixed-right {
        height: 100% !important;
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
