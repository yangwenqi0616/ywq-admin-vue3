<template>
  <div class="main-page">
    <el-table-pagination
      :columns="columns"
      v-loading="loading"
      element-loading-text="加载中"
      ref="table"
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
            <el-button>删除{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
      </template>
    </el-table-pagination>
  </div>
</template>
<script lang="ts">
export default {
  name: "Dashboard"
};
</script>
<script lang="ts" setup>
import ElTablePagination from "@/components/ElTablePagination.vue";
import { ref, onMounted, getCurrentInstance } from "vue";

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
          name: "ywq",
          sex: "男",
          age: "18",
          university: "大学",
          education: "本科"
        },
        {
          name: "小工",
          sex: "男",
          age: "18",
          university: "大学",
          education: "本科"
        },
        {
          name: "小红",
          sex: "女",
          age: "18",
          university: "大学",
          education: "本科"
        },
        {
          name: "小军",
          sex: "男",
          age: "26",
          university: "",
          education: "本科"
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
  { width: "", label: "姓名", prop: "name" },
  { width: "", label: "性别", prop: "sex" },
  { width: "", label: "年龄", prop: "age" },
  { width: "", label: "毕业学校", prop: "university" },
  { width: "", label: "学历", prop: "education" },
  {
    width: "",
    type: "slot",
    label: "操作",
    slotName: "operate"
  }
];
onMounted(() => {
  getData();
  console.log(proxy.getLocalKeys(), 33);
});
</script>
<style lang="scss" scoped>
.main-page {
  width: 100%;
  height: 100%;
  background: url("~@/assets/bk_2.jpg") 0 -95px no-repeat;
  background-size: cover;
}
</style>
