import { LightningElement, api } from 'lwc';
import BasePath from '@salesforce/community/basePath';

export default class BrandedHeader extends LightningElement {
    @api logoReference;
    @api homeUrl = '/';
    @api logoAltText = 'Home';
    @api logoHeight;
    @api backgroundColour;
    @api focusColour;
    @api showLogout = false;
    @api logoutLabel = 'Sign out';
    @api logoutColour;

    _logoutHref;

    connectedCallback() {
        this._logoutHref = `${window.location.origin}${BasePath}/secur/logout.jsp`;
    }

    get logoutHref() {
        return this._logoutHref || '#';
    }

    get logoUrl() {
        const key = this.logoReference;
        if (!key) return null;
        // If ContentReference passes a URL directly, use it as-is
        if (key.startsWith('/') || key.startsWith('http')) return key;
        // Construct CMS delivery URL from the content key.
        // experience/cmsDeliveryApi does not resolve correctly on LWR sites.
        // Use the base path without a rendition suffix — LWR CMS serves the
        // original image at this path regardless of rendition naming.
        return `/cms/delivery/media/${key}`;
    }

    renderedCallback() {
        const host = this.template.host;
        if (this.backgroundColour) host.style.setProperty('--branded-header-bg', this.backgroundColour);
        if (this.focusColour) host.style.setProperty('--branded-header-focus', this.focusColour);
        if (this.logoutColour) host.style.setProperty('--branded-header-logout', this.logoutColour);
        if (this.logoHeight) {
            const px = String(this.logoHeight).includes('px') ? this.logoHeight : `${this.logoHeight}px`;
            host.style.setProperty('--branded-logo-height', px);
        }
    }
}
