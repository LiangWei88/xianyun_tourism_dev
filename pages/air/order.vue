<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">这里放侧边栏</div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";

export default {
  components: {
    OrderForm
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>