const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const topList = require('../model/topList').topList;
router.get("/myanimelist", (req, res) => { 
    const thumbnail = []
    try {
        axios("https://myanimelist.net/topanime.php").then((item) => { 
            const html = item.data 
            const $ = cheerio.load(html)
            $(".ranking-list", html).each(function (index) {
                // if(index > 9) return false
                const image = $(this).find("a > img").attr("data-src")
                const name = $(this).find("div > h3 > a").text()
                const url = $(this).find("div > h3 > a").attr("href")
                const rank = $(this).find("td > span").text()
                const score_parent = $(this).children("td").eq(2)
                const score = score_parent.find("span").text()
                thumbnail.push({
                    name: name,
                    url: url,
                    image: image,
                    rank: rank,
                    score: score
                })
            })
            //save into database
            thumbnail.forEach((item) => {
                const top = new topList({
                    name: item.name,
                    url: item.url,
                    imageUrl: item.image,
                    rank: item.rank,
                    score: item.score
                })
                top.save()
            })

            console.log(thumbnail)
            res.status(200).json(thumbnail.slice(0, 10))
        })
    } catch (error) { 
        res.status(500).send(error);
    }
})

module.exports = router;