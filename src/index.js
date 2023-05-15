import { subscribeToMediaQuery, convertBreakpointsToMediaQueries } from './helpers.js';

const DEFAULT_BREAKPOINT = {
    sm: 440,
    md: 1200,
    lg: Infinity,
};

const install = function(Vue, { breakpoints = DEFAULT_BREAKPOINT, defaultBreakpoint = 'sm' } = {}) {
    let hasSetupListeners = false;

    const component = new Vue({
        data: () => ({
            currentBreakpoint: defaultBreakpoint,
        }),
    });

    Vue.mixin({
        computed: {
            $screen() {
                return component.currentBreakpoint;
            },
        },

        created() {
            if (this.$isServer) {
                component.currentBreakpoint = defaultBreakpoint;
            }
        },

        mounted() {
            if (!hasSetupListeners) {
                const mediaQueries = convertBreakpointsToMediaQueries(breakpoints);

                for (const key in mediaQueries) {
                    const mediaQuery = mediaQueries[key];

                    const enter = () => {
                        component.currentBreakpoint = key;
                    };

                    subscribeToMediaQuery(mediaQuery, enter);
                }

                hasSetupListeners = true;
            }
        },
    });
};

export default { install };
