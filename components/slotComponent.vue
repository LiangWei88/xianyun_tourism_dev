<template>
  <div>
    <h2>这里是子组件内容</h2>
    <div>
      <slot name="description"></slot>
      <!-- 我想两个 slot 分开,中间插入内容 -->
      <div>这里是分割线,上面是表单的描述,下面才是表单的内容</div>
      <slot name="formBody"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>