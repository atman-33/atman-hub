import type { Config } from '@react-router/dev/config';
import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import pkg from './package.json';

export default {
  basename: import.meta.env.PROD ? `/${pkg.name}/` : '/',
  async buildEnd(args): Promise<void> {
    if (!args.viteConfig.isProduction) return;
    const buildPath = args.viteConfig.build.outDir;
    await copyFile(
      path.join(buildPath, 'index.html'),
      path.join(buildPath, '404.html'),
    );
  },
  ssr: false,
  // NOTE: prendering with basename and ssr:false renders 404s for dynamic routes
  // https://github.com/remix-run/react-router/pull/13791
  // prerender: ["/sitemap.xml", "/robots.txt"],
} satisfies Config;
