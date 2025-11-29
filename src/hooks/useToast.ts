import { toast as sonnerToast } from 'sonner';

export const useToast = () => {
    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        switch (type) {
            case 'success':
                sonnerToast.success(message);
                break;
            case 'error':
                sonnerToast.error(message);
                break;
            case 'info':
                sonnerToast.info(message);
                break;
        }
    };

    return { showToast };
};
