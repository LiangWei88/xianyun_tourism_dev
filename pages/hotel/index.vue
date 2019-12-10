<template>
  <div style="padding:20px;">
    <h2>高德地图实例</h2>
    <div id="map"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("map", {
        zoom: 30, //级别
        // 东经北纬
        center: [113.32459, 23.10668], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      // 点标记*************************
      var marker = new AMap.Marker({
        position: [113.32459, 23.10668], //位置
        // offset: new AMap.Pixel(-10, -10),
        // icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        title: "广州塔东方赛达森",
        content:
          "<div style='width:100px;height:100px;line-height:100px;text-align:center;border-radius:50%;color:#fff;background:red;'>999</div>"
      });
      map.add(marker); //添加到地图

      // 插件添加*************************
      // AMap.plugin("AMap.ToolBar", function() {
      AMap.plugin(["AMap.ToolBar", "AMap.Driving"], function() {
        // 插件不仅仅添加一个,将所有需要的插件都要添加进来
        //异步加载插件后,回调里面才可以使用这些插件
        //缩放工具栏插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);

        //驾车路线插件
        // 这里是官方文档当中的简要例子
        // var driving = new AMap.Driving(); //驾车路线规划
        // driving.search(/*参数*/);

        // 创建插件实例
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map,
          panel: "panel"
        });

        var points = [
          { keyword: "吉山幼儿园", city: "广州" },
          { keyword: "体育西路", city: "广州" }
        ];

        driving.search(points, function(status, result) {
          // 未出错时，result即是对应的路线规划方案
          console.log(result);
        });
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=ccd10c501bd6a0ca679f86302d98bb85&callback=onLoad";

    var jsapi = document.createElement("script");

    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="less" scoped>
#map {
  width: 480px;
  height: 360px;
}
</style>