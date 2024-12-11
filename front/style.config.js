import StyleDictionary from 'style-dictionary';

StyleDictionary.registerPreprocessor({
  name: 'removeGlobalKey',
  preprocessor: (dict) => {
    const [key, ...rest] = Object.keys(dict);
    if (key === 'global') {
      return dict[key];
    }
    return dict;
  },
});

StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'tailwind/fontSize',

  filter: (token) => {
    return token.$type === 'typography';
  },
  transform: (token) => {
    const { fontWeight, fontSize, lineHeight } = token.$value;
    return [fontSize, { lineHeight, fontWeight }];
  },
});

const sdConfig = {
  log: {
    verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
  },
  preprocessors: ['removeGlobalKey'],
  source: ['./tokens/**/*.json'],
  platforms: {
    js: {
      buildPath: './styles/',
      transformGroup: 'js',
      transforms: ['tailwind/fontSize'],
      files: [
        {
          format: 'javascript/esm',
          destination: 'colors.ts',
          options: {
            minify: true,
          },
          filter: {
            $type: 'color',
          },
        },
        {
          format: 'javascript/esm',

          destination: 'fontSize.ts',
          options: {
            minify: true,
          },
          filter: {
            $type: 'typography',
          },
        },
      ],
    },
  },
};
const sd = new StyleDictionary(sdConfig);
await sd.buildAllPlatforms();
