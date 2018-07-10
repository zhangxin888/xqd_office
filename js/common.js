//生成token
function get_token(controller,action) {
    var date = new Date();    //当前日期
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var time = year+'-'+month+'-'+day;
    var key = 'mxh123!@#456$%^';
    var token = $.md5(controller+action+time+key);
    return token;

}