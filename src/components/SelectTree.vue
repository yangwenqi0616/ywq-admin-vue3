<template>
  <div class="select-tree">
    <section v-if="title" class="select-tree-header">
      {{ title }}
    </section>
    <section class="select-tree-content" v-loading="loading">
      <div class="content select-tree-content-tree">
        <el-input
          placeholder="请输入员工工号或姓名"
          suffix-icon="el-icon-search"
          size="small"
          clearable
          v-model="filterText">
        </el-input>
        <el-scrollbar>
          <el-tree
            ref="treeRef"
            :data="data"
            :props="treeProps"
            show-checkbox
            node-key="code"
            highlight-current
            render-after-expand
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :default-expanded-keys="defaultExpanded"
            :default-checked-keys="defaultCheckedList"
            @check="handleCheckChange"
            :filter-node-method="filterNode"
          >
            <template #default="{ node }">
              <p class="tree-item">
                <span class="prefix" v-show="!node.isLeaf"><i class="iconfont el-icon-folder"></i></span>
                <span :class="{leaf: node.isLeaf}">{{ node.label }}</span>
              </p>
            </template>
          </el-tree>
        </el-scrollbar>
      </div>
      <div class="content select-tree-content-select">
        <div class="select-tree-content-select-head">
          <p>已选（{{ selectList.length }}人）</p>
          <el-button type="text" @click="setCheckedKeys()"><i class="el-icon-delete"></i></el-button>
        </div>
        <el-scrollbar>
          <ul>
            <li v-for="v in selectList" :key="v.code">
              <span>{{ v.name }}（{{ v.code }}）</span>
              <el-button type="text"
                         @click="setCheckedKeys(v)">
                <i class="iconfont el-icon-error"></i>
              </el-button>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch, defineProps, defineEmits, computed } from 'vue';
import { dataModel, smallModel } from './select-tree-data';
import { ElTree, ElMessage } from 'element-plus';

interface UserData {
  code: string;
  group: string;
  name: string;
  subs: UserData[];
}

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  treeProps: {
    type: Object,
    default() {
      return {
        value: 'code',
        label: 'name',
        children: 'subs'
      };
    }
  },
  defaultChecked: {
    type: Array,
    default() {
      return [];
    }
  }
});
const emit = defineEmits(['handleSelectionChange']);

// region 树结构
// 筛选
const filterText = ref('');
const filterNode = (value: string, data: UserData) => {
  if (!value) return true;
  return data.name.includes(value);
};
const data = ref<any[]>([]);
const treeRef = ref<InstanceType<typeof ElTree>>();
const { defaultChecked } = toRefs(props);
const defaultCheckedList = computed(() => {
  return defaultChecked?.value.map((v: any) => v.code);
}); // 默认选中项
const defaultExpanded = ref<string[]>([]); // 默认展开项
watch(filterText, (val) => {
  treeRef.value!.filter(val);
});
watch(defaultChecked, (val: any) => {
  selectList.value = val;
}, {
  deep: true
});
const handleCheckChange = () => {
  const nodes = treeRef.value!.getCheckedNodes(true, false) as any;
  selectList.value = nodes;
};
// endregion

// region 选中列表
const selectList = ref([]);
watch(selectList, (val) => {
  emit('handleSelectionChange', val);
}, {
  deep: true
});
/**
 * 用于操作已选列表时,联动树结构
 * @param {UserData} node - 删除的人员数据
 */
const setCheckedKeys = (node: UserData) => {
  if (node) {
    const index = selectList.value.indexOf(node as never);
    if (index > -1) {
      selectList.value.splice(index, 1);
    } else {
      ElMessage.warning('人员数据有误');
    }
  } else {
    selectList.value = [];
  }
  const keys = selectList.value.map((v: UserData) => v.code);
  treeRef.value!.setCheckedKeys(keys, false);
};
// endregion

/**
 * 用于获取员工树
 */
const loading = ref(false);
const getData = async () => {
  loading.value = true;
  try {
    // const result = await getUserTree({});
    // const result = dataModel;
    const result = smallModel;
    // 默认展开第一层
    defaultExpanded.value = result.map(v => v.code);
    data.value = result;
  } catch (e) {
    console.log(e);
  }
  loading.value = false;
};
getData();
</script>
<style lang="scss" scoped>
.select-tree {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-header {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #00244D;
    margin-bottom: 15px;

    &:before {
      content: '';
      display: inline-block;
      width: 2px;
      height: 10px;
      background: #0070FF;
      margin-right: 8px;
    }
  }

  &-content {
    width: 100%;
    height: 400px;
    display: flex;

    .content {
      width: 50%;
      flex: 0 0 50%;

      &:first-child {
        padding-right: 16px;
      }
    }

    &-tree {
      display: flex;
      flex-direction: column;
      height: 100%;

      .el-tree {
        height: 100%;
        margin-top: 16px;

        .tree-item {
          font-size: 14px;
          line-height: 22px;
          color: #00244D;

          .iconfont {
            color: #657B8B;
            margin-right: 5px;
          }
        }

        .el-tree-node.is-checked .leaf {
          font-weight: 600;
          //color: #0070FF;
        }

        //::v-deep {
        //  .el-tree-node {
        //    > .el-tree-node__children {
        //      overflow: visible;
        //    }
        //  }
        //}
      }
    }

    &-select {
      border-left: 1px solid #E5EAEC;
      display: flex;
      flex-direction: column;
      padding-left: 8px;

      &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        font-size: 16px;
        color: #00244D;
        padding: 0 16px;

        p:before {
          content: '';
          display: inline-block;
          width: 2px;
          height: 13px;
          background: #0070FF;
          margin-right: 8px;
        }
      }

      .el-icon-delete, .iconfont {
        font-size: 16px;
        color: #ADB1B3;
        font-weight: bold;

        &:hover {
          color: #0070FF;
        }

        &:active {
          color: #D1E5FF;
        }
      }

      li {
        width: 100%;
        height: 36px;
        border-radius: 4px;
        font-size: 14px;
        color: #657B8B;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;

        &:hover {
          background: #F2F4FA;
        }

        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
