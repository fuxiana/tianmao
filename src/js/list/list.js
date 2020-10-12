! function($) {
    let originalArray = []; //原数组
    let array = []; //排序后的数组
    let newarray = []; //备用数组
    let prev = null; //前一个商品价格
    let next = null; //后一个商品价格
    const ul = $('.main_list_content ul')
    let flag = true; //给个标记，后面升序，降序有用
    //渲染列表的数据
    $.ajax({
            url: 'http://192.168.11.11/tianmao/tianmao/php/list.php',
            dataType: 'json'
        }).done(function(data) {
            console.log(data)
            let gitli = '';
            $.each(data, function(index, value) {
                gitli += `
            <li>
            <a href="detail.html?sid=${value.sid}" target="_blank">
                <img class="lazy" data-original="${value.url}" alt="">
                <span>￥<i class="price">${value.price}</i></span>
                <br>
                <em>${value.title}</em>
                <p>销量有<strong class="sales">${value.sales}</strong>件</p>
            </a>
           </li>
            `
            })
            ul.html(gitli);
            //添加懒加载
            $(function() {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });
            //将页面的li元素加载到三个数组中
            $('.main_list_content li').each(function(index, value) {
                originalArray[index] = $(this);
                array[index] = $(this);
                newarray[index] = $(this)
            })
        })
        //2.分页思路:根据传输的页码，后端返回对应的接口数据，渲染出来。
    $('.page').pagination({
        pageCount: 4, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页', //将图标改成上一页下一页。
        nextContent: '下一页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取当前的点击的页码。
            $.ajax({
                url: 'http://192.168.11.11/tianmao/tianmao/php/list.php',
                data: {
                    page: api.getCurrent() //传输数据
                },
                dataType: 'json'
            }).done(function(data) {
                let gitli = '';
                $.each(data, function(index, value) {
                    gitli += `
                    <li>
                    <a href="detail.html?sid=${value.sid}" target="_blank">
                        <img class="lazy" data-original="${value.url}" alt="" >
                        <span>￥<i class="price">${value.price}</i></span>
                        <br>
                        <em>${value.title}</em>
                        <p>销量有<strong class="sales">${value.sales}</strong>件</p>
                    </a>
                   </li>
                    `;
                });
                ul.html(gitli);
                //将页面的li元素加载到三个数组中
                $('.main_list_content li').each(function(index, value) {
                        originalArray[index] = $(this);
                        array[index] = $(this);
                        newarray[index] = $(this)
                    })
                    //添加懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            });
        }

    });

    //默认排序
    $('.synthesize').click(function() {
            flag = true; //重置标记
            $.each(originalArray, function(index, value) {
                ul.append(value);
            })
            $('.price_top').removeClass('active1').siblings().removeClass('active2') //取消掉价格的css样式
            $(this).addClass('active').siblings().removeClass('active'); //给点击的排序添加css样式表，其他的排序css样式删掉
        })
        //销量排序
    $('.sales').click(function() {
            //冒泡排序，两者之间两两比较
            flag = true; //重置标记
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = i + 1; j < array.length; j++) {
                    prev = parseFloat(array[i].find('.sales').html());
                    next = parseFloat(array[j].find('.sales').html());
                    if (prev > next) {
                        let temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
            }
            $.each(array, function(index, value) {
                $('.main_list_content ul').append(value) //把排列好的值重新渲染一边给到结构中
            })
            $('.price_top').removeClass('active1').siblings().removeClass('active2');
            $(this).addClass('active').siblings().removeClass('active');
        })
        //价格的排序，我把它放在了同一个结构里，首次点击是升序，点击两次是降序
    $('.price').click(function() {
        if (flag) { //价格的升序
            for (let i = 0; i < array.length - 1; i++) {
                for (let j = i + 1; j < array.length - 1; j++) {
                    prev = parseFloat(array[i].find('.price').html());
                    next = parseFloat(array[j].find('.price').html());
                    if (prev > next) {
                        let temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
            }
            $.each(array, function(index, value) {
                $('.main_list_content ul').append(value)
            })
            flag = false;
            $(this).addClass('active').siblings().removeClass('active')
            $(this).children('span').eq(0).addClass('active1').siblings().removeClass('active2') //价格升序的css样式显示，降序影藏
        } else { //价格的降序
            for (let i = 0; i < newarray.length - 1; i++) {
                for (let j = i + 1; j < newarray.length - 1; j++) {
                    prev = parseFloat(newarray[i].find('.price').html());
                    next = parseFloat(newarray[j].find('.price').html());
                    if (prev < next) {
                        let temp = newarray[i];
                        newarray[i] = newarray[j];
                        newarray[j] = temp;
                    }
                }
            }
            $.each(newarray, function(index, value) {
                $('.main_list_content ul').append(value)
            })
            flag = true;
            $(this).addClass('active').siblings().removeClass('active')
            $(this).children('span').eq(1).addClass('active2').siblings().removeClass('active1') //价格降序的css样式显示，升序影藏
        }
    })
}(jQuery);