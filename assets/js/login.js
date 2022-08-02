$('#link_reg').on('click', function(){
    $('.login-box').hide()
    $('.reg-box').show()
})

$('#link_login').on('click', function(){
    $('.login-box').show()
    $('.reg-box').hide()
})

// 从 LayUI 中获取 form 对象
const form = layui.form;

// const baseUrl = "http://www.liulongbin.top:3007";

const layer = layui.layer

// 通过 form.verify() 方法自定义校验规则
form.verify({
    // 校验两次密码是否一致的规则
    repass: (value) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        const pwd = $(".reg-box [name=password").val();  //属性选择器
        if(pwd !== value) return "两次密码不一致"
    },
    // 自定义一个叫 pwd 的校验规则
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

});

   $('#form_reg').on('submit', function(e) {
    e.preventDefault();
    // console.log(1);

    const data = $(this).serialize();

    $.ajax({
         type:'POST',
         url:"/api/reguser",
         data,
         success: res => {
            const {message, status} = res  //看接口的实例
            if(status !== 0) return layer.msg(message)
            $('#link_login').click()
         }
    })
   })

   $('#form_login').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url:  "/api/login",
        data:$("#form_login").serialize(), //jquery的方法,一次性获取所有input框的值
        success: res => {
            const {status,message,token} = res
            if(status !== 0) return layer.msg(message) 
            localStorage.setItem('token',token) //res.token 存到本地存储
            location.href = '/index.html' //跳转到index.html
        }
    })
   })
     