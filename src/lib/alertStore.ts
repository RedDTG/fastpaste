import { writable } from 'svelte/store';

// Create a writable store for the alert
interface AlertStore {
    message: string;
    status: 'success' | 'error' | 'info' | 'warning';
    reason: string | null;
    visible: boolean;
}

function createAlertStore() {
    const { subscribe, update } = writable<AlertStore>({
        message: '',
        status: 'success',
        reason: null,
        visible: false,
    });

    return {
        subscribe,
        showAlert: (message: string, status: 'success' | 'error' | 'info' | 'warning', reason: string | null) => {
            update(() => ({
                message,
                status,
                reason,
                visible: true,
            }));
            // Hide alert after 3 seconds
            setTimeout(() => {
                update(alert => ({ ...alert, visible: false }));
            }, 3000);
        },
        resetAlert: () => update(() => ({
            message: '',
            status: 'success',
            reason: null,
            visible: false,
        })),
    };
}

export const alertStore = createAlertStore();
