// 1.导入模块 ES/CJS
// import xCrawl from "x-crawl";
const xCrawl = require("x-crawl");

// 2.创建一个爬虫实例
const myXCrawl = xCrawl({
  maxRetry: 3,
  intervalTime: { max: 3000, min: 2000 },
});

// 3.设置爬取任务
// 调用 startPolling API 开始轮询功能，每隔一天会调用回调函数
myXCrawl.startPolling({ d: 1 }, async (count, stopPolling) => {
  // 调用 crawlPage API 来爬取页面
  const res = await myXCrawl.crawlPage({
    targets: [
      "https://pro.jd.com/mall/active/2vx2zyXR2KhRouYS6LrSEdnLF1P5/index.html",
    ],
    viewport: { width: 1920, height: 1080 },
  });

  // 存放图片 URL 到 targets
  const targets = [];
  const elSelectorMap = ["._fig15y", "._aov0j6"];
  for (const item of res) {
    const { id } = item;
    const { page } = item.data;

    // 等待页面加载完成
    await new Promise((r) => setTimeout(r, 300));

    // 获取页面图片的 URL
    const urls = await page.$$eval(`${elSelectorMap[id - 1]} img`, (imgEls) => {
      return imgEls.map((item) => item.src);
    });
    targets.push(...urls);

    // 关闭页面
    page.close();
  }

  // 调用 crawlFile API 爬取图片
  await myXCrawl.crawlFile({ targets, storeDirs: "./uplod" });
});
