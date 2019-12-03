import { Message } from "element-ui";

export default function ({ $axios, redirect }) {
    // 这个插件接受到的参数其实是 nuxt 本身对象
    $axios.onError(err => {
        const { statusCode, message } = err.response.data;

        // 还未使用
        // if(statusCode === 401 || statusCode === 403){
        //     Message.warning({message: "请先登录"});
        // redirect函数带上路径参数即可自动跳转页面
        //     redirect("/user/login");
        // }

        if (statusCode === 400) {
            Message.warning({ message });
        }
    })
}