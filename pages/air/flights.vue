<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :flightsData="cacheFlightsData" @setFlightsData="setFlightsData" />

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
            v-if="dataList.length > 0"
          ></el-pagination>
          <div v-else-if="!loading">本页暂无数据</div>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  data() {
    return {
      loading: true,
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 缓存原始航班总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 航班总数据
      // dataList 可以放在计算属性里面,无需每次都调用函数进行计算
      //dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1,
      pageSize: 2
    };
  },

  computed: {
    dataList() {
      // 在这里其实 return 的就是刚刚我们一直在写 loadPage()
      var start = (this.pageIndex - 1) * this.pageSize; // 0
      var end = start + this.pageSize; // 10

      // 数组 slice 方法接受两个参数, 第一个是切割的开始(包括当前index), 第二个是切割的结束(不包过当前 index),
      return this.flightsData.flights.slice(start, end);
    }
  },
  watch: {
    $route() {
      console.log(this.$route.query.departCity);
      // 这里一旦触发证明用户点击了历史记录
      // location.reload();
      // 这种强制刷新,迫不得已的方法
      // 只需要更新数据即可
      this.loadPageData();
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  methods: {
    changePageIndex(pageIndex) {
      this.pageIndex = pageIndex;
    },
    sizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    setFlightsData(newFlightsList) {
      console.log("修改机票筛选参数被触发");
      // 接受到新的机票数据
      this.flightsData.flights = newFlightsList;
    },
    loadPageData() {
      this.$axios({
        url: "/airs",
        //参数可以通过 this.$route.query
        // 这里面数据本来就是一个对象,所以无需自己拼接
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        // 这里是分页, 我们需要拿到数据的开始index 和结尾的 index

        // 除了放到 flightsData 里面 还应该放到 缓存里面,这个缓存的数据,接受过一次以后,再也不会变好
        // this.cacheFlightsData = res.data;

        // var a ={
        //   b:1
        // }
        // var c = a;
        // var d = a
        // 为了避免引用类型数据污染问题,需要进行深拷贝
        this.cacheFlightsData = { ...this.flightsData };

        this.loading = false;
      });
    }
  },
  mounted() {
    // console.log(this.$route.query);
    // 对于路由,两种参数分别是 params 和 query
    // 对于 axios 两种参数分别是 data 和 params
    this.loadPageData();
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