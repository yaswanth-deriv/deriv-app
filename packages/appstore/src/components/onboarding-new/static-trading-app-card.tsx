import React from 'react';
import classNames from 'classnames';
import { isMobile } from '@deriv/shared';
import { Text, Button } from '@deriv/components';
import { localize } from '@deriv/translations';
import { getAppstorePlatforms } from 'Constants/platform-config';
import TradingPlatformIconProps from 'Assets/svgs/trading-platform';
import { AvailableAccount, TDetailsOfEachMT5Loginid } from 'Types';

import './static-trading-app-card.scss';

const StaticTradingAppCard = ({
    name,
    icon,
    description,
    has_divider,
    sub_title,
    has_applauncher_account,
    is_item_blurry,
    is_animated,
    is_mt5_allowed = true,
}: AvailableAccount &
    TDetailsOfEachMT5Loginid & { has_divider?: boolean; is_animated: boolean; is_mt5_allowed?: boolean }) => {
    const { app_desc } = (is_mt5_allowed && getAppstorePlatforms().find(config => config.name === name)) || {
        app_desc: is_mt5_allowed ? description : localize('Multipliers trading platform.'),
        link_to: '',
    };
    const icon_size = isMobile() || has_applauncher_account ? 48 : 32;
    return (
        <div
            className={classNames('static-trading-app-card', {
                'static-trading-app-card--with-bot-margin': has_divider,
            })}
        >
            <TradingPlatformIconProps
                icon={icon}
                size={icon_size}
                className={is_item_blurry ? 'static-trading-app-card--blurry' : ''}
            />
            <div
                className={classNames('static-trading-app-card__details', {
                    'static-trading-app-card--divider': has_divider && !isMobile(),
                })}
            >
                <Text
                    className='title'
                    color={is_item_blurry ? 'less-prominent' : 'prominent'}
                    size='xs'
                    line_height='s'
                >
                    {sub_title}
                </Text>
                <Text
                    className='title'
                    color={is_item_blurry ? 'less-prominent' : 'prominent'}
                    size='xs'
                    line_height='s'
                    weight='bold'
                >
                    {name}
                </Text>
                <Text className='description' color={is_item_blurry ? 'primary' : 'general'} size='xxs' line_height='m'>
                    {app_desc}
                </Text>
            </div>
            <div className={classNames('static-trading-app-card__actions')}>
                <Button
                    primary
                    className={classNames('static-trading-app-card__actions--active', {
                        'static-trading-app-card__actions--blurry': is_item_blurry,
                        'static-trading-app-card__button--hidden': !has_applauncher_account,
                        'static-trading-app-card__button--animated': is_animated,
                    })}
                >
                    {localize('Open')}
                </Button>
            </div>
        </div>
    );
};

export default StaticTradingAppCard;
