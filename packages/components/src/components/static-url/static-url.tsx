import React from 'react';
import { getStaticUrl, PlatformContext, setUrlLanguage } from '@deriv/shared';
import { getLanguage } from '@deriv/translations';

export type TPlatformContext = {
    is_appstore?: boolean;
    is_pre_appstore?: boolean;
};

type TStaticUrl = React.HTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    is_document?: boolean;
};

const StaticUrl = ({ href, is_document, children, ...props }: React.PropsWithChildren<TStaticUrl>) => {
    const { is_appstore } = React.useContext<TPlatformContext>(PlatformContext);
    const getHref = () => {
        setUrlLanguage(getLanguage());
        return getStaticUrl(href, { is_appstore }, is_document);
    };

    return (
        <a href={getHref()} rel='noopener noreferrer' target='_blank' {...props}>
            {children}
        </a>
    );
};

export default StaticUrl;
