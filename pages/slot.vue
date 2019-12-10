<template>
  <div>
    这里是父组件: 插槽都是使用在组件当中
    <SlotComponent>直接在这里输入子组件内容</SlotComponent>
  </div>
</template>

<script>
import SlotComponent from "@/components/slotComponent.vue";

export default {
  components: {
    SlotComponent
  }
};
</script>

<style>
</style>