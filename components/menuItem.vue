<template>
  <ul>
    <li v-for="(item, index) in children" :key="index">
      {{item.name}}
      <!-- 如果这个item 有 children 就继续把自己这个结构往里传 -->
      <!-- 开始写递归嵌套 -->
      <MenuItem v-if="item.children" :children="item.children" />
    </li>
  </ul>
</template>

<script>
export default {
  // 如果想自己调用自己必须医用 name 属性
  name: "MenuItem",
  props: ["children"]
};
</script>

<style>
</style>