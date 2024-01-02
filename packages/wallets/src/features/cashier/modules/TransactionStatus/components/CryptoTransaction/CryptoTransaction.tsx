import React, { useCallback } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useCancelCryptoTransaction } from '@deriv/api';
import { WalletText } from '../../../../../../components/Base';
import { useModal } from '../../../../../../components/ModalProvider';
import IcCrossLight from '../../../../../../public/images/ic-cross-light.svg';
import { THooks } from '../../../../../../types';
import { WalletActionModal } from '../../../../components/WalletActionModal';
import './CryptoTransaction.scss';

type TCryptoTransaction = {
    currencyDisplayCode: THooks.CurrencyConfig['code'];
    transaction: THooks.CryptoTransactions;
};

const CryptoTransaction: React.FC<TCryptoTransaction> = ({ currencyDisplayCode: currency, transaction }) => {
    const { hide, show } = useModal();

    const { mutate } = useCancelCryptoTransaction();

    const cancelTransaction = useCallback(() => {
        mutate({ payload: { id: transaction.id } });
        hide();
    }, [hide, mutate, transaction.id]);

    return (
        <div className='wallets-crypto-transaction'>
            <div className='wallets-crypto-transaction__type-and-status'>
                <WalletText lineHeight='sm' size='xs'>
                    {transaction.is_deposit ? `Deposit ${currency}` : `Withdrawal ${currency}`}
                </WalletText>
                <div className='wallets-crypto-transaction__status'>
                    <div
                        className={classNames(
                            'wallets-crypto-transaction__status__dot',
                            `wallets-crypto-transaction__status__dot--${transaction.status_code
                                .toLowerCase()
                                .replace('_', '-')}`
                        )}
                    />
                    <WalletText lineHeight='2xs' size='2xs'>
                        {transaction.status_name}
                    </WalletText>
                    {!!transaction.is_valid_to_cancel && (
                        <button
                            className='wallets-crypto-transaction__cancel-button'
                            onClick={() =>
                                show(
                                    <WalletActionModal
                                        actionButtonsOptions={[
                                            {
                                                onClick: hide,
                                                text: "No, don't cancel",
                                            },
                                            {
                                                isPrimary: true,
                                                onClick: cancelTransaction,
                                                text: 'Yes, cancel',
                                            },
                                        ]}
                                        description='Are you sure you want to cancel this transaction?'
                                        hideCloseButton={true}
                                        title='Cancel transaction'
                                    />
                                )
                            }
                        >
                            <IcCrossLight />
                        </button>
                    )}
                </div>
            </div>
            <div className='wallets-crypto-transaction__amount-and-date'>
                <WalletText color='less-prominent' size='2xs'>
                    {transaction.amount} {currency}
                </WalletText>
                <WalletText color='less-prominent' size='2xs'>
                    {moment.unix(transaction.submit_date).utc().format('MMM D, YYYY')}
                </WalletText>
            </div>
            <WalletText lineHeight='2xs' size='2xs'>
                Address:{' '}
                <a
                    className='wallets-crypto-transaction__red-text'
                    href={transaction.address_url}
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    {transaction.formatted_address_hash}
                </a>
            </WalletText>
            <WalletText lineHeight='2xs' size='2xs'>
                Transaction hash:{' '}
                <a
                    className='wallets-crypto-transaction__red-text'
                    href={transaction.transaction_url}
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    {transaction.formatted_transaction_hash}
                </a>
            </WalletText>
            {transaction.is_deposit && (
                <div>
                    <WalletText lineHeight='2xs' size='2xs'>
                        Confirmations:{' '}
                        <span className='wallets-crypto-transaction__red-text'>
                            {transaction.formatted_confirmations}
                        </span>
                    </WalletText>
                </div>
            )}
        </div>
    );
};

export default CryptoTransaction;
