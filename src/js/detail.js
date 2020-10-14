;
! function($) {
    let sid1 = location.search.substring(1).split('=')[1];
    let btn_top = $('.btn_top');
    let btn_bottom = $('.btn_bottom');
    if (!sid1) {
        sid1 = 1;
    }
    $.ajax({
        url: 'http://192.168.11.11/tianmao/tianmao/php/detail.php',
        data: {
            sid: sid1
        },
        dataType: 'json'
    }).done(function(data) {
        let arrar = data.smallurl.split(','); //获取数据库中的小图片
        $('.main_left_imgs').children('img').attr('src', data.url);
        $('title').html(data.title);
        $('.main_right').children('h3').html(data.title);
        $('.price').children('span').children('i').html(data.price)
        $.each(arrar, function(index, value) { //遍历小图片，将数据渲染到图片里面
            $('.main_left_bottom img').eq(index).attr('src', value);
            $('.main_left_bottom img').eq(index).hover(function() {
                $('.main_left_bottom li').eq(index).addClass('active').siblings('li').removeClass('active')
                $('.main_left_imgs img').attr('src', arrar[index])
            })
        })
    })
    btn_top.click(function() { //点击向上的那个按钮，那么它的购物车数量加1
        $('.number input').val(Number($('.number input').val()) + 1);
    })
    btn_bottom.click(function() { //点击向下的那个按钮，那么它的购物车数量减1
            $('.number input').val(Number($('.number input').val()) - 1);
            if ($('.number input').val() == 0) { //不能让它的购物车数量值为0
                $('.number input').val(1)
            }
        })
        //放大镜效果
    const bigdiv = $('.big_img'); //放大图的div
    const bigImg = $('.big_img img'); //大图的
    const smallImg = $('.main_left_imgs img'); //小图
    const smalldiv = $('.smalldiv'); //放大镜鼠标hover的大小
    smalldiv.width(smallImg.width() * bigdiv.width() / bigImg.width());
    smalldiv.height(smallImg.height() * bigdiv.height() / bigImg.height())
    let bili = bigImg.width() / bigdiv.width();
    $('.main_left_imgs').hover(function() {
            bigdiv.css('visibility', 'visible');
            smalldiv.css('visibility', 'visible');
            bigImg.attr('src', smallImg.attr('src'));
            $(this).on('mousemove', function(ev) {
                let $leftvalue = ev.pageX - smallImg.offset().left - smalldiv.width() / 2;
                let $topvalue = ev.pageY - smallImg.offset().top - smalldiv.height() / 2;
                if ($leftvalue < 0) {
                    $leftvalue = 0;
                } else if ($leftvalue >= smallImg.width() - smalldiv.width()) {
                    $leftvalue = smallImg.width() - smalldiv.width()
                }

                if ($topvalue < 0) {
                    $topvalue = 0;
                } else if ($topvalue >= smallImg.height() - smalldiv.height()) {
                    $topvalue = smallImg.height() - smalldiv.height();
                }

                smalldiv.css({
                    left: $leftvalue,
                    top: $topvalue
                });

                bigImg.css({
                    left: -$leftvalue * bili,
                    top: -$topvalue * bili
                });

            });
        },
        function() {
            bigdiv.css('visibility', 'hidden');
            smalldiv.css('visibility', 'hidden');
        });


    //存储cookie值
    // let arrone = [];
    // let arrid = [];
    // let arrvalue = [];
    // let storevalue = 0;
    // arrone = decodeURIComponent(document.cookie).split('; '); //分号后面有一个空格
    // $.each(arrone, function(index, value) {
    //     arrid[index] = value.split('=')[0]; //获取到sid的值到arrid中
    //     arrvalue[index] = value.split('=')[1]; //获取到value的值到arrvalue中
    // })
    // $('.govern').click(function() {
    //         alert('你确定要添加' + $('.number input').val() + '件吗？')

    //         function addcookie(name, value, days) {
    //             $.each(arrid, function(index, valueid) {
    //                 if (name == valueid) {
    //                     storevalue = index;
    //                     return false;
    //                 } else {
    //                     arrid.push(name);
    //                     arrvalue.push(value);
    //                     arrvalue[storevalue] = 0
    //                 }
    //             })
    //             let date = new Date();
    //             date.setDate(date.getDate() + days);
    //             document.cookie = `${name}=${encodeURIComponent(Number(value)+Number(arrvalue[storevalue]))};expires=${date};path=/`;
    //             arrvalue[storevalue] = Number(value) + Number(arrvalue[storevalue])

    //         }
    //         addcookie(sid1, $('.number input').val(), 6)
    //         console.log(arrid, arrvalue)
    //     })
    //2.怎么存储--数组
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    //3.点击加入购物车按钮(确定是第一次点击还是多次点击)
    //第一次点击：在购物车列表页面创建商品列表
    //多次点击：之前创建过商品列表，只需要数量增加。

    //取出cookie,才能判断是第一次还是多次点击
    function cookietoarray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = jscookie.get('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }



    $('.govern').on('click', function() {
        //获取当前商品对应的sid
        let $sid = sid1;
        //判断是第一次点击还是多次点击
        //多次点击
        //$.inArray(value,array,[fromIndex])
        //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) { //$sid存在，商品列表存在，数量累加
            //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.number input').val()); //取值
            arrnum[$.inArray($sid, arrsid)] = $num; //赋值
            jscookie.add('cookienum', arrnum, 10);
        } else {
            //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.
            arrsid.push($sid); //将编号$sid push到arrsid数组中
            jscookie.add('cookiesid', arrsid, 10);
            arrnum.push($('.number input').val()); //将数量push到arrnum数组中
            jscookie.add('cookienum', arrnum, 10);
        }
        alert('按钮触发了');
    });

}(jQuery)