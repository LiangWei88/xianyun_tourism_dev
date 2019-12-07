<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" @changeForm="setAside" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="infoData" :asideData="asideData" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";

export default {
  data() {
    return {
      infoData: {
        seat_infos: {}
      },
      asideData: {
        numUsers: 0,
        allPrice: 0
      }
    };
  },
  components: {
    OrderForm,
    OrderAside
  },
  methods: {
    setAside(asideData) {
      console.log("价格被改变了");
      // 将受到的 表单子组件传过来的价格存到本身的data 当中
      this.asideData = asideData;
    }
  },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: "/airs/" + query.id,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(res => {
      this.infoData = res.data;
    });
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