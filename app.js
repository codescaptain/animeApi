const cheerio = require("cheerio");
const slugify = require("slugify");
const fetch = require("node-fetch");
const express = require("express");
const app = express();
require('dotenv').config()

//Kategori 10 Anime
app.get("/category/:ad", async (req, res) => {
    var kategori = req.params.ad;
    var datas = []
    await fetch(process.env.category_URI.replace('{1}', slugify(kategori)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body);
            $('div#Content div.content_wrapper.clearfix div.sections_group div.section.full-width div.section_wrapper.clearfix div.column.one.column_portfolio div.portfolio_wrapper.isotope_wrapper ul').each(function (i,e) {
             datas={
                 kategori:kategori.charAt(0).toUpperCase()+kategori.slice(1),
                 advice1:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(0).text(),
                 advice2:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(1).text(),
                 advice3:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(2).text(),
                 advice4:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(3).text(),
                 advice5:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(4).text(),
                 advice6:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(5).text(),
                 advice7:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(6).text(),
                 advice8:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(7).text(),
                 advice9:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(8).text(),
                 advice10:$(this)
                     .find('li div div.list_style_header h3 a').slice(0).eq(9).text()

             }

            });


        });
    res.send(datas);


});


// "data" kelimesinin çoğul olduğunu biliyorum
app.get("/anime/:ad", async (req, res) => {
    var ad = req.params.ad;
    var datas = []


    await fetch(process.env.anime_URI.replace('{0}', slugify(ad)))
        .then(response => response.text())
        .then(body => {

            const $ = cheerio.load(body);
            $('div.series-page.film-bilgileri').each(function (i, e) {
                var kategori = [];
                $(this).find('div div[class=col-lg-10] div[class=movies-data] div[class=category] a').each(function (index, element) {
                    kategori[index] = $(this).text()
                });

                var aktor = [];
                $(this).find('div div[class=col-lg-10] div[class=movies-data] div[class=cast] div.actors.list a').each(function (index, element) {
                    aktor[index] = $(this).text()
                });
                // var a = $(this).find('div div[class=col-lg-10] div[class=movies-data] div[class=category] a').slice(0).length;
                // for (let i = 0; i < a; i++)
                //     text += $(this).find('div div[class=col-lg-10] div[class=movies-data] div[class=category] a').slice(0).eq(i).text() + ",";
                //
                //
                // var b = $(this).find('div div[class=col-lg-10] div[class=movies-data] div[class=cast] div.actors.list a').slice(0).length;
                // for (let i = 0; i < b; i++)
                //     text2 += $(this).find('div div[class=col-lg-10] div[class=movies-data] div[class=cast] div.actors.list a').slice(0).eq(i).text() + ","

                datas = {
                    animeAdi: ad.charAt(0).toUpperCase() + ad.slice(1),
                    kategori: kategori.toString(),
                    aktorListesi: aktor.toString(),
                    animeDurum: $(this)
                        .find('div div div div div[class=bilgi-icon] span')
                        .text(),
                    iMDB: $(this)
                        .find('div div[class=col-lg-10] div div div[class=imdb-count]')
                        .text()
                        .match(/(.*)\s(.*)\s(.*)/)[1],
                    yapimYili: $(this)
                        .find('div div[class=col-lg-10] div div ul li[class=release] span a')
                        .text(),
                    ulke: $(this)
                        .find('div div[class=col-lg-10] div div ul li[class=country] span a')
                        .text(),
                    bolumBasinaSure: $(this)
                        .find('div div[class=col-lg-10] div div ul li[class=time] ')
                        .text(),
                    animeAciklama: $(this)
                        .find('div div[class=col-lg-10] div[class=movies-data] div[class=description]')
                        .text()


                }

            })
        });


    res.send(datas);
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Sunucu Ayakta")
});