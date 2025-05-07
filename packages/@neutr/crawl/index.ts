// @ts-expect-error Node.js require型対応
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');
// @ts-expect-error Node.js require型対応
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require('cheerio');

export interface CrawlOptions {
    url: string;
    depth?: number;
    filter?: string;
}

export async function crawl({ url, depth = 1, filter }: CrawlOptions) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const html = await page.content();
    const $ = cheerio.load(html);
    // TODO: 階層クロール・フィルタ・sitemap出力の実装
    await browser.close();
    return { url, depth, filter, links: [] };
}
