<template>
  <div class="main-page">
    <div class="main-page-bgColor"></div>
    <div class="main-page-inner">
      <div class="main-page-inner-btn">
        <el-button v-permission="'map'" @click="openTree">树选择器</el-button>
      </div>
      <el-table-pagination
        :columns="columns"
        v-loading="loading"
        element-loading-text="加载中"
        ref="table"
        align="center"
        :pageParams="pageParams"
        :reserveSelection="true"
        @handleSelectionChange="handleSelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #operate>
          <el-table-column
            label="操作"
            align="center"
            width="160"
          >
            <template v-slot="scope">
              <el-button size="small">删除{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
        </template>
      </el-table-pagination>
    </div>
    <!--    region 树选择器弹框-->
    <el-dialog
      v-model="selectTreeDialogVisible"
      destroy-on-close
      title="树选择器"
      width="700px"
    >
      <SelectTree
        title="角色名：系统管理员"
        :defaultChecked="defaultChecked"
        @handleSelectionChange="selectionChange" />
      <template #footer>
        <span>
          <el-button size="small" type="primary" @click="confirmSelect">确定</el-button>
          <el-button size="small" @click="selectTreeDialogVisible=false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <!--    endregion-->
  </div>
</template>
<script lang="ts">
export default {
  name: 'Dashboard'
};
</script>
<script lang="ts" setup>
import ElTablePagination from '@/components/ElTablePagination.vue';
import SelectTree from '@/components/SelectTree.vue';
import { ref, onMounted, getCurrentInstance, computed, nextTick } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const permissionList = computed(() => {
  return store.state.loginStore.permissionList;
});
console.log('permissionList:', permissionList.value);
const { proxy } = getCurrentInstance();
const loading = ref(false);
let selection = ref([]);
const pageParams = ref({
  currentPage: 1,
  pageSize: 10,
  pageTotal: 0,
  tableData: []
});
const handleSelectionChange = (rows: any) => {
  selection = rows;
};
const handleSizeChange = (val: number) => {
  pageParams.value.currentPage = 1;
  pageParams.value.pageSize = val;
  getData();
};
const handleCurrentChange = (val: number) => {
  pageParams.value.currentPage = val;
  getData();
};
const getData = async () => {
  const request = () => new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {
          name: 'ywq',
          sex: '男',
          age: '18',
          university: '大学',
          education: '本科'
        },
        {
          name: '小工',
          sex: '男',
          age: '18',
          university: '大学',
          education: '本科'
        },
        {
          name: '小红',
          sex: '女',
          age: '18',
          university: '大学',
          education: '本科'
        },
        {
          name: '小军',
          sex: '男',
          age: '26',
          university: '',
          education: '本科'
        }
      ]);
    }, 1000);
  });
  loading.value = true;
  const data = await request() as any;
  loading.value = false;
  pageParams.value.tableData = data;
  pageParams.value.pageTotal = 30;
};
const columns = [
  { width: '', label: '姓名', prop: 'name' },
  { width: '', label: '性别', prop: 'sex' },
  { width: '', label: '年龄', prop: 'age' },
  { width: '', label: '毕业学校', prop: 'university' },
  { width: '', label: '学历', prop: 'education' },
  {
    width: '',
    type: 'slot',
    label: '操作',
    slotName: 'operate'
  }
];

// region 树选择器
const selectTreeDialogVisible = ref(false);
const defaultChecked = ref([]);
const openTree = async () => {
  selectTreeDialogVisible.value = true;
  const records = [
    {
      'group': 'emp',
      'code': 'JZ007494',
      'name': '韦汉翎',
      'subs': null
    },
    {
      'group': 'emp',
      'code': 'JZ000449',
      'name': '王树林',
      'subs': null
    }
  ];
  nextTick(() => {
    defaultChecked.value = records;
  });
};
const selectionChange = (roles) => {
  console.log(roles);
};
const confirmSelect = async () => {
  selectTreeDialogVisible.value = false;
  await getData();
};
// endregion

onMounted(() => {
  getData();
  console.log(proxy.getLocalKeys(), 33);
});
</script>
<style lang="scss" scoped>
.main-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("~@/assets/bk_2.jpg") 0 -95px no-repeat;
  background-size: cover;

  &-bgColor {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(47, 65, 86, .7);
  }

  &-inner {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;

    &-btn {
      text-align: right;
      margin-bottom: 16px;
    }
  }
}
</style>
