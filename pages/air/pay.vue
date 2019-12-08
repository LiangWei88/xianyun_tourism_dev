<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{orderData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" ref="qrCanvas"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Qrcode from "qrcode";
export default {
  data() {
    return {
      orderData: {}
    };
  },
  mounted() {
    console.log("打印 qrcode 库对象");

    console.log(Qrcode);

    if (this.$store.state.user.userInfo.token) {
      this.loadData();
    }
  },
  watch: {
    "$store.state.user.userInfo.token"() {
      this.loadData();
    }
  },
  methods: {
    checkPayStatus() {
      const token = this.$store.state.user.userInfo.token;
      this.$axios({
        url: "/airorders/checkpay",
        method: "post",
        data: {
          id: this.$route.query.id,
          nonce_str: this.orderData.price,
          out_trade_no: this.orderData.orderNo
        },
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.trade_state == "NOTPAY") {
          // 等待支付,不断轮询
          setTimeout(() => {
            this.checkPayStatus();
          }, 3000);
        } else {
          // 一直到状态的不再是 等待支付,
          // 要么成功要么失败, 不管是什么我都把后台传回来的状态文字 打印出来 this.$message
          this.$message(res.data.statusTxt);
          // 如果有支付成功页的话,这里可以继续接跳转
        }
      });
    },
    loadData() {
      const token = this.$store.state.user.userInfo.token;
      if (token) {
        this.$axios({
          method: "get",
          url: "/airorders/" + this.$route.query.id,
          headers: {
            Authorization: "Bearer " + token
          }
        }).then(res => {
          console.log(res.data);
          this.orderData = res.data;

          // 这里是读取数据完毕的回调,之前已经赋值到 this.orderData 里面了
          // 要生成 二维码, 有两个 东西需要准备 1.dom 2.支付链接
          // dom 就是 this.$refs.qrCanvas
          // 链接就是 this.orderData.payInfo.code_url
          // Qrcode 插件 使用 toCanvas 方法可以直接生成 canvas 图像
          // 用到三个参数, canvas dom, text(链接), options(选项,现在只用到宽度设置)
          Qrcode.toCanvas(
            this.$refs.qrCanvas,
            this.orderData.payInfo.code_url,
            {
              width: 200
            }
          );
          this.checkPayStatus();
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>