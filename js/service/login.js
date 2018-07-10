
new Vue({
    el: '#app',
    data: {
        mobile: '',
        code: ''
    },
    methods: {
        greet: function () {
            var mobile = this.mobile;
            var code = this.code;
            var param = 1;
            if (mobile == '')
            {
                layer.tips('手机号不能为空！', '#mobile', {
                    tips: [1, '#0FA6D8'] //还可配置颜色
                });
                return false;
            }

            if (code == '')
            {
                layer.tips('密码不能为空！', '#password', {
                    tips: [1, '#0FA6D8'] //还可配置颜色
                });
                return false;
            }
            var zz= /^0?(13|14|15|17|18|19)[0-9]{9}$/;
            if(!zz.test(mobile))
            {
                layer.tips('请输入正确手机号！', '#mobile', {
                    tips: [1, '#0FA6D8'] //还可配置颜色
                });
                return false;
            }
            var token = get_token('Login','index');
            $.ajax({
                url: "http://xtbg.xqdcs.com/api/login/index",
                type: "GET",
                dataType: "jsonp",
                crossDomain: true,
                jsonp: 'callback',
                jsonpCallback: 'handleResponse',
                data: {
                    'mobile':mobile,'password':code,'param':param,'access_token':token
                },
                success: function(data){
                    if(data.res == 1){
                        sessionStorage.setItem("uid", data.uid);
                        layer.load(0, {shade: false});
                        window.location.href="list.html";
                    }else{
                        layer.msg('用户名密码错误！');
                        setTimeout("location.href='login.html'", 1000);
                        return false;
                    }
                },



            })

        }
    }
})