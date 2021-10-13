import $ from 'jquery'


// export const REGIONS = { "GB": {}, 'SE': {}, 'DK': {}, 'EU': {}, 'ES': {}, 'DE': {}, 'IT': {}, 'FR': {} };
export const REGIONS = { "GB": {} }
// export const REGIONS = ['GB', 'FR'];
export let URLPREFIX = "https://www.uniqlo.com";
if (window.location.href.includes("prodtest")) {
    URLPREFIX = "https://prodtest.uniqlo.com";
}

export const fetchName = async (data) => {
    let name;
    try {
        name = await $(data)[0].childNodes[1].childNodes[5].childNodes[1].innerText;
    } catch (err) {
        return "undefined"
    }
    return name;
}

export const fetchPrice = async (data) => {
    let price;
    try {
        price = await $(data)[0].childNodes[1].childNodes[5].childNodes[3].childNodes[1].innerText;
    } catch (err) {
        return "undefined"
    }
    return price;
}

export const fetchSalePrice = async (data) => {
    let salePrice;
    try {
        salePrice = await $(data)[0].childNodes[1].childNodes[5].childNodes[3].childNodes[3].innerText.trim();
    } catch (err) {
        return "undefined"
    }
    return salePrice;
}

export const fetchSwatches = async (data) => {
    let swatches;
    try {
        swatches = await $(data)[0].childNodes[1].childNodes[9].childNodes[1].outerHTML;
    } catch (error) {
        return null
    }
    return swatches;
}

export const fetchImage = (data) => {
    let image;
    try {
        image = $(data)[0].childNodes[1].childNodes[3].childNodes[2].childNodes[1].src;
    } catch (err) {
        return null
    }
    return image;
}

export const fetchURL = async (data) => {
    let url
    try {

        url = await $(data)[0].childNodes[1].childNodes[5].childNodes[1].childNodes[1].childNodes[1].href;
    } catch (err) {
        return null;
    }
    return url;
}



