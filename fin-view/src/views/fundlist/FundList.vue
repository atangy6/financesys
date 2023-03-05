<template>
  <div class="funds-list">
    <!-- 添加按钮 -->
    <div>
      <el-form ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <div class="search">
          <el-form-item label="按照时间筛选：">
            <el-date-picker
              v-model="search_data.startTime"
              type="datetime"
              placeholder="选择开始时间"
            />
            --
            <el-date-picker
              v-model="search_data.endTime"
              type="datetime"
              placeholder="选择结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSearch"
              ><el-icon><Search /></el-icon>筛选</el-button
            >
          </el-form-item>
        </div>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            @click="handleAdd"
            v-if="user.identify == '超级管理员'"
            ><el-icon><Plus /></el-icon>添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table部分 -->
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" max-height="450" stripe>
        <el-table-column label="序号" width="70" prop="id"> </el-table-column>
        <el-table-column label="创建时间" width="250" prop="createtime">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" width="120" prop="type">
        </el-table-column>
        <el-table-column label="描述" width="130" prop="description">
        </el-table-column>
        <el-table-column label="收入" width="100" prop="income">
          <template #default="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="100" prop="expenditure">
          <template #default="scope">
            <span style="color: #f56767">{{ scope.row.expenditure }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户现金" width="150" prop="account">
          <template #default="scope">
            <span style="color: #4db3ff">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150" prop="remark">
        </el-table-column>

        <el-table-column
          label="操作"
          prop="operation"
          width="180"
          v-if="user.identify == '超级管理员'"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <el-icon><Edit /></el-icon>编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row>
        <el-col :span="24"
          ><div class="pagination">
            <el-pagination
              v-model:current-page="paginations.page_index"
              :page-size="paginations.page_size"
              :page-sizes="paginations.page_sizes"
              :layout="paginations.layout"
              :total="paginations.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            /></div
        ></el-col>
      </el-row>
    </div>

    <dialog-vue
      :dialog="dialog"
      @update="getProfile"
      :formData="formData"
    ></dialog-vue>
  </div>
</template>

<script setup>
import { Timer, Edit, Delete, Plus, Search } from "@element-plus/icons";
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import DialogVue from "@/components/Dialog.vue";
import { useStore } from "vuex";
const store = useStore();
const { proxy } = getCurrentInstance();

const user = computed(() => {
  return store.getters.user;
});

const search_data = ref({
  startTime: "",
  endTime: " ",
});
let filterTableData = ref([]);

const paginations = ref({
  page_index: 1, // 当前位于那页
  total: 0, // 总数
  page_size: 5, // 一页显示多少条
  page_sizes: [5, 10, 15, 20], // 每页显示多少条
  layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
});

let tableData = ref([]);
let allTableData = ref([]);
let dialog = ref({ show: false, title: "", option: "edit" });
const formData = ref({
  type: "",
  description: "",
  income: "",
  expenditure: "",
  account: "",
  remark: "",
  id: "",
});

const getProfile = () => {
  // 获取表格数据
  proxy.$axios
    .get("/funds/allFunds")
    .then((res) => {
      allTableData.value = res.data;
      filterTableData.value = res.data;
      // 设置分页数据
      setPaginations();
    })
    .catch((err) => {
      console.log(err);
    });
};
const setPaginations = () => {
  // 分页属性设置
  paginations.value.total = allTableData.value.length;
  paginations.value.page_index = 1;
  paginations.value.page_size = 5;
  // 设置默认的分页数据
  tableData.value = allTableData.value.filter((item, index) => {
    return index < paginations.value.page_size;
  });
};
const handleEdit = (index, row) => {
  // 编辑
  dialog.value = {
    show: true,
    title: "修改资金信息",
    option: "edit",
  };

  formData.value = {
    type: row.type,
    description: row.description,
    income: row.income,
    expenditure: row.expenditure,
    account: row.account,
    remark: row.expenditure,
    id: row.id,
  };
};

const handleDelete = (index, row) => {
  proxy.$axios.post(`/funds/delete/${row.id}`).then((res) => {
    proxy.$message("删除成功！");
    getProfile();
  });
};

const handleAdd = () => {
  // 添加
  dialog.value = {
    show: true,
    title: "添加资金信息",
    option: "add",
  };

  formData.value = {
    type: "",
    description: "",
    income: "",
    expenditure: "",
    account: "",
    remark: "",
    id: "",
  };
};

const handleSizeChange = (page_size) => {
  // 切换size
  paginations.value.page_index = 1;
  paginations.value.page_size = page_size;
  tableData.value = allTableData.value.filter((item, index) => {
    return index < page_size;
  });
};

const handleCurrentChange = (page) => {
  // 获取当前页
  let index = paginations.value.page_size * (page - 1);
  // 数据的总数
  let nums = paginations.value.page_size * page;
  // 容器
  let tables = ref([]);
  for (let i = index; i < nums; i++) {
    if (allTableData.value[i]) {
      tables.value.push(allTableData.value[i]);
    }

    tableData.value = tables.value;
  }
};

const handleSearch = () => {
  // 筛选
  // 如果任何一个时间为空 就不筛选
  if (!search_data.value.startTime || !search_data.value.endTime) {
    proxy.$message({
      type: "warning",
      message: "请选择时间区间",
    });
    getProfile();
    return;
  }

  const sTime = search_data.value.startTime.getTime();
  const eTime = search_data.value.endTime.getTime();

  allTableData.value = filterTableData.value.filter((item) => {
    let date = new Date(item.createtime);
    let time = date.getTime();
    return time >= sTime && time <= eTime;
  });

  // 分页数据
  setPaginations();
};
onMounted(() => {
  getProfile();
});
</script>

<style lang="less" scoped>
.funds-list {
  margin-left: 200px;
  padding: 16px;
  box-sizing: border-box;

  // 筛选部分
  .search {
    float: left;
    display: flex;
    .el-form-item {
      margin-right: 10px;
    }
  }

  .btnRight {
    float: right;
  }

  // 分页
  .pagination {
    float: right;
    margin-top: 10px;
  }
}
</style>
