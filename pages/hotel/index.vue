<template>
  <div style="padding:20px;">
    <h2>高德地图实例</h2>
    <div id="map"></div>
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
      AMap.plugin("AMap.ToolBar", function() {
        //异步加载插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
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