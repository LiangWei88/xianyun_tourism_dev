<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span v-for="(item, index) in tabs" :key="index" :class="{active: index === currentTab}">
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form :model="form" class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="getDepartList"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          v-model="form.departCity"
          @select="selectDepartCity"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="getDestList"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          v-model="form.destCity"
          @select="selectDestCity"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          v-model="form.departDate"
          @change="changeDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="submitSearch">搜索</el-button>
      </el-form-item>

      <div class="reverse">
        <span>换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    submitSearch() {
      console.log(this.form);
      // 页面跳转
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    },
    async getDepartList(value, showList) {
      // 获取真正的搜索建议
      var cityList = await this.searchCity(value);
      // 准备建议数据,然后时候 showList 回调返回到 组件当中显示
      showList(cityList);
    },
    async getDestList(value, showList) {
      // 获取真正的搜索建议
      var cityList = await this.searchCity(value);
      // 准备建议数据,然后时候 showList 回调返回到 组件当中显示
      showList(cityList);
    },
    searchCity(value) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        // data.forEach(element => {
        //   element.value = element.name;
        // });

        const citys = data.map(element => {
          return {
            ...element,
            // 这里我们根据 name 生成了 value
            // 如果不需要 市 字,我们可以直接在这里替换
            value: element.name.replace("市", "")
          };
        });

        // 用过滤函数将所有不带 sort 的数据去掉
        // const cityList = citys.filter(element=>{
        //   // 过滤器里面,所有合法的数据应该return true
        //   // if (element.sort) {
        //   //   return true;
        //   // }
        //   return element.sort;
        // })
        const cityList = citys.filter(element => element.sort);

        // 准备建议数据,然后时候 showList 回调返回到 组件当中显示
        return cityList;
      });
    },
    selectDepartCity(item) {
      // 我们的搜索建议列表其实是使用数组进行渲染的,
      // 每一个元素都是一个对象
      // 当我们点击列表里面的其中一个选项时,
      // 这个选项对应的 对象就会被自动传到 这个 select 时间当中
      // 当我们点击了一个选项, 触发 select 事件以后
      // 会有一个 被点击选项的对象传到这个函数里面
      // 将 item.sort 放到 form.departCode
      // 这个 item 就是一个城市
      // console.log(item);

      this.form.departCode = item.sort;
    },
    selectDestCity(item) {
      // 当我们点击了一个选项, 触发 select 事件以后
      // 会有一个 被点击选项的对象传到这个函数里面
      // 将 item.sort 放到 form.destCode
      this.form.destCode = item.sort;
    },
    changeDate() {
      // 每当数据改变的时候我需要将当前 this.form.departDate
      // 的数据转换换为合适的格式
      // console.log(moment(this.form.departDate).format("YYYY-MM-DD"));
      this.form.departDate = moment(this.form.departDate).format("YYYY-MM-DD");
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>