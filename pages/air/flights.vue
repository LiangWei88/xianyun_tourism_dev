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
          <!-- total 是总数据量
          每页数据的长度应该是 page-size 属性-->
          <!-- 选择页数的时候触发的函数 current-change 函数可以接受到一个 val 值代表我们点击的页码 -->
          <!-- 这里 page-sizes 是我们可以选择的条目数量选项
          选择了一个以后,就会触发 size-change事件并且将选择的数量默认人传进去-->
          <el-pagination
            layout="sizes, prev, pager, next"
            :total="flightsData.flights.length"
            :page-size="pageSize"
            :page-sizes="[2,5,10,20]"
            @size-change="sizeChange"
            @current-change="changePageIndex"
          ></el-pagination>
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
      flightsData: {
        flights: []
      }, // 航班总数据
      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1,
      pageSize: 2
    };
  },

  components: {
    FlightsListHead,
    FlightsItem
  },
  methods: {
    changePageIndex(pageIndex) {
      this.pageIndex = pageIndex;
      this.loadPage();
    },
    loadPage() {
      var start = (this.pageIndex - 1) * this.pageSize; // 0
      var end = start + this.pageSize; // 10

      // 数组 slice 方法接受两个参数, 第一个是切割的开始(包括当前index), 第二个是切割的结束(不包过当前 index),
      this.dataList = this.flightsData.flights.slice(start, end);
    },
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadPage();
    }
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
      // 这里是分页, 我们需要拿到数据的开始index 和结尾的 index
      this.loadPage();
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