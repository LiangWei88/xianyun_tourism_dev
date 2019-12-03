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
    },
    cleanUserInfo(state, info) {
        // 因为这里面的函数一定是点击了浏览器里面的按钮才会触发
        // 所以不判断环境也无所谓
        localStorage.removeItem("vuex");
        state.userInfo = {};
    }
}

// mutation 只能执行同步代码,对于异步代码比如获取 ajax 请求数据等,需要使用 actions
export const actions = {
    // 里面每一个属性都是函数
    // 两个参数,第一个是 {commit} 将这个仓库对象本身的 commit 函数解构出来
    // 第二个参数就是我们需要传进来的 数据
    login({ commit }, data) {
        // 这里的 return 是为了能够对外返回一个带数据的 promise 方便外面继续进行处理
        // 这里的异步操作只需要做好自己的一件事情即可
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data;
            // 保存到state
            // commit("setUserInfo", data);
            return data;
        })
    }
}