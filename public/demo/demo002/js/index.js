$(function () {
    /*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
    $(".container").fullpage({
        //设置每个页面的颜色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        //设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐
        verticalCentered: false,
        //设置导航 设置指示器 点容器
        navigation: true,
        //加载当前
        afterLoad: function (link, index) {
            $(".section").eq(index - 1).addClass("now");
        },
        onLeave: function (index, nextIndex, direction) {

            if (index === 2 && nextIndex === 3) {
                $(".section").eq(index - 1).addClass("leaved")
            }
            if (index === 3 && nextIndex === 4) {
                $(".section").eq(index - 1).addClass("leaved")
            }
            if (index === 4 && nextIndex === 5) {
                $(".section").eq(index - 1).addClass("leaved")
            }
            if (index === 5 && nextIndex === 6) {
                $(".section").eq(index - 1).addClass("leaved");
                $(".screen06 .box").addClass("show")
            }
            if (index === 6 && nextIndex === 7) {
                $(".section").eq(index - 1).addClass("leaved");

            }
        },
        afterRender: function () {
            $(".more").on("click", function () {
                $.fn.fullpage.moveSectionDown();
            });
            $(".screen04 .cart").on("animationend", function () {
                $('.screen04 .address').show().find('img:last').fadeIn(1000);
                // $('.screen04 .text').addClass('show');
            });
            $(".screen08").on("mousemove", function (e) {
                $(".screen08 .hand img").css({"position": "absolute", "left": e.pageX - 1000, "top": e.pageY - 400});
            }).find(".again").on("click", function () {
                $(".now,.leaved,.show").removeClass("now").removeClass("leaved").removeClass("show");
                $(".content [style]").removeAttr("style");
                $.fn.fullpage.moveTo(1);
            });
        },
        scrollingSpeed: 1000
    });

});