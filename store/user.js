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

// mutation 只能执行同步代码,对于异步代码比如获取 ajax 请求数据等,需要使用 actions
export const actions = {
    // 里面每一个属性都是函数
    // 两个参数,第一个是 {commit} 将这个仓库对象本身的 commit 函数解构出来
    // 第二个参数就是我们需要传进来的 数据
    login({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data;
            // 保存到state
            commit("setUserInfo", data);
            return data;
        })
    }
}