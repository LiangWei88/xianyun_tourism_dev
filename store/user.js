// 固定的写法,所有仓库里面的数据都叫 state
// 这个是用来声明数据的
export const state = () => ({
    userInfo: {
        token: '',
        user: {}
    }
})

// 用来改变数据状态的
export const mutations = {
    // 每一个属性都是一个函数
    // 有两个参数,
    // 第一个,使我们的状态对象 state
    // 第二个就是我们想要改变的数据
    setUserInfo(state, data) {
        // 这里是负责修改用户数据的
        state.userInfo = data
    }
}