window.onload=function(){
	windowChange();
	changeon();
}
window.onresize = function () {
	windowChange()
}
function windowChange() {
	document.getElementsByTagName('html')[0].style.fontSize=document.documentElement.clientWidth/7.5+"px"
}
