const axios = require("axios");
const cheerio = require("cheerio");
const { amazonConfig } = require("./scrape.config");

const amazonUrl = (searchTerm, pageNumber) => {
  return `https://www.amazon.in/s?k=${searchTerm}${
    pageNumber ? "&page=" + pageNumber : ""
  }`;
};

const getProductsFromHtml = async (html) => {
  const {
    listItemSelector,
    titleSelector,
    linkSelector,
    priceSelector,
    mrpSelector,
    imageSelector,
    ratingsSelector,
    ratingsCountSelector,
  } = amazonConfig;

  const $ = cheerio.load(html);
  const products = [];

  $(listItemSelector).each((i, el) => {
    const title = $(el).find(titleSelector).text();
    const link = $(el).find(linkSelector).attr("href");
    const price = $(el).find(priceSelector).text().replace(",", "");
    const mrp = $(el)
      .find(mrpSelector)
      .text()
      .replace("₹", "")
      .replace(",", "");
    const image = $(el)
      .find(imageSelector)
      .attr("src")
      .replace("_AC_UY218_", "_SL1200_");
    const ratings =
      $(el).find(ratingsSelector).text().split(" out of ")[0] + "/5";

    const ratingsCount = $(el).find(ratingsCountSelector).text();
    if (
      link === "#" ||
      price === "" ||
      title === "" ||
      mrp === "" ||
      ratings === ""
    )
      return;
    products.push({
      title,
      link: "https://www.amazon.in" + link,
      price: parseInt(price),
      mrp: parseInt(mrp),
      ratings,
      image,
      ratingsCount: ratingsCount ? parseInt(ratingsCount) : 0,
    });
  });
  return products;
};

const getHtml = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36",
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching", url);
  }
};

module.exports = { getProductsFromHtml, getHtml, amazonUrl };
