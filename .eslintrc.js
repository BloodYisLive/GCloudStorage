module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['app'],
        alias: {
          _assets: './app/assets',
          _components: './app/components',
          //"_navigations": "./src/navigations",
          _constants: './app/constants',
          _redux: './app/redux',
          _screens: './app/screens',
        },
      },
    },
  },
};
