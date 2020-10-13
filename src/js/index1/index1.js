require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jq_cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jq_lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: {
        'jq_cookie': {
            deps: ['jquery'],
            exports: 'jq_cookie'
        },
        'jq_lazyload': {
            deps: ['jquery'],
            exports: 'jq_lazyload'
        }
    }
});
require(['jquery', 'jq_lazyload', 'jq_cookie', 'jq_cookie'], function() {
    require(['moud1'])
})