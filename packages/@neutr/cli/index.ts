#!/usr/bin/env node

import { Command } from 'commander';
import { crawl } from '@neutr/crawl';
import { writeSitemapCsv } from '@neutr/crawl/output/sitemap';
import chalk from 'chalk';
import validator from 'validator';

const program = new Command();

program
    .name('neutr')
    .description('NeutrPlatform CLI')
    .version('0.1.0');

program
    .command('crawl')
    .description('指定URLをクロールし、sitemap.json/csvを出力')
    .requiredOption('--url <url>', 'クロール開始URL')
    .option('--depth <depth>', 'クロール深さ', '1')
    .option('--format <type>', '出力形式 (json|csv)', 'json')
    .action(async (opts) => {
        const url = opts.url;
        const depth = parseInt(opts.depth, 10) || 1;
        const format = opts.format;
        // バリデーション
        if (!validator.isURL(url)) {
            console.log(chalk.bold.red('💥 無効なURLです！'));
            process.exit(1);
        }
        if (!Number.isInteger(depth) || depth < 0) {
            console.log(chalk.bold.red('💥 depthは0以上の整数で指定してください！'));
            process.exit(1);
        }
        if (!['json', 'csv'].includes(format)) {
            console.log(chalk.bold.red('💥 formatはjsonまたはcsvのみ対応です！'));
            process.exit(1);
        }
        console.log(`🕸️ クロール開始: ${url} (depth=${depth}, format=${format})`);
        const results = await crawl({ url, depth });
        if (format === 'csv') {
            await writeSitemapCsv(results);
            console.log('✅ sitemap.csv 出力完了');
        } else {
            console.log('✅ sitemap.json 出力完了');
        }
    });

program.parse(process.argv);
