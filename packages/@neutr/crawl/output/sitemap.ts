export type SitemapEntry = {
    url: string;
    status: number;
    title?: string;
    depth: number;
    parent?: string;
    redirectedTo?: string;
};

// @ts-expect-error Node.js型対応
import { promises as fs } from 'fs';
// @ts-expect-error Node.js型対応
import * as path from 'path';

export async function writeSitemapJson(entries: SitemapEntry[], outputDir = 'output') {
    const outPath = path.join(outputDir, 'sitemap.json');
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outPath, JSON.stringify(entries, null, 2), 'utf-8');
    return outPath;
}

// CSV出力関数
export async function writeSitemapCsv(entries: SitemapEntry[], outputDir = 'output') {
    const outPath = path.join(outputDir, 'sitemap.csv');
    await fs.mkdir(outputDir, { recursive: true });
    const header = 'url,status,title,depth,parent,redirectedTo';
    const rows = entries.map(e =>
        [e.url, e.status, e.title ?? '', e.depth, e.parent ?? '', e.redirectedTo ?? ''].join(',')
    );
    await fs.writeFile(outPath, [header, ...rows].join('\n'), 'utf-8');
    return outPath;
}
