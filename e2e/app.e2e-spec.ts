import { DigitalContentPage } from './app.po';

describe('abp-zero-template App', function () {
    let page: DigitalContentPage;

    beforeEach(() => {
        page = new DigitalContentPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        page.getCopyright().then(value => {
            expect(value).toEqual(new Date().getFullYear() + ' © DigitalContent.');
        });
    });
});
