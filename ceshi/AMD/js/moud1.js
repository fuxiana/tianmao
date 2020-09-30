define([], function() {
    return {
        show: ! function() {
            const all = $('.all'); //全选按钮
            const inputs = $('.allselect input').not('.all') //除了全选按钮之外的input

            //1.点击全选按钮
            all.on('click', function() {
                // if ($(this).prop('checked')) { //选中
                //     inputs.prop('checked', true);
                // } else {
                //     inputs.prop('checked', false);
                // }
                inputs.prop('checked', $(this).prop('checked'));
            });

            //2.下面所有的复选框选中，全选对应的选择
            //除了全选，选中的长度等于复选框的长度，全选勾选。
            inputs.on('click', function() {
                if ($('input:checked').not('.all').size() === inputs.length) {
                    all.prop('checked', true);
                } else {
                    all.prop('checked', false);
                }
            });
            const show = $('#show');
            const prov = $('#prov');
            const city = $('#city');
            const country = $('#country');
            const btn = $('.btn');
            btn.prop('disabled', true);
            $.ajax({
                url: 'http://localhost/last/Day%2029-Day%2031_jquery/city.json',
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                // .$.each(object, [callback])通用例遍方法，可用于例遍对象和数组。
                // $.each(arr, function(index, value) { //index:数组和对象属性，value:数组或者对象的值
                // });
                $.each(data, function(index, value) {
                    //append(content|fn)向每个匹配的元素内部追加内容。
                    prov.append(`<option index="${index}">${value.name}</option>`)
                })
                let objindex = {
                    prov: '',
                    city: '',
                    country: ''
                }
                prov.on('change', function() {
                    //selected 匹配所有选中的option元素
                    //attr(name|properties|key,value|fn)设置或返回被选元素的属性值(默认和自定义的)。prop获取默认的属性
                    objindex.prov = $('#prov>option:selected').attr('index');
                    country.find('option').first().nextAll().remove(); //再次修改改变prov里面的值后，后面的城市和县区的值都将重置
                    city.find('option').first().nextAll().remove(); //再次修改改变prov里面的值后，后面的城市和县区的索引(objindex.city,country)都将重置
                    objindex.city = '';
                    objindex.country = '';
                    if (objindex.prov) {
                        // find()  搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法
                        // first() 获取第一个元素
                        // nextAll([expr])查找当前元素之后所有的同辈元素。
                        // remove([expr])从DOM中删除所有匹配的元素。不是删除子元素。
                        let cityArr = data[objindex.prov].city; //获取当前省份中的城市，返回的是个数组。
                        $.each(cityArr, function(index, value) {
                            city.append(`<option index="${index}">${value.name}</option>`)
                        })
                    }
                    if (objindex.prov && objindex.city && objindex.country) {
                        btn.prop('disabled', false)
                    } else {
                        btn.prop('disabled', true)
                    }
                })
                city.on('change', function() {
                    country.find('option').first().nextAll().remove(); //再次修改改变city里面的值后，后面的县区的值都将重置
                    objindex.country = ''; //再次修改改变city里面的值后，后面的县区的索引(objindex.country)都将重置
                    objindex.city = $('#city>option:selected').attr('index'); //将城市的索引赋值给objindex.city
                    let countryArr = data[objindex.prov].city[objindex.city].districtAndCounty; //提取县区的数组
                    $.each(countryArr, function(index, value) {
                        country.append(`<option index="${index}">${value}</option>`)
                    })
                    if (objindex.prov && objindex.city && objindex.country) {
                        btn.prop('disabled', false)
                    } else {
                        btn.prop('disabled', true)
                    }
                })
                country.on('change', function() {
                    objindex.country = $('#country>option:selected').attr('index');
                    if (objindex.prov && objindex.city && objindex.country) {
                        btn.prop('disabled', false)
                    } else {
                        btn.prop('disabled', true)
                    }
                })
                btn.on('click', function() {
                    if (objindex.prov && objindex.city && objindex.country) { //只有当这个确定按钮变成橙色之后才能提交数值给show的value
                        show.val(data[objindex.prov].name + '--' + data[objindex.prov].city[objindex.city].name + '--' + data[objindex.prov].city[objindex.city].districtAndCounty[objindex.country])
                    }
                })
            })

        }()
    }

});