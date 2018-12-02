'use strict';

var Vue = require('vue');
// Vue-loader now uses ES modules by default, so we need to specify
// the default attribute or else we get errors about missing template or render functions
var App = require('../components/app.vue').default;


var app = new Vue({
    el: '#app',
    components: {
        App: App
    },
    template: '<App></App>'
});

module.exports = app;