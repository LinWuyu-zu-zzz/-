const form = layui.form;
// 自定义校验规则
form.verify({
    nickname: (val) => {
        if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
    email: [/@/, '邮箱格式输入错误']
});

const initUserInfo = () => {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        data: null,
        success: res => {
            const { status, message, data } = res
            if (status !== 0) return layer.msg(message)
            form.val("formUserInfo", data);
        }
    })
}

initUserInfo()

// 重置表单数据
$("#btnReset").click((e) => {
    e.preventDefault();
    initUserInfo()  //重置之后再调用一次请求
});

// 更新用户数据
$(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/userinfo",
        data: $(".layui-form").serialize(),
        success: (res) => {
            const {status,message} = res;
            if (res.status !== 0) return layer.msg(message);
            // layer.msg("更新用户信息成功！");
            // 调用父页面渲染函数
            window.parent.getUserInfo();
        },
    });
});