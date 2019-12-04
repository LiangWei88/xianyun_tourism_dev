<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem :flight="item" v-for="(item, index) in dataList" :key="index" />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  data() {
    return {
      flightsData: {}, // 航班总数据
      dataList: [] // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
    };
  },

  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    // console.log(this.$route.query);
    // 对于路由,两种参数分别是 params 和 query
    // 对于 axios 两种参数分别是 data 和 params

    this.$axios({
      url: "/airs",
      //参数可以通过 this.$route.query
      // 这里面数据本来就是一个对象,所以无需自己拼接
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data;
      this.dataList = this.flightsData.flights;
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>