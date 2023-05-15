# core-media
Plugin for responsive design.


## Usage

#### Installing the Plugin
Define breakpoints in the `breakpoints` option.

You can name them as you like:
`{ phone: 500, tablet: 1200, other: Infinity }`
`{ xs: 300, s: 500, m: 800, l: 1200, xl: Infinity }`

```js
import Vue from 'vue'
import CoreMedia from 'core-media'

Vue.use(CoreMedia, {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm' // для SSR
})
```


#### Using `$screen`
After installing the plugin, each Vue component instance has access to the reactive property $screen, which represents the current breakpoint.
```js
new Vue({
  template: `
    <h1>{{ $screen }}</h1>
  `,
})
```

#### Using `$screen` with computed property
The `$screen` property is fully reactive.

```js
new Vue({
  template: `
    <h1>{{ text }}</h1>
  `,
  computed: {
    text () {
      return this.$screen === 'sm' ? 'small' : 'large'
    }
  }
})
```

## SSR
When rendering on the server side, the `defaultBreakpoint` is used.


## Browser Support
This plugin uses the MatchMedia API to detect screen size changes.

So make sure to use the [matchMedia polyfill](https://github.com/paulirish/matchMedia.js)
