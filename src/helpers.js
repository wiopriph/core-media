function camelToHyphen(str) {
    return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`).toLowerCase();
}

function objToMq(obj) {
    let mq = '';
    const features = Object.keys(obj);

    features.forEach(function(feature, index) {
        let value = obj[feature];

        feature = camelToHyphen(feature);

        // Добавление px
        if (/[height|width]$/.test(feature) && typeof value === 'number') {
            value = `${value}px`;
        }

        if (value === true) {
            mq += feature;
        } else if (value === false) {
            mq += `not ${feature}`;
        } else {
            mq += `(${feature}: ${value})`;
        }

        if (index < features.length - 1) {
            mq += ' and ';
        }
    });

    return mq;
}

function jsonToMq(query) {
    let mq = '';

    if (typeof query === 'string') {
        return query;
    }

    // Обработка массива медиа-запросов
    if (query instanceof Array) {
        query.forEach(function(q, index) {
            mq += objToMq(q);

            if (index < query.length - 1) {
                mq += ', ';
            }
        });

        return mq;
    }

    // Обработка одного медиазапроса
    return objToMq(query);
}


export function convertBreakpointsToMediaQueries(breakpoints) {
    const keys = Object.keys(breakpoints);
    const values = keys.map(key => breakpoints[key]);
    const breakpointValues = [0, ...values.slice(0, -1)];

    return breakpointValues.reduce((sum, value, index) => {
        const options = Object.assign(
            {
                minWidth: value,
            },
            index < keys.length - 1 ? { maxWidth: breakpointValues[index + 1] - 1 } : {},
        );

        const mediaQuery = jsonToMq(options);

        return Object.assign(
            sum,
            {
                [keys[index]]: mediaQuery,
            },
        );
    }, {});
}

export function subscribeToMediaQuery(mediaQuery, enter) {
    const mql = window.matchMedia(mediaQuery);
    const cb = ({ matches }) => {
        if (matches) { enter(); }
    };

    mql.addListener(cb);
    cb(mql);
}
