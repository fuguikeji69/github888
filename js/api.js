/**
 * Api
 */
const _ApiHelper = {
    getLanguage(language, callback) {
        if (!language) language = {
            lang: 'zhCn'
        };
        $.ajax({
            url: `/js/i18n/lang/${language.lang}.json`,
            type: 'get',
            success(res) {
                callback && callback(res);
            },
            error() {
                callback && callback(null);
            }
        });
    }
}