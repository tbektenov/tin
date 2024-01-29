const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware'); 

/**
 * 
 * This code is to use and access i18n library
 * Currently, you can't choose language from pagem but you can change it in your browser settings.
 * Only "About" page has translation:
 * Supported languages: en, ru
 * 
 */

i18next.use(Backend).use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'ru'],
        backend: {
            loadPath: './translations/{{lng}}/translation.json'
        }
    });

module.exports = { i18next, middleware }