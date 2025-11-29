import React from 'react';

interface UserAvatarProps {
    firstName?: string;
    lastName?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ firstName, lastName, size = 'md', className = '' }) => {
    // Get first letter of first name, or 'U' if not available
    const initial = firstName && firstName.trim().length > 0
        ? firstName.trim().charAt(0).toUpperCase()
        : 'U';

    // Size mappings
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',     // Header
        md: 'w-10 h-10 text-base', // Standard
        lg: 'w-16 h-16 text-2xl',  // Dashboard Profile
        xl: 'w-24 h-24 text-4xl'   // Large Profile
    };

    return (
        <div
            className={`
        ${sizeClasses[size]} 
        bg-[#3a5a40] 
        text-white font-bold 
        flex items-center justify-center 
        shadow-sm border border-[#588157]
        select-none
        ${className}
      `}
            style={{ backgroundColor: '#3a5a40', color: '#ffffff' }}
            aria-label={`Avatar for ${firstName || 'User'}`}
        >
            {initial}
        </div>
    );
};
