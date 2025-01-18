const template = (variables, { tpl }) => {
  return tpl`
export function ${variables.componentName} ({color, size, className,...props} : IconProps){
  return ${variables.jsx}};
`;
};

export const svgrConfig = {
  template,
  icon: true,
  typescript: true,

  svgProps: {
    className: '{twMerge(cx([iconVariants({ color, size }), className]))}',
  },
  plugins: ['@svgr/plugin-jsx'],
  jsxRuntime: 'automatic',
};
