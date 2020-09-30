require.config({ //配置模块的语句
    // daseUrl: '', //基路径，大家共有的前面路径。
    paths: { //路径，不能带后缀名。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jq_cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jq_lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: { //让不支持AMD规范的模块支持AMD
        'jq_cookie': {
            deps: ['jquery'], //依赖的模块
            exports: 'jq_cookie' //暴露的名称
        },
        'jq_lazyload': {
            deps: ['jquery'], //依赖的模块
            exports: 'jq_cookie' //暴露的名称
        }

    }
})
require(['jquery'], function() {
    require(['moud1'])
})