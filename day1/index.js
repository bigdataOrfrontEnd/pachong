var http = require("http");
var cheerio = require("cheerio");
http.get("http://tuijian.hao123.com", function (res) {
  var data = "";
  res.on("data", function (chunk) {
    data += chunk;
  });
  res.on("end", function () {
    filter(data); //这个返回的是整个页面的数据,需要主要一点是res.on中的值data和end分别代表了什么
  });
});
function filter(data) {
  var result = {};
  var $ = cheerio.load(data);
  var temp_div = $(".hotsearch-box");

  var temp_title = [];
  temp_div.each(function (index, item) {
    temp_title.push($(item).find("h3").text());
    console.log(temp_title);
  });
}
