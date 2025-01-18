export const svgoConfig = {
  plugins: [
    {
      name: 'convertFillAndStroke',
      description: 'convert fill and stroke to none and currentColor',
      fn: () => {
        return {
          element: {
            enter: (node) => {
              node.attributes.fill = 'none';
              node.attributes.stroke = 'current';
            },
          },
        };
      },
    },
  ],
};
