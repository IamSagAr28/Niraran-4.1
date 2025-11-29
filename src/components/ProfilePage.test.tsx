/**
 * Integration Test: Settings Save Functionality
 * 
 * Tests the complete flow of saving profile settings including:
 * - Form state management
 * - API call to backend
 * - Loading states
 * - Success/error toast notifications
 * - UI updates with returned data
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ProfilePage from '../components/ProfilePage';
import { AuthProvider } from '../contexts/AuthContext';
import * as authApi from '../utils/authApi';

// Mock the router
vi.mock('../utils/Router', () => ({
    useRouter: () => ({
        navigateTo: vi.fn(),
        currentPath: '/profile'
    })
}));

// Mock the toast hook
const mockShowToast = vi.fn();
vi.mock('../hooks/useToast', () => ({
    useToast: () => ({
        showToast: mockShowToast
    })
}));

// Mock auth API
vi.mock('../utils/authApi', () => ({
    checkSession: vi.fn(),
    updateProfile: vi.fn()
}));

describe('ProfilePage - Settings Save Integration Test', () => {
    const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1 (555) 000-0000'
    };

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock successful session check
        (authApi.checkSession as any).mockResolvedValue({
            authenticated: true,
            user: mockUser,
            subscription: null
        });
    });

    it('should save profile changes and show success toast', async () => {
        const updatedUser = {
            ...mockUser,
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '+1 (555) 123-4567'
        };

        // Mock successful profile update
        (authApi.updateProfile as any).mockResolvedValue({
            message: 'Profile updated successfully',
            user: updatedUser
        });

        render(
            <AuthProvider>
                <ProfilePage />
            </AuthProvider>
        );

        // Wait for component to load
        await waitFor(() => {
            expect(screen.getByText('Account Settings')).toBeInTheDocument();
        });

        // Click Edit button
        const editButton = screen.getByRole('button', { name: /edit/i });
        fireEvent.click(editButton);

        // Update form fields
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const phoneInput = screen.getByLabelText(/phone number/i);

        fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
        fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
        fireEvent.change(phoneInput, { target: { value: '+1 (555) 123-4567' } });

        // Click Save button
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        // Verify loading state
        await waitFor(() => {
            expect(screen.getByText('Saving...')).toBeInTheDocument();
        });

        // Verify Save button is disabled during request
        expect(saveButton).toBeDisabled();

        // Wait for save to complete
        await waitFor(() => {
            expect(authApi.updateProfile).toHaveBeenCalledWith({
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'john@example.com',
                phone: '+1 (555) 123-4567'
            });
        });

        // Verify success toast was shown
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith(
                'Profile updated successfully!',
                'success'
            );
        });

        // Verify form exits edit mode
        await waitFor(() => {
            expect(screen.queryByText('Saving...')).not.toBeInTheDocument();
            expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
        });

        // Verify UI shows updated values
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('should show error toast when save fails', async () => {
        // Mock failed profile update
        (authApi.updateProfile as any).mockRejectedValue(
            new Error('Network error')
        );

        render(
            <AuthProvider>
                <ProfilePage />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Account Settings')).toBeInTheDocument();
        });

        // Click Edit and try to save
        fireEvent.click(screen.getByRole('button', { name: /edit/i }));

        const firstNameInput = screen.getByLabelText(/first name/i);
        fireEvent.change(firstNameInput, { target: { value: 'Test' } });

        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        // Wait for error
        await waitFor(() => {
            expect(mockShowToast).toHaveBeenCalledWith(
                'Failed to update profile. Please try again.',
                'error'
            );
        });

        // Verify form remains in edit mode
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('should disable both Save and Cancel buttons during request', async () => {
        (authApi.updateProfile as any).mockImplementation(
            () => new Promise(resolve => setTimeout(resolve, 1000))
        );

        render(
            <AuthProvider>
                <ProfilePage />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Account Settings')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /edit/i }));

        const firstNameInput = screen.getByLabelText(/first name/i);
        fireEvent.change(firstNameInput, { target: { value: 'Test' } });

        const saveButton = screen.getByRole('button', { name: /save/i });
        const cancelButton = screen.getByRole('button', { name: /cancel/i });

        fireEvent.click(saveButton);

        // Verify both buttons are disabled during request
        await waitFor(() => {
            expect(saveButton).toBeDisabled();
            expect(cancelButton).toBeDisabled();
        });
    });

    it('should reset form when Cancel is clicked', async () => {
        render(
            <AuthProvider>
                <ProfilePage />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Account Settings')).toBeInTheDocument();
        });

        // Enter edit mode
        fireEvent.click(screen.getByRole('button', { name: /edit/i }));

        // Change values
        const firstNameInput = screen.getByLabelText(/first name/i);
        fireEvent.change(firstNameInput, { target: { value: 'Changed' } });

        // Click Cancel
        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        // Verify form exits edit mode
        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();

        // Verify original value is restored
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
});
