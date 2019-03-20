$(document).ready(function () {
    console.log('hi~ ')
});




//重要！禁止移动端滑动的默认事件
document.body.addEventListener('touchmove', function(event) {
    event = event ? event : window.event;
    if(event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false
    }
}, false);

//移动端  监听touch事件

var pages = function(obj) {

    var box = document.getElementById(obj.wrap);
    var box2 = document.getElementById(obj.pages);
    var len = obj.len;
    var n = obj.n;

    var startY, moveY, cliH;

    //获取屏幕高度
    var getH = function() {
        cliH = document.body.clientHeight;
        console.log("os >>" + cliH);
    };

    getH();

    window.addEventListener('resize', getH, false);

    //touchStart
    var touchstart = function(event) {
        if(!event.touches.length) {
            return;
        }
        startY = event.touches[0].pageY;
        moveY = 0;
    };

    //touchMove
    var touchmove = function(event) {
        if(!event.touches.length) {
            return;
        }
        moveY = event.touches[0].pageY - startY;
        box2.style.transform = 'translateY(' + (-n * cliH + moveY) + 'px)'; //根据手指的位置移动页面
    };

    //touchEnd
    var touchend = function(event) {
        //位移小于+-50的不翻页
        if(moveY < -50) n++;
        if(moveY > 50) n--;

        //最后&最前页控制
        if(n < 0) n = 0;
        if(n > len - 1) n = len - 1;

        //重定位
        box2.style.transform = 'translateY(' + (-n * 10) + '%)'; //根据百分比位置移动页面

        console.log(n)

        $("#pages").stop(true);
    };

    //touch事件绑定
    box.addEventListener("touchstart", function(event) {
        touchstart(event)
    }, false);
    box.addEventListener("touchmove", function(event) {
        touchmove(event)
    }, false);
    box.addEventListener("touchend", function(event) {
        touchend(event)
    }, false);
};

pages({
    wrap: 'wrap',
    pages: 'pages',
    len: 6,
    n: 0
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//PC 监听滚动

var winWidth =  $(window).width();
var winHeight =  $(window).height();

$(document).on('mousewheel DOMMouseScroll', onMouseScroll);

var endTime = 0;    //endtime

function onMouseScroll(e){

    var startTime = new Date().getTime(); //start time

    e.preventDefault();

    var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    var delta = Math.max(-1, Math.min(1, wheel) );

    var pagesTop = $('#pages').offset().top;

    console.log('window height: ' + winHeight );

    //$("#wrap2").css('transition','.5s linear');

    if(endTime - startTime < -500){

        if(delta<0){

            console.log('go >> down');

            if(pagesTop > (winHeight * -5)){
                $("#pages").animate({'margin-top': pagesTop - winHeight},500);

            }else{
                $("#pages").animate({'margin-top': 0},500);
            }
        }else{//向上滚动
            console.log('go >> up');
            if(pagesTop != 0){
                $("#pages").animate({'margin-top': pagesTop + winHeight},500);
            }else{
                console.log('>> maxtop')
            }
        }
    }

    endTime = new Date().getTime();

}

$('.gopage').click(function () {

    var pagenum = $(this).data('pagenum');
    console.log('pagenum ~ ' + pagenum);

    if(winWidth > 747){
        $("#pages").animate({'margin-top': -winHeight*pagenum},500);
    }else{
        $('#pages').css('transform','translateY(' + (-pagenum * 10) + '%)');
    }

});