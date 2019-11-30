<template>
  <div class="container">
    <!-- 幻灯片 -->
    <!-- el-carousel-item 对应每一张图片 -->
    <el-carousel :interval="5000" arrow="always">
      <!-- interval 间隔 -->
      <!-- 获取的来的都是相对路径,需要拼接数据哭的路径才行, $axios.default.baseURL -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // 对于模板html的编写,和css 的样式,其实是最简单的
  // 重点是数据结构的构造
  data() {
    return {
      banners: []
    };
  },
  mounted() {
    // 挂载完毕的时候获取数据渲染轮播图
    // nuxt 实际上已经将 axios 封装到了 vue 市里的 $axios 当中可以直接使用
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data;
    });
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>