#!/usr/bin/env node

import { Command } from 'commander';
import { crawl } from '@neutr/crawl';

const program = new Command();

program
    .name('neutr')
    .description('NeutrPlatform CLI')
    .version('0.1.0');

program
    .command('crawl')
    .description('指定URLをクロールし、sitemap.jsonを出力')
    .requiredOption('--url <url>', 'クロール開始URL')
    .option('--depth <depth>', 'クロール深さ', '1')
    .action(async (opts) => {
        const url = opts.url;
        const depth = parseInt(opts.depth, 10) || 1;
        console.log(`🕸️ クロール開始: ${url} (depth=${depth})`);
        await crawl({ url, depth });
        console.log('✅ sitemap.json 出力完了');
    });

program.parse(process.argv);
