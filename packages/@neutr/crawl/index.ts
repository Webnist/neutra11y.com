// --- Crawler Core 設計図 ---
// 1. crawl(url, options) を再帰的に呼び出し、depth制御・同一URLスキップ・ドメイン内制限・allowlist対応
// 2. <a href>リンクを抽出し、次のクロール対象URLリストを生成
// 3. クロール結果をsitemap形式で出力（JSON/CSV/XML）
// 4. filter/allowlist/denylist等のオプションも今後拡張

// @ts-expect-error Node.js require型対応
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');
// @ts-expect-error Node.js require型対応
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require('cheerio');

// output/sitemap.ts からSitemapEntry型とwriteSitemapJsonをインポート
import { SitemapEntry, writeSitemapJson } from './output/sitemap';

export interface CrawlOptions {
    url: string;
    depth?: number;
    filter?: string;
    allowlist?: string[];
    visited?: Set<string>;
    currentDepth?: number;
}

// ドメイン内判定
function isSameDomain(base: string, target: string): boolean {
    try {
        const baseUrl = new URL(base);
        const targetUrl = new URL(target, baseUrl);
        return baseUrl.hostname === targetUrl.hostname;
    } catch {
        return false;
    }
}

// <a href>リンク抽出
function extractLinks($: any, baseUrl: string): string[] {
    const links: string[] = [];
    $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href) {
            try {
                const abs = new URL(href, baseUrl).toString();
                links.push(abs);
            } catch { }
        }
    });
    return links;
}

// URL正規化（末尾スラッシュ除去、ただしルートは除外）
function normalizeUrl(url: string): string {
    try {
        const u = new URL(url);
        if (u.pathname !== '/' && u.pathname.endsWith('/')) {
            u.pathname = u.pathname.replace(/\/$/, '');
        }
        return u.toString();
    } catch {
        return url;
    }
}

export async function crawl({ url, depth = 1, filter, allowlist = [], visited = new Set(), currentDepth = 0, parent }: CrawlOptions & { parent?: string }) {
    const normUrl = normalizeUrl(url);
    if (currentDepth > depth || visited.has(normUrl)) return [];
    visited.add(normUrl);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(normUrl, { waitUntil: 'networkidle2' });
    const html = await page.content();
    const $ = cheerio.load(html);
    const links = extractLinks($, normUrl).map(normalizeUrl).filter(link => isSameDomain(normUrl, link));
    // TODO: status, title, redirectedTo取得も拡張
    const entry: SitemapEntry = {
        url: normUrl,
        status: 200, // 仮
        title: $('title').text() || undefined,
        depth: currentDepth,
        parent,
        issues: [],
    };
    let results: SitemapEntry[] = [entry];
    if (currentDepth < depth) {
        for (const link of links) {
            if (!visited.has(link)) {
                const childResults = await crawl({ url: link, depth, filter, allowlist, visited, currentDepth: currentDepth + 1, parent: normUrl });
                results = results.concat(childResults);
            }
        }
    }
    await browser.close();
    // ルート呼び出し時のみ出力
    if (currentDepth === 0) {
        await writeSitemapJson(results);
    }
    return results;
}
