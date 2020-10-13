define([], function() {
    return {
        show: ! function() {
            function header() {
                //最上面右边我的淘宝、收藏夹、商家支持、网站导航的效果
                $('.he_ri_none').hover(function() {
                    $(this).siblings("a").addClass("active")
                }, function() {
                    $(this).siblings("a").removeClass("active")
                })
                $('.he_ri_none2').hover(function() {
                    $(this).siblings("a").addClass("active")
                }, function() {
                    $(this).siblings("a").removeClass("active")
                })
                $('.he_ri_none3').hover(function() {
                    $(this).siblings("a").addClass("active")
                }, function() {
                    $(this).siblings("a").removeClass("active")
                })
            }
            header();

            function headerLogo() {
                //搜索框的效果
                let bit = $('.headerSearch input');
                let btn = $('.headerSearch button')
                let sousuo = $('.sousuo ul')
                let time = null
                let time2 = null
                bit.focus(); //页面一刷新bit就获取到焦点
                time = setInterval(function() {
                        bit.attr({
                            style: "opacity:0.6"
                        })
                    }, 1000) //一秒钟过后bit的透明度变成0.6

                bit.blur(function() { //bit失去焦点时的状态
                    clearInterval(time);
                    bit.attr({
                        style: "opacity:1"
                    })
                    let getLi = document.querySelectorAll('.sousuo ul li');
                    for (let i = 0; i < getLi.length; i++) {
                        getLi[i].onclick = function() {
                            getInput.value = getLi[i].innerHTML;
                            sousuo.children().remove();
                        }
                    }

                })
                bit.focus(function() { //获取焦点时如果value值为空透明度为0.6
                    if (bit.val() == '') {
                        clearInterval(time);
                        bit.attr({
                            style: "opacity:0.6"
                        })
                    } else { //当值不为空时value为正常
                        bit.attr({
                            style: "opacity:1"
                        })
                    }

                })

            }
            headerLogo()

            function nav2_comment_imgs() { //轮播图的效果
                let bli = $('.nav2_comment_imgs ol li');
                let ali = $('.nav2_comment_imgs ul li');
                let Liindex = 0;
                let time = null;
                bli.hover(function() {
                    Liindex = $(this).index();
                    xiaoguo();
                })
                time = setInterval(function() {
                    //自定播放轮播图
                    Liindex++;
                    if (Liindex > 5) {
                        Liindex = 0
                    }
                    xiaoguo()
                }, 4000)
                $('.nav2_comment_imgs ').not('.nav2_comment_text').hover(function() {
                    clearInterval(time)
                }, function() {
                    time = setInterval(function() {
                        //自定播放轮播图
                        Liindex++;
                        if (Liindex > 5) {
                            Liindex = 0
                        }
                        xiaoguo()
                    }, 4000)
                })

                function xiaoguo() {
                    bli.eq(Liindex).addClass('active').siblings().removeClass('active'); //这是下面那个小图标的样式改变
                    ali.eq(Liindex).addClass('active').siblings().removeClass('active'); //这是图片的改变
                    if (Liindex === 4 || Liindex === 0) {
                        //当他的图片在第五张和第一张的时候背景图时不一样的
                        $('.inner_nav2').attr({
                            style: "background: blue"
                        })
                    } else {
                        $('.inner_nav2').attr({
                            style: "background:rgb(232, 232, 232)"
                        })
                    }
                }
            }
            nav2_comment_imgs()

            function supermarket() { //下面是天猫超市的效果
                let flge = 1; //标记法。
                let time = null;
                $('.two_commodity_one').on('mousemove', function() {
                    //当鼠标划到今日疯抢.two_commodity_one这个盒子的时候，整体发生切换
                    $('.two_commodity1').show().siblings('.two_commodity2').hide();
                    flge = 1
                })
                $('.two_commodity_two').on('mousemove', function() {
                    //同上
                    $('.two_commodity2').show().siblings('.two_commodity1').hide();
                    flge = 2
                })
                time = setInterval(function() {
                    //利用标记法做个定时器每隔两秒进行tab切换。
                    if (flge === 1) {
                        $('.two_commodity1').show().siblings('.two_commodity2').hide();
                    } else if (flge === 2) {
                        $('.two_commodity2').show().siblings('.two_commodity1').hide();
                    }
                    flge++;
                    if (flge > 2) {
                        flge = 1;
                    }
                }, 2000)
                $('.change').hover(function() { //当鼠标移到.change这个div里面的时候定时器关闭
                    clearInterval(time);
                }, function() {
                    time = setInterval(function() { //当鼠标离开.change这个div里面的时候定时器开启
                        if (flge === 1) {
                            $('.two_commodity1').show().siblings('.two_commodity2').hide();
                        } else if (flge === 2) {
                            $('.two_commodity2').show().siblings('.two_commodity1').hide();
                        }
                        flge++;
                        if (flge > 2) {
                            flge = 1;
                        }
                    }, 2000)
                })
            }
            supermarket();


            function header_top_fixed() {
                // 最上面的固定定位。
                $(window).on('scroll', function() {
                    let $top = $(window).scrollTop(); //获取页面滚动条的高度
                    if ($top > 700) { //当滚动条大于700像素是出现
                        $('.header_top_fixed').stop(true).animate({
                            top: 0
                        }, 100)
                    } else {
                        $('.header_top_fixed').stop(true).animate({
                            top: -50
                        }, 100)

                    }
                })
            }
            header_top_fixed();

            function header_left_fixed() {
                // 左边楼层的固定定位
                $(window).on('scroll', function() {
                    let top1 = $(window).scrollTop();
                    $('.list_life').each(function(index, element) { //滑动到一定的top值就跳到对应的楼梯
                        let loucengtop = $(this).offset().top; //每块楼层距离顶部的top值。
                        let louti = $('.header_left_fixed li').not('.left_fixed_top');
                        //左边楼梯的层数
                        if (loucengtop >= top1) {
                            louti.eq(index).children('a').addClass('active');
                            louti.eq(index).siblings().children('a').removeClass('active')
                            return false
                        }
                    })
                    if (top1 > 500) {
                        $('.header_left_fixed ul').show(500)
                    } else {
                        $('.header_left_fixed ul').hide(500)
                    }

                })

                let louti = $('.header_left_fixed li').not('.left_fixed_top');
                //左边楼梯的层数
                louti.on('click', function() { //点击左边的按钮跳到对应的楼层
                    let loutiindex = $(this).index();
                    let loucengtop = $('.list_life').eq(loutiindex - 1).offset().top;

                    $('html').animate({
                        scrollTop: loucengtop - 40
                    })
                })
                $('.left_fixed_top').click(function() { //回到顶部。
                    $('html').animate({
                        scrollTop: 0
                    })
                })
                console.log($(window).scrollTop())

            }
            header_left_fixed()

            function lazy() { //懒加载
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            }
            lazy()

            function shuju() {
                $.ajax({
                    url: 'http://192.168.11.11/tianmao/tianmao/php/index1.php',
                    dataType: 'json'
                }).done(function(data) {
                    let str = '';
                    $.each(data, function(index, value) {
                        str += ' <li><a href="detail.html?sid=' + value.sid + ' " target="_blank"><img class="lazy" data-original="' + value.url + '" alt=""><p>' + value.title + '</p><span>￥' + value.price + '</span></a></li>'
                    })
                    $('.list_like_nav').siblings(' .commodity').html(str);
                    //实现懒加载效果
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                })
            }
            shuju()
        }()
    }

});