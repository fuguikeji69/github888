//当前语言
let _curLanguage = _Local.get('curLanguage');
if (!_curLanguage) {
    _curLanguage = {
        lang: 'zhCn'
    };
    _Local.set('curLanguage', _curLanguage);
}

//获取语言配置
_ApiHelper.getLanguage(_curLanguage, (langConfig) => {
    //创建Vue实例
    const app = Vue.createApp(_App);
    //创建ElementPlus实例
    if (typeof ElementPlus !== 'undefined') {
        app.use(ElementPlus, {
            locale: _curLanguage.lang == 'zhCn' ? ElementPlusLocaleZhCn : ElementPlusLocaleEn
        });
    }
    //创建i18n实例
    const i18n = new VueI18n.createI18n({
        locale: _curLanguage.lang,
        messages: {
            [_curLanguage.lang]: langConfig
        }
    });
    app.use(i18n);

    app.mount("#app");
});