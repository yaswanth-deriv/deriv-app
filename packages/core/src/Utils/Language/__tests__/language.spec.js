import { getAllowedLanguages } from '@deriv/translations';

const languages = {
    EN: 'English',
    ES: 'Español',
    FR: 'Français',
    ID: 'Indonesia',
    IT: 'Italiano',
    PL: 'Polish',
    PT: 'Português',
    RU: 'Русский',
    VI: 'Tiếng Việt',
    ZH_CN: '简体中文',
    ZH_TW: '繁體中文',
};

describe('getAllowedLanguages method', () => {
    it('should return the desired allowed languages', () => {
        expect(getAllowedLanguages()).toEqual(languages);
    });
});
