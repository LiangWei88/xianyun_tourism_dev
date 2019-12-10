<template>
  <div>
    这里是父组件: 插槽都是使用在组件当中
    <SlotComponent>
      <!-- <div slot="description">这里假设就是饿了么的表单,包括两个部分,第一部分,也就是这里是一个说明性的div</div>
      <form slot="formBody">
        <input type="text" placeholder="这里是第二部分,表单" />
        <br />
        <button>提交表单</button>
      </form> 
      上面这个是 已经废弃了的写法,还能用-->
      <!-- 下面是新的 vue 2.6.0 之后的语法,暂时两种都可以使用 -->
      <template v-slot:description>
        <div>这里假设就是饿了么的表单,包括两个部分,第一部分,也就是这里是一个说明性的div</div>
      </template>
      <template v-slot:formBody>
        <form>
          <input type="text" placeholder="这里是第二部分,表单" />
          <br />
          <!-- {{varName}} 如果你在插槽里面渲染数据,那么这个变量名获取数据, 这里实在父组件获取数据 -->
          <!-- 所以饿了么表单组件如果要渲染数据,我们从来都没想过要进入饿了么子组件去修改数据,因为 slot 渲染的模板数据是从父组件来的 -->
          <button>提交表单</button>
        </form>
      </template>
    </SlotComponent>
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