new Vue({
    el: '#app',
    data: {
        company:'',
        fr_name:'',
        fr_mobile:'',
        fz_name:'',
        fz_mobile:'',
        area:'',
        size:'',
        project:'',
        dz_price:'',
        date:'',
        zc_price:'',
        remark:''
    },
    methods: {

        //添加公司信息
        greet: function () {
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
        }

    }
})