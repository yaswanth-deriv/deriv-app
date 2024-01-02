import React from 'react';
import { useSettings, useVerifyEmail } from '@deriv/api';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WithdrawalVerification from '../WithdrawalVerification';
import '@testing-library/jest-dom';

jest.mock('@deriv/api', () => ({
    useSettings: jest.fn(() => ({ data: { email: null } })),
    useVerifyEmail: jest.fn(() => ({ mutate: jest.fn() })),
}));

describe('WithdrawalVerification', () => {
    it('should render WithdrawalVerificationRequest initially', () => {
        render(<WithdrawalVerification />);
        expect(screen.getByText('Please help us verify your withdrawal request.')).toBeInTheDocument();
    });

    it('should send withdrawal verification email and render WithdrawalVerificationSent after clicking send email', async () => {
        (useSettings as jest.Mock).mockImplementation(() => ({ data: { email: 'test@example.com' } }));
        const mockMutate = jest.fn();
        (useVerifyEmail as jest.Mock).mockImplementation(() => ({
            mutate: mockMutate,
        }));

        render(<WithdrawalVerification />);

        fireEvent.click(screen.getByRole('button', { name: 'Send email' }));

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalled();
            expect(
                screen.getByText('Please check your email for the verification link to complete the process.')
            ).toBeInTheDocument();
        });
    });

    it('should not send withdrawal verification email if email is not fetched from useSettings properly', async () => {
        (useSettings as jest.Mock).mockImplementation(() => ({ data: { email: null } }));
        const mockMutate = jest.fn();
        (useVerifyEmail as jest.Mock).mockImplementation(() => ({
            mutate: mockMutate,
        }));

        render(<WithdrawalVerification />);

        fireEvent.click(screen.getByRole('button', { name: 'Send email' }));

        await waitFor(() => {
            expect(mockMutate).not.toHaveBeenCalled();
            expect(
                screen.queryByText('Please check your email for the verification link to complete the process.')
            ).not.toBeInTheDocument();
        });
    });
});
