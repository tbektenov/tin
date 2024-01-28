const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware'); 

i18next.use(Backend).use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'ru'],
        backend: {
            loadPath: './translations/{{lng}}/translation.json'
        }
    });

module.exports = { i18next, middleware }