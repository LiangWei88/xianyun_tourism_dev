<template>
  <div>
    <MenuItem :children="menu" />
  </div>
</template>

<script>
import MenuItem from "@/components/menuItem.vue";
export default {
  components: {
    MenuItem
  },
  data() {
    return {
      menu: [
        // 菜单应该是一个数组
        // 数组里面每一项都是一个对象,对应有一个菜单
        {
          name: "男装",
          children: [
            // 这里是下级菜单,它的结构,应该跟上级菜单一样
            {
              name: "鞋子",
              children: [
                //   第三级菜单,应该结构跟第二级第一级是一样的
                {
                  name: "AJ 1"
                },
                {
                  name: "AJ X"
                }
              ]
            },
            {
              name: "帽子"
            }
          ]
        },
        {
          name: "女装"
        }
      ]
    };
  }
};
</script>

<style>
</style>