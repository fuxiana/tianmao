;
! function($) {
    let sid1 = location.search.substring(1).split('=')[1];
    let btn_top = $('.btn_top');
    let btn_bottom = $('.btn_bottom');
    if (!sid1) {
        sid1 = 1;
    }
    console.log(sid1)
    $.ajax({
        url: 'http://192.168.11.11/tianmao/tianmao/php/detail.php',
        data: {
            sid: sid1
        },
        dataType: 'json'
    }).done(function(data) {
        $('.main_left_imgs').children('img').attr('src', data.url);
        $('title').html(data.title);
        $('.main_right').children('h3').html(data.title);
        $('.price').children('span').children('i').html(data.price)
    })
    btn_top.click(function() {
        $('.number input').val(Number($('.number input').val()) + 1);
    })
    btn_bottom.click(function() {
        $('.number input').val(Number($('.number input').val()) - 1);
        if ($('.number input').val() == 0) {
            $('.number input').val(1)
        }
    })
}(jQuery)