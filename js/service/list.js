
    new Vue({
        el: '#app',
        data: {
            list:[],
        },
        mounted:function () {
            this.get_list();
        },
        methods: {
            get_list:function () {

                var uid = sessionStorage.getItem("uid");
                var token = get_token('Service','index');
                var _this  = this;
                $.ajax({
                    url: "http://xtbg.xqdcs.com/api/service/index",
                    type: "GET",
                    dataType: "jsonp",
                    crossDomain: true,
                    jsonp: 'callback',
                    jsonpCallback: 'handleResponse',
                    data: {
                        uid:uid,access_token:token
                    },
                    success: function(data){
                        console.log(data.list);
                        _this.list = data.list;
                    },
                });
            },
            //公司详细ID
            greet: function () {
                var _this = this;
                console.log(_this.cid);
            }

        }
    })


