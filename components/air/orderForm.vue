<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info" :model="{users}" ref="formUsers">
        <div class="member-info-item" v-for="(user, index) in users" :key="index">
          <el-form-item
            label="乘机人类型"
            :prop="`users.${index}.username`"
            :rules="{required: true,message: '请输入乘机人姓名',trigger: 'blur'
            }"
          >
            <el-input placeholder="姓名" class="input-with-select" v-model="user.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item
            label="证件类型"
            :prop="`users.${index}.id`"
            :rules="{required: true,message: '请输入乘机人政见号码',trigger: 'blur'}"
          >
            <el-input placeholder="证件号码" class="input-with-select" v-model="user.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <el-checkbox-group v-model="insurances">
          <div class="insurance-item" v-for="(item, index) in data.insurances" :key="index">
            <!-- select option 当中
            label 是给用户看的
            value 给计算机看的

            checkbox-group 当中
            label 才是给计算机看的
            给用户看的文字可以直接卸载 checkbox 标签之间-->
            <el-checkbox
              :label="item.id"
              border
            >{{item.type}}：￥{{item.price}}/份×1 最高赔付{{item.compensation}}元</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form
          label-width="80px"
          :model="{contactName, contactPhone, captcha}"
          :rules="contactRules"
          ref="formContact"
        >
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="contactPhone">
            <el-input placeholder="请输入手机号" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <!-- 如果正在发送的状态微针, 需要给按钮添加一个 disabled 属性为真(不能点击), 否则为假(可以点击) -->
        <el-button
          v-if="$store.state.user.userInfo.token"
          :disabled="isSending"
          type="warning"
          class="submit"
          @click="handleSubmit"
        >提交订单</el-button>
        <Login v-else :disableRedirect="true" />
        <span v-show="false">{{allPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/user/loginForm";

export default {
  props: ["data"],
  components: {
    Login
  },
  data() {
    return {
      isSending: false,
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [],
      contactName: "",
      contactPhone: "",
      captcha: "",
      contactRules: {
        contactName: {
          required: true,
          message: "请输入联系人姓名",
          trigger: "blur"
        },
        contactPhone: {
          required: true,
          message: "请输入联系人电话",
          trigger: "blur"
        },
        captcha: {
          required: true,
          message: "请输入手机验证码",
          trigger: "blur"
        }
      }
    };
  },
  computed: {
    // 这里的计算属性必须起码被渲染过才会执行,可以使用 v-show 隐藏
    allPrice() {
      var res = 0;
      // 机票价格
      res += this.data.seat_infos.org_settle_price * this.users.length;

      // 保险价格
      // 是存放在了 this.insurances
      this.insurances.forEach(id => {
        //[1,2,666]
        // 这里面遍历的是选中的 保险id
        // 我们的所有保险数据都在
        // this.data.insurances;
        // 要在这个寻找跟这个 id 一致的对象,获取价格加到总价当中
        this.data.insurances.forEach(item => {
          // 这里每一个 item 都是一个保险的数据对象
          // 如果这个对象的 id 等于我们选中的 id
          // 就要将这个价格加入总价当中
          if (item.id == id) {
            res += item.price * this.users.length;
          }
        });
      });

      // 机场建设和燃油附加费
      res += this.data.airport_tax_audlet * this.users.length;

      // 这里面会监听所有引用过的数据,每次触发计算出一个新的价格,
      // 往侧边栏传输, 其实是兄弟组件传递, 要使用父组件作为桥梁
      this.$emit("changeForm", {
        numUsers: this.users.length,
        allPrice: res
      });
      return res;
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      // 点击发送验证码会触发这个函数
      // 我受邀获取联系人的电话
      // 发送请求获取到验证码,弹出窗口
      // 这个弹窗逻辑只是测试使用
      // 电话就是 this.contactPhone
      if (this.contactPhone == "") {
        // 可以加上各种手机号格式验证,错误弹窗
        return;
      }

      this.$axios({
        url: `captchas`,
        method: "POST",
        data: {
          tel: this.contactPhone
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },

    // 提交订单
    async handleSubmit() {
      // 先进行一次全面的表单校验
      // 回调地狱写法
      // this.$refs.formUsers.validate(v=>{
      //   if (v) {
      //     // 这里做后续的处理
      //     this.$refs.formContact.validate(v=>{
      //       // 才是真正的提交
      //     })
      //   }
      // })

      // el-form 表单的 validate 方法如果没有传入参数,则返回 promise 可以使用 async / await 方式调用
      // async / await 接收到的只是 .then 也就是成功的回调, 但是错误应该使用 .catch 捕捉
      const validUsers = await this.$refs.formUsers
        .validate()
        .catch(() => false);
      const validContact = await this.$refs.formContact
        .validate()
        .catch(() => false);

      if (!validUsers || !validContact) {
        // 如果其中一个除了问题,都应该直接 return 不应该继续提交
        return;
      }

      if (this.isSending) {
        return;
      }
      // 进入发送函数, 如果发现之前已经在发送,马上 return
      // 否则把正在发送状态改为 true, 然后发送请求
      this.isSending = true;

      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: false,
        seat_xid: this.data.seat_infos.seat_xid,
        air: this.data.id,
        captcha: this.captcha
      };

      const token = this.$store.state.user.userInfo.token;

      // 如果没有 token  证明用户还没有登录,直接跳转到登录页
      if (!token) {
        this.$message({
          message: "请先登录",
          type: "error"
        });
        this.$router.push({
          path: "/user/login"
        });
        return;
      }

      console.log(token);

      // 数据已经准备完毕, 需要发送请求;
      this.$axios({
        url: "/airorders",
        method: "post",
        data: orderData,
        headers: {
          // 认真 token 的格式应该是: Bearer xxxxxxxxx
          Authorization: "Bearer " + token
        }
      })
        .then(res => {
          // 数据获取完毕, 无论成功失败,都要把正在发送的状态改成 false
          this.isSending = false;
          console.log(res.data);
          // 成功以后跳转到支付页
          // 带上 支付订单 id
          const { data } = res.data;
          // 订单 id 就是 data.id
          this.$router.push({
            path: "/air/pay",
            query: {
              id: data.id
            }
          });
        })
        .catch(err => {
          // 数据获取完毕, 无论成功失败,都要把正在发送的状态改成 false
          this.isSending = false;
          const { message } = err.response.data;
          // 警告提示
          this.$confirm(message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>