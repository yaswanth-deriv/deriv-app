import React, { useState } from 'react';
import DerivXPasswordIcon from '@/assets/svgs/ic-derivx-password-updated.svg';
import MT5PasswordIcon from '@/assets/svgs/ic-mt5-password.svg';
import { ActionScreen, SentEmailContent } from '@/components';
import { useModal } from '@/providers';
import { TPlatforms } from '@/types';
import { platformPasswordResetRedirectLink } from '@/utils';
import { CFDPlatforms, PlatformDetails } from '@cfd/constants';
import { useActiveTradingAccount, useSettings, useVerifyEmail } from '@deriv/api-v2';
import { Button, Text } from '@deriv-com/ui';

type TradingPlatformChangePasswordScreensProps = {
    platform: TPlatforms.All;
};

const TradingPlatformChangePasswordScreens = ({ platform }: TradingPlatformChangePasswordScreensProps) => {
    type TChangePasswordScreenIndex = 'confirmationScreen' | 'emailVerification' | 'introScreen';
    const [activeScreen, setActiveScreen] = useState<TChangePasswordScreenIndex>('introScreen');
    const handleClick = (nextScreen: TChangePasswordScreenIndex) => setActiveScreen(nextScreen);

    const { hide } = useModal();
    const { data } = useSettings();
    const { mutate } = useVerifyEmail();
    const { data: activeTrading } = useActiveTradingAccount();

    const { title } = PlatformDetails[platform];

    const isDerivX = platform === CFDPlatforms.DXTRADE;

    const handleSendEmail = async () => {
        if (data.email) {
            await mutate({
                type: isDerivX ? 'trading_platform_dxtrade_password_reset' : 'trading_platform_mt5_password_reset',
                url_parameters: {
                    redirect_to: platformPasswordResetRedirectLink(platform, activeTrading?.is_virtual),
                },
                verify_email: data.email,
            });
        }
    };

    const ChangePasswordScreens = {
        confirmationScreen: {
            bodyText: (
                <Text align='center' color='error' size='sm'>
                    This will change the password to all of your {title} accounts.
                </Text>
            ),
            button: (
                <div className='flex gap-8'>
                    <Button color='black' onClick={() => hide()} size='lg' variant='outlined'>
                        Cancel
                    </Button>
                    <Button
                        className='rounded-xs'
                        onClick={() => {
                            handleSendEmail();
                            handleClick('emailVerification');
                        }}
                        size='lg'
                    >
                        Confirm
                    </Button>
                </div>
            ),
            headingText: `Confirm to change your ${title} password`,
        },
        introScreen: {
            bodyText: `Use this password to log in to your ${title} accounts on the desktop, web, and mobile apps.`,
            button: (
                <Button className='rounded-xs' onClick={() => handleClick('confirmationScreen')} size='lg'>
                    Change password
                </Button>
            ),
            headingText: `${title} password`,
        },
    };

    if (activeScreen === 'emailVerification')
        return (
            <div className='w-full mt-32 md:mt-40'>
                <SentEmailContent platform={platform} />
            </div>
        );

    return (
        <div className='mt-32 lg:mt-40'>
            <ActionScreen
                description={ChangePasswordScreens[activeScreen].bodyText}
                descriptionSize='sm'
                icon={isDerivX ? <DerivXPasswordIcon /> : <MT5PasswordIcon />}
                renderButtons={() => ChangePasswordScreens[activeScreen].button}
                title={ChangePasswordScreens[activeScreen].headingText}
            />
        </div>
    );
};

export default TradingPlatformChangePasswordScreens;
