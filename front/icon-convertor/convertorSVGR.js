import { transform } from '@svgr/core';
import { pascalCase } from 'es-toolkit/compat';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { optimize } from 'svgo';

import { svgoConfig } from './svgo.config.js';
import { svgrConfig } from './svgr.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JSON_FILE_PATH = path.resolve(__dirname, '../tokens/icon.json');

const iconData = await fs.readFile(JSON_FILE_PATH, 'utf-8');
const iconObj = JSON.parse(iconData);
const iconObjKeyList = Object.keys(iconObj);

const OUT_PUT_PATH = path.resolve(__dirname, '../src/components/icon/index.tsx');
const SetFileTemplate = (iconCode) => `
/**
 * Do not edit directly, this file was auto-generated.
 */

import { VariantProps, cva, cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const iconVariants = cva([], {
  variants: {
    color: {
      default: ['fill-typo stroke-typo'],
      disabled: ['fill-typo-disable stroke-typo-disable'],
      display: ['fill-typo-display stroke-typo-display'],
      success: ['fill-success stroke-success'],
      primary: ['fill-primary stroke-primary'],
      error: ['fill-error stroke-error'],
      warning: ['fill-warning stroke-warning'],
    },
    size: {
      small: ['w-6 h-6'],
      big: ['w-8 h-8'],
    },
  },
  defaultVariants: { color: 'default', size: 'small' },
});


interface IconProps extends VariantProps<typeof iconVariants> {
  className?: string;

}

${iconCode}
`;

let code = '';

for (let i = 0; i < iconObjKeyList.length; i++) {
  const key = iconObjKeyList[i];
  const icon = iconObj[key];
  const svg = icon.svg;
  const optimizedSVG = optimize(svg, svgoConfig);
  code += await transform(optimizedSVG.data, svgrConfig, { componentName: `${pascalCase(key)}` });
}

const dirPath = path.dirname(OUT_PUT_PATH);
await fs.mkdir(dirPath, { recursive: true });
await fs.writeFile(OUT_PUT_PATH, SetFileTemplate(code));
console.log('done!!!!');
