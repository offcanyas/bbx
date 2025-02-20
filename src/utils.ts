export function getUrlParam(variable) {
    // remove ? with substring
    const query = window.location.hash.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return '';
}

export function getAllUrlParams() {
    // remove ? with substring
    const query = window.location.hash.substring(1);
    const vars = query ? query.split('&') : [];
    const obj = {};
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0])) {
            obj[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    return obj;
}

export function setUrlParams(param, array) {
    // compare the active params to querystring
    const allSearch = getAllUrlParams();
    if (array.length === 0) {
        delete allSearch[param]
    } else {
        allSearch[param] = array.join(',');
    }
    let newHash = "";
    Object.keys(allSearch).forEach(function (param, index) {
        newHash += (index === 0 ? "" : "&") + param + "=" + allSearch[param];
    });
    history.pushState("", "", newHash ? "#" + newHash : " ");
}

export const titleMatch = (tag, product) => {
    let countMatched = 0;

    if (tag.matcher.includes('chrome')
        && product.cats
        && product.cats.includes(3)) {
        countMatched++;
    }
    tag.matcher.map(matchy => {
        if (matchy
            // ignore ignores
            && !Array.isArray(matchy)
            // matchy should be inside the title
            && product.matchTo.includes(matchy.toLowerCase())
        ) {

            let shouldIgnore = false;
            tag.ignores.map(ignore => {
                if (product.matchTo.includes(ignore.toLowerCase())) {
                    shouldIgnore = true;
                }
            });
            if (!shouldIgnore) {
                countMatched++;
            }
        }
    })
    return countMatched;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getHRDate(dateStr) {
    const now = new Date(dateStr);
    const year = now.getFullYear();
    const month = ((now.getMonth() + 1) + '').padStart(2, '00');
    const day = ((now.getDate()) + '').padStart(2, '00');
    const hour = ((now.getHours()) + '').padStart(2, '00');
    const minute = ((now.getMinutes()) + '').padStart(2, '00');
    return `${day}.${month}.${year} ${hour}:${minute}`;
}

export const getDateTime = (hrDate) => {
    const date = hrDate.split(' ');
    const dmy = date[0].split('.');
    return `${dmy[2]}-${dmy[1]}-${dmy[0]}T${date[1]}:00+02:00`;
}

export function getLatestStateOfToday(product, hrCompareDate) {
    let stateId = product.state.id;

    Object.entries(product.history).map((entry) => {
        if (entry[0].startsWith(hrCompareDate)) {
            stateId = entry[1];
        }
    });

    return stateId;
}

export const graphql = async (query) => {
    return await fetch('https://api.bbx.watch/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // query GetLearnWithJasonEpisodes($now: DateTime!) {
        // allEpisode(limit: 10, sort: {date: ASC}, where: {date: {gte: $now}}) {
        body: JSON.stringify({
            query,
        })
    })
        .then((res) => res.json())
        .then((res) => res.data)
}

export const jsVoid = 'javascript:void(0)';

