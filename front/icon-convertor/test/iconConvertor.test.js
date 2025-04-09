import { transform } from '@svgr/core';
import { optimize } from 'svgo';
import { expect, test } from 'vitest';

import { svgoConfig } from '../svgo.config.js';
import { svgrConfig } from '../svgr.config.js';

const SVG_STRING = `
<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
<path stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
<path stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
</svg>`;
const OPTIMIZED_RESULT = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="current">
<path stroke="current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path stroke="current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`.replace(/\n/g, '');

const SVG = `<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
<path />
</svg>`;

const COMPONENT_CODE = `export function TestComponent({
  color,
  size,
  className,
  ...props
}: IconProps) {
  return <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" className={twMerge(cx([iconVariants({
    color,
    size
  }), className]))} {...props}><path /></svg>;
}
;`;
test('json을 SVG 변환', async () => {
  const optimized = optimize(SVG_STRING, svgoConfig).data;
  expect(optimized).toEqual(OPTIMIZED_RESULT);

  const SVGComponentCode = await transform(SVG, svgrConfig, { componentName: 'TestComponent' });
  expect(SVGComponentCode).toEqual(COMPONENT_CODE);
});
