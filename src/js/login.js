! function($) {
    //点击跳转登入方式
    var flag = 1
    if (flag === 1) {
        $('.error').hide();
    }
    $('.password').click(function() {
        $('.main_content').show().siblings('.main_content2').hide();
    })
    $('.note').click(function() {
        $('.main_content2').show().siblings('.main_content').hide();
    })
    $('.main_content button').click(function() {
        $.ajax({
            type: 'post',
            url: 'http://192.168.11.11/tianmao/tianmao/php/login.php',
            data: {
                user: $('#username').val(),
                pass: $('#password').val()
            }
        }).done(function(data) {
            if (!data) {
                $('.error').show();
                flag = 2
                console.log(data)
                $('#username').val('');
                $('#password').val('');
            } else {
                // localStorage.setItem('name', $('#username').val())
                location.href = "http://192.168.11.11/tianmao/tianmao/src/index1.html"
            }
        })
    })
}(jQuery)