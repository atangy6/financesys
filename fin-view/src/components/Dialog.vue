<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" v-model="dialog.show">
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          labe-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item label="收支类型:" prop="type" label-width="140px">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(formtype, index) in form_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop="description"
            label="收支描述:"
            label-width="140px"
          >
            <el-input
              type="description"
              v-model="formData.description"
            ></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:" label-width="140px">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>

          <el-form-item prop="expenditure" label="支出:" label-width="140px">
            <el-input
              type="expenditure"
              v-model="formData.expenditure"
            ></el-input>
          </el-form-item>

          <el-form-item prop="account" label="账户现金:" label-width="140px">
            <el-input type="account" v-model="formData.account"></el-input>
          </el-form-item>

          <el-form-item prop="remark" label="备注:" label-width="140px">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right" label-width="140px">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit(form)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, defineEmits } from "vue";
const { proxy } = getCurrentInstance();
const emits = defineEmits(["sendMsg"]);
const props = defineProps({
  dialog: Object,
  formData: Object,
});

const form = ref(null);

const form_type_list = ref([
  "提现",
  "提现手续费",
  "充值",
  "优惠券",
  "充值礼券",
  "转账",
]);

const form_rules = reactive({
  description: [
    { required: true, message: "收支描述不能为空", trigger: "blur" },
  ],
  income: [{ required: true, message: "收支不能为空!", trigger: "blur" }],
  expenditure: [{ required: true, message: "支出不能为空!", trigger: "blur" }],
  account: [{ required: true, message: "账户金额不能为空!", trigger: "blur" }],
  type: [{ required: true, message: "收支类型不能为空!", trigger: "blur" }],
});

const onSubmit = (form) => {
  form.validate((valid) => {
    if (valid) {
      const url =
        props.dialog.option == "add" ? "add" : `edit/${props.formData.id}`;
      proxy.$axios.post(`/funds/${url}`, props.formData).then((res) => {
        // 编辑成功
        if (props.dialog.option == "edit") {
          proxy.$message({ message: "数据更新成功", type: "success" });
        } else {
          // 添加成功
          proxy.$message({ message: "数据添加成功", type: "success" });
        }
        // 隐藏dialog
        props.dialog.show = false;
        // 数据添加后 需要自己刷新 显然不合理
        // this.$emits('update') vue3 setup语法糖不是这样写
        emits("update");
      });
    }
  });
};
</script>

<style lang="less" scoped></style>
