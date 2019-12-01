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

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <!-- 绑定点击事件,每次点击自动切换 currentOption -->
          <!-- 只需要判断 currentOption == index 那么就给一个 :class={} -->
          <span v-for="(item, index) in options" :key="index" @click="handleChangeTab(index)">
            <i>{{item.title}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <!-- 这时候每次点击都会获得当前的 index 只要拿到对应的 placeholder 就可以了 -->
          <!-- 选项是 options
          当前选项就是 options[currentOption]
          当前 placeholder options[currentOption].placeholder-->
          <input :placeholder="options[currentOption].placeholder" />
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 对于模板html的编写,和css 的样式,其实是最简单的
  // 重点是数据结构的构造
  data() {
    return {
      banners: [],
      options: [
        // 每一个对象都是一个标签
        {
          title: "攻略",
          placeholder: "搜索城市"
        },
        {
          title: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          title: "机票",
          placeholder: "请输入触发地"
        }
      ],
      // 一旦有 tab 切换,第一个想的就是 current
      currentOption: 0
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
  },
  methods: {
    handleSearch() {
      if (this.currentOption == 0) {
        this.$router.push("/post");
      }
      if (this.currentOption == 1) {
        this.$router.push("/hotel");
      }
    },
    handleChangeTab(index) {
      if (index == 2) {
        this.$router.push("/air");
      } else {
        this.currentOption = index;
      }
    }
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

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>