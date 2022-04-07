const delay = require("delay");
const Product = require("../db/productSchema");
const { getProductsFromHtml, getHtml, amazonUrl } = require("./utils");

const smartphone_brands = [
  "apple",
  "vivo",
  "oneplus",
  "mi",
  "redmi",
  "oppo",
  "motorola",
  "samsung",
  "nokia",
  "huawei",
  "asus",
  "realme",
  "micromax",
];

const scrapeAmazonPage = async (url) => {
  try {
    const html = await getHtml(url);
    const products = await getProductsFromHtml(html);
    return products;
  } catch (err) {
    console.log(err);
  }
};

const scrapeSmartPhones = async () => {
  const pages = [1, 2, 3];

  for (let brand of smartphone_brands) {
    for (let page of pages) {
      try {
        const url = amazonUrl(brand + "+smartphone", page);
        const products = await scrapeAmazonPage(url);
        await Product.insertMany(products);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("sleeping for 10 seconds");
        await delay(10000);
      }
    }
  }
};

module.exports = scrapeSmartPhones;
