const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const kmsList = require('../model/topList').kmsList;

router.get("/kms", (req, res) => { 
    const thumbnailKms = []
    try {
         axios("https://kimetsu-no-yaiba.fandom.com/wiki/Kimetsu_no_Yaiba_Wiki").then((item) => {
            const html = item.data;
            const $ = cheerio.load(html);
            $(".portal", html).each(function (index) {
                const name = $(this).find("a").attr("title")
                const url = $(this).find("a").attr("href")
                const image = $(this).find("a > img").attr("data-src")
                thumbnailKms.push({
                    name: name,
                    url: url,
                    image : image
                })
            })
             thumbnailKms.forEach((item) => { 
                    const top = new kmsList({
                        name: item.name,
                        url: item.url,
                        imageUrl: item.image
                    })
                    top.save()
             })
             
             console.log(thumbnailKms)
             res.status(200).json(thumbnailKms)
        })
        
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;