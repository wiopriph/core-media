import Vue from 'vue'
import App from './App'
import Plugin from '../src/index.js'

Vue.use(Plugin)

new Vue({
    el: '#app',
    render(h) {
        return h(App)
    }
})
