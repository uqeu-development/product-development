import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../../context';
import { REGIONS } from '../../constants';
import $ from 'jquery'
import axios from 'axios';


const Output = () => {

    const jsonRef = useRef();
    const { fileData, skus, setSkus, setConsoleMsg, setJson, json } = useAppContext();
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(true)


    useEffect(() => {
        if (fileData !== "") {

            setConsoleMsg('formating...')
            // const skus_to_array = [];

            // for (let i = 0; i < fileData.length; i++) {
            //     skus_to_array.push(fileData[i].skus)
            // }
            // setSkus(skus_to_array);

            let formatedData = {};
            for (let i = 0; i < fileData.length; i++) {
                for (let r = 0; r < Object.keys(REGIONS).length; r++) {
                    const region = Object.keys(REGIONS)[r];
                    fileData[i] = { ...fileData[i], [region]: {} };
                    formatedData[fileData[i].sku] = fileData[i];
                }
            }

            setSkus(fileData);


        }
    }, [fileData])



    const getProductInfo = async (link, region) => {
        let name = "";
        let price = "";
        let salePrice = "";
        let swatches = "";
        let image = "";
        let url = "";
        let price_int = '';
        let salePrice_int = '';
        let sku = ''

        try {
            let parser = new DOMParser();
            const response = await axios.get(link);
            let data = parser.parseFromString(response.data, 'text/html');

            // const datasets = data.querySelector('.productTile__swatchList a')?.dataset || "";
            // // console.log(datasets)

            // Object.keys(datasets).map((keys) => {

            //     delete datasets[keys]
            // })

            sku = data.querySelector('[data-dlmasterid]')?.dataset?.dlmasterid;
            name = data.querySelector('.productTile__link')?.title;
            price = data.querySelector('.product-standard-price')?.innerText || data.querySelector('.product-current-price')?.innerText;
            salePrice = data.querySelector('.product-sales-price')?.innerText || '';
            swatches = data.querySelector('.productTile__swatchList')?.innerHTML;


            image = data.querySelector('.productTile__image')?.src;
            url = data.querySelector('.productTile__link')?.href;
            url = new URL(url);
            url = "https://www.uniqlo.com" + url.pathname;

            if (region === "GB") {
                price_int = parseFloat(price.replace('£', ''));
                salePrice_int = parseFloat(salePrice.replace('£', ''));
            } else if (region === "DK") {
                price_int = parseFloat(price.replace('DKK', ''));
                salePrice_int = parseFloat(salePrice.replace('DKK', ''));
            } else if (region === "SE") {
                price_int = parseFloat(price.replace('kr', ''));
                salePrice_int = parseFloat(salePrice.replace('kr', ''));
            } else {
                const formatedPrice = price.replace(',', '.');
                const formatedSalePrice = salePrice.replace(',', '.');
                price_int = parseFloat(formatedPrice.replace('€', ''));
                salePrice_int = parseFloat(formatedSalePrice.replace('€', ''));
            }


            return { sku, name, price, salePrice, price_int, salePrice_int, image, url, swatches };
        } catch (err) {
            setError(link)
            console.log(err)
        }
        return { name, price, salePrice, price_int, salePrice_int, image, url, swatches };

    }

    const fetchAllProducts = async () => {
        setConsoleMsg(`${skus.length} skus...`)
        const productInfo = skus;
        // const r = ["GB", "SE", "DK", "EU", "DE", "ES", "IT", "FR"]
        const r = ["GB"]
        const currentProducts = [];
        for await (let region of r) {
            setConsoleMsg(`fetching products for ${region}...`)

            let link = `https://www.uniqlo.com/on/demandware.store/Sites-${region}-Site/default/Recommendations-Ajax?item0=`


            // const promises = await Object.keys(skus).map(async (sku) => {
            //     const product = await getProductInfo(link + sku, region);
            // })

            const promises = await skus.map(async (sku, index) => {
                const product = await getProductInfo(link + sku.sku, region);
                currentProducts.push({ ...product, ...skus[index] })
            })

            const j = await Promise.all(promises);
            setJson(currentProducts);
        }


    }

    useEffect(() => {
        if (skus.length !== 0) {
            setConsoleMsg("creating JSON object for output...");
            fetchAllProducts().then(() => setFetching(false))
        }
    }, [skus])


    useEffect(() => {
        if (error !== "") {
            // setConsoleMsg(`failed to fetch ${error}...`)
        }
    }, [error])


    useEffect(() => {
        if (fetching === false) {
            setConsoleMsg('fetching finished...')
            jsonRef.current.value = JSON.stringify(json);
        }
    }, [fetching])



    return (
        <div className="output-container">
            <h3>Output JSON</h3>
            <textarea ref={jsonRef}></textarea>
        </div>
    )
}

export default Output;