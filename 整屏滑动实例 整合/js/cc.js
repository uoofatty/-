var winWidth = $(window).width();
var winHeight =  $(window).height();
var scPro=$(document);

$(document).on('mousewheel DOMMouseScroll', onMouseScroll);

var endTime = 0;



function onMouseScroll(e){
    var startTime = new Date().getTime();//翻屏起始时间

    e.preventDefault();

    var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    var delta = Math.max(-1, Math.min(1, wheel) );

    var sst = $('#wrap2').offset().top;

    console.log('>>>' + winHeight );
    $("#wrap2").css('transition','.5s linear');
    if(endTime - startTime < -500){
        if(delta<0){//向下滚动
            console.log('PC向下滚动');
            if(sst > (winHeight*-5)){
                $("#wrap2").css('margin-top',sst - winHeight);
            }else{
                $("#wrap2").css('margin-top','0');
                $("#wrap2").css('transition','0s linear');
            }
        }else{//向上滚动
            console.log('PC向上滚动');
            if(sst != 70){
                $("#wrap2").css('margin-top',sst + winHeight -140  );
            }else{
                console.log('htops')
            }
        }
    }

    endTime = new Date().getTime();

}


//重要！禁止移动端滑动的默认事件
document.body.addEventListener('touchmove', function(event) {
    event = event ? event : window.event;
    if(event.preventDefault) {
        event.preventDefault()
    } else {
        event.returnValue = false
    }
}, false)
var pages = function(obj) {
    var box = document.getElementById(obj.wrap);
    var box2 = document.getElementById(obj.wrap2);
    var len = obj.len;
    var n = obj.n;
    var startY, moveY, cliH;
    //获取屏幕高度
    var getH = function() {
        cliH = document.body.clientHeight
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
        $("#wrap2").stop(true);
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
    wrap: 'wrap', //.wrap的id
    wrap2: 'wrap2', //.wrap2的id
    len: 7, //一共有几页
    n: 0 //页面一打开默认在第几页？第一页就是0，第二页就是1
});




$('.p4ck').click(function () {
    var p4ck = $(this).data('p4');

    $('#hfm,#gdm').css('display','none');

    $('#'+ p4ck).css('display','block');
});



$('#showmap').click(function () {
    var mapstatus = $(this).data('map');

    $("#mapStatus").slideToggle("slow");
});












