
    new Vue({
        el: '#app',
        data: {
            mobile: '',
            code: '',
            password:'',
            password2:'',
            time: 60, // 发送验证码倒计时
            sendMsgDisabled: false,
            get_text:'获取验证码',
            new_code:''
        },
        methods: {
            //获取验证码
            get_code: function () {
                var mobile = this.mobile;
                if (mobile == '')
                {
                    layer.tips('手机号不能为空！', '#mobile', {
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

                var me = this;
                me.sendMsgDisabled = true;
                var interval = window.setInterval(function() {
                    if ((me.time--) <= 0) {
                        me.time = 60;
                        me.sendMsgDisabled = false;
                        window.clearInterval(interval);
                        me.get_text = '重新获取';
                    }
                    var time = me.time;
                    if(time == 50)
                    {
                        var token = get_token('Login','send_code');
                        $.ajax({
                            url: "http://xtbg.xqdcs.com/api/login/send_code",
                            type: "GET",
                            dataType: "jsonp",
                            crossDomain: true,
                            jsonp: 'callback',
                            jsonpCallback: 'handleResponse',
                            data: {
                                mobile:mobile,access_token:token
                            },
                            success: function(data){
                                var new_code = data.code;
                                console.log(new_code);
                                me.new_code = new_code;
                            }

                        });
                    }

                }, 1000);


            },
            //提交
            greet: function () {
                var mobile = this.mobile;
                var code = this.code;
                var password = this.password;
                var password2 = this.password2;
                var sendcode = this.new_code;
                var param = 1;

                if (mobile == '')
                {
                    layer.tips('手机号不能为空！', '#mobile', {
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

                if (code == '')
                {
                    layer.tips('验证码不能为空！', '#code', {
                        tips: [1, '#0FA6D8'] //还可配置颜色
                    });
                    return false;
                }

                if (code != sendcode)
                {
                    layer.tips('验证码错误！', '#code', {
                        tips: [1, '#0FA6D8'] //还可配置颜色
                    });
                    return false;
                }

                if (password == '')
                {
                    layer.tips('新密码不能为空！', '#password', {
                        tips: [1, '#0FA6D8'] //还可配置颜色
                    });
                    return false;
                }

                if (password.length < 6)
                {
                    layer.tips('密码至少6位！', '#password', {
                        tips: [1, '#0FA6D8'] //还可配置颜色
                    });
                    return false;
                }

                if (password2 == '')
                {
                    layer.tips('确认密码不能为空！', '#password2', {
                        tips: [1, '#0FA6D8'] //还可配置颜色
                    });
                    return false;
                }

                if (password != password2)
                {
                    layer.msg('两次密码输入不一致！');
                    return false;
                }

                var token = get_token('Login','edit');
                $.ajax({
                    url: "http://xtbg.xqdcs.com/api/login/edit",
                    type: "GET",
                    dataType: "jsonp",
                    crossDomain: true,
                    jsonp: 'callback',
                    jsonpCallback: 'handleResponse',
                    data: {
                        mobile:mobile,password:password,password2:password2,param:param,access_token:token
                    },
                    success: function(data){
                        console.log(data.res);
                        if(data.res == 1)
                        {
                            layer.msg('修改成功！');
                            setTimeout("location.href='change.html';", 1000);
                            return false;

                        }else{
                            layer.msg('修改失败，该用户可能不存在！');
                            setTimeout("location.href='change.html';", 1000);
                            return false;

                        }

                    }

                });

            }

        }
    })


