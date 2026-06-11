import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BrandedFooter extends NavigationMixin(LightningElement) {

    // Secondary navigation — semicolon-separated sections, pipe-separated items within each section
    @api sectionNames = '';
    @api navigationNames = '';
    @api navigationLinks = '';
    @api columnTypes = '';

    // Internal page API names for the three fixed meta links.
    // Enter the page's API name as set in Experience Builder (e.g. 'Privacy').
    // NavigationMixin resolves these to correct site-relative URLs automatically.
    @api privacyPageName = 'Privacy';
    @api cookiesPageName = 'Cookies';
    @api accessibilityPageName = 'Accessibility_Statement';

    // Licence bar
    @api hideLicenceBar = false;
    @api licenceBarPrefix = 'All content is available under the ';
    @api licenceBarSuffix = ', except where otherwise stated';

    // Colour overrides — hex values set as CSS custom properties on the host element
    @api backgroundColour;
    @api barBackgroundColour;
    @api headingColour;
    @api navLinkColour;
    @api metaLinkColour;
@api focusColour;

    @track finalNavData = [];
    @track privacyUrl = '#';
    @track cookiesUrl = '#';
    @track accessibilityUrl = '#';

    connectedCallback() {
        this._buildNavData();
        this._resolveMetaLinkUrls();
    }

    renderedCallback() {
        const host = this.template.host;
        if (this.backgroundColour)  host.style.setProperty('--branded-footer-bg', this.backgroundColour);
        if (this.barBackgroundColour) host.style.setProperty('--branded-footer-bar-bg', this.barBackgroundColour);
        if (this.headingColour)     host.style.setProperty('--branded-footer-heading', this.headingColour);
        if (this.navLinkColour)     host.style.setProperty('--branded-footer-nav-link', this.navLinkColour);
        if (this.metaLinkColour)    host.style.setProperty('--branded-footer-meta-link', this.metaLinkColour);
        if (this.focusColour)       host.style.setProperty('--branded-footer-focus', this.focusColour);
    }

    _buildNavData() {
        const sectionNamesList   = this.sectionNames     ? this.sectionNames.split(';')     : [];
        const navigationNamesList = this.navigationNames ? this.navigationNames.split(';')  : [];
        const navigationLinksList = this.navigationLinks ? this.navigationLinks.split(';')  : [];
        const columnTypeList      = this.columnTypes     ? this.columnTypes.split(';')      : [];

        for (let i = 0; i < navigationNamesList.length; i++) {
            const isTwoCol = columnTypeList[i] === '2';
            const section = {
                sectionName:    sectionNamesList[i] || '',
                twoColumnType:  isTwoCol,
                sectionClass:   isTwoCol ? 'branded-footer__section-wrapper branded-footer__section-wrapper--two-col'
                                         : 'branded-footer__section-wrapper',
                relatedNavItems: []
            };

            const names = navigationNamesList[i] ? navigationNamesList[i].split('|') : [];
            const links = navigationLinksList[i]  ? navigationLinksList[i].split('|')  : [];

            for (let j = 0; j < names.length; j++) {
                section.relatedNavItems.push({
                    navLinkName: names[j],
                    navLinkURL:  links[j] || '#'
                });
            }

            this.finalNavData.push(section);
        }
    }

    _resolveMetaLinkUrls() {
        const resolve = (pageName, setter) => {
            this[NavigationMixin.GenerateUrl]({
                type: 'comm__namedPage',
                attributes: { name: pageName }
            }).then(url => { setter(url); });
        };

        resolve(this.privacyPageName,       url => { this.privacyUrl = url; });
        resolve(this.cookiesPageName,       url => { this.cookiesUrl = url; });
        resolve(this.accessibilityPageName, url => { this.accessibilityUrl = url; });
    }
}
