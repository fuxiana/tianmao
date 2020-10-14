;
! function($) {
    console.log(1)
    var initial = $('#password');
    var confirm = $('#confirm_password');
    var user = $('#username');
    var error1 = $('.error1');
    var initvalue;
    var num = 0; //判断是否有两个正则内容
    var flag = true; //判断提示是否消失
    var flag2 = false; //判断用户名是否成功
    initial.on('focus', function() {
        $('.hine').show()
        error1.hide();
    })
    initial.on('input', function() {
        $('.hine').show()
        error1.hide();
        initvalue = initial.val();
        var reg1 = /[a-zA-Z]+/g;
        var reg2 = /[`~!@#$%^&*()_+-=,./<>?;'\\:"|\[\]\{\}*+，。/]/g;
        var reg3 = /\d+/g;
        var reg4 = / +/g;
        //判断密码中是否含有这些正则里面的内容
        if (reg3.test(initvalue) || reg1.test(initvalue) || reg2.test(initvalue)) {
            // 下面这句代码是表示满足上面一个条件，密码强度发生的改变
            $('.intension').children('i').eq(0).attr("style", "background: red;");
            $('.hine_two').attr("style", "color:green"); //满足字体为蓝色
            if (reg4.test(initvalue)) { //判断是否为红色
                $('.hine_two').attr("style", "color:red"); //否则为红色
                num = 0
            }
        } else {
            $('.hine_two').attr("style", "color:red"); //否则为红色
        }
        if ((reg1.test(initvalue) && reg3.test(initvalue)) || (reg3.test(initvalue) && reg2.test(initvalue)) || (reg1.test(initvalue) && reg2.test(initvalue))) {
            //满足其中一个条件之后num便加一
            num++
            // 下面这句代码是表示满足上面一个条件，密码强度发生的改变
            $('.intension').children('i').eq(0).attr("style", "background: orange;");
            $('.intension').children('i').eq(1).attr("style", "background: orange;");
            $('.intension').children('span').html('中') //字的改变
        }
        if (num > 0) { //如果当num不为0时，就说明至少满足两种正则的情况
            $('.hine_three').attr("style", "color:green");
        } else {
            $('.hine_three').attr("style", "color:red");
        }
        if (initvalue.length >= 6 && initvalue.length <= 20) {
            $('.hine_one').attr("style", "color:green");
        } else {
            $('.hine_one').attr("style", "color:red");
        }
    })
    initial.on('blur', function() {
        $('.hine').hide();
        if (!initial.val() == '') { //初始密码不能为空
            if ($('.hine_one').attr('style') == "color:green" && $('.hine_two').attr('style') == "color:green" && $('.hine_three').attr('style') == "color:green") {
                error1.hide()
            } else {
                error1.show();
                initial.attr({
                    "style": " border: 1px solid red; color:red"
                })
                flag = false
            }
            if (initial.val() === confirm.val()) {
                $('.error2').html('√')
            }
        } else {
            error1.show();
        }
    })
    confirm.focus(function() {
        $('.error2').html('请再次输入你的密码')
    })
    confirm.on('blur', function() {
        if (confirm.val() != '') {
            if (confirm.val() === initial.val()) {
                $('.error2').html('√')
            } else {
                $('.error2').html('密码不一致')
            }
        } else {
            $('.error2').html('密码不能为空')
        }

    })
    user.focus(function() {
        $('error3').html('推荐使用中文名来作为用户名');
    })
    user.on('input', function() {
        var userVal = user.val();
        $.ajax({
            url: 'http://192.168.11.11/tianmao/tianmao/php/registry.php',
            data: {
                name: userVal,
            },
            type: 'post'
        }).done(function(data) {
            if (data == 1) {
                $('.error3').html('该用户名被注册了').attr({
                    "style": "color:red"
                })
            } else {
                $('.error3').html('该用户名没被注册').attr({
                    "style": "color:green"
                })
                flag2 = true
            }
        })
    })
    user.blur(function() {
        var len = user.val().replace(/[\u4e00-\u9fa5]/g, '**').length; //获取字符串的长度
        if (len >= 5 && len <= 25) {
            $('.error3').html('√').attr({
                "style": "color:green"
            })
        } else {
            $('.error3').html('长度要在5-25个字符之间，中文算两个').attr({
                "style": "color:red"
            });
        }
    })
    $('#registry').on('submit', function() {
        if (initial.val() != '' && confirm.val() != '' && user.val() != '') {
            if ($('.error3').html() === '√' && $('.error2').html() === '√' && flag) {
                if (!flag2) {
                    alert('注册有问题')
                    return false
                }
            } else {
                alert('密码不能为空')
                return false
            }
        } else {
            alert('账户密码不能为空')
            return false
        }
    })

}(jQuery)