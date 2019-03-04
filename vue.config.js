module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/electron/background.ts'
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'assets/locales',
      enableInSFC: false
    }
  },
};
