// Google OAuth popup utility

export const openGoogleAuthPopup = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Get Google Client ID from environment or use a default
        const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
        const REDIRECT_URI = window.location.origin;
        const SCOPE = 'openid email profile';
        const RESPONSE_TYPE = 'token id_token';
        
        // Build Google OAuth URL
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${encodeURIComponent(CLIENT_ID)}&` +
            `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
            `response_type=${encodeURIComponent(RESPONSE_TYPE)}&` +
            `scope=${encodeURIComponent(SCOPE)}&` +
            `nonce=${Math.random().toString(36).substring(2, 15)}`;

        // Open popup window
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
            authUrl,
            'Google Sign In',
            `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,directories=no,status=no`
        );

        if (!popup) {
            reject(new Error('Popup blocked. Please allow popups for this site.'));
            return;
        }

        // Check if popup is closed manually
        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
                reject(new Error('Authentication cancelled'));
            }
        }, 1000);

        // Listen for redirect in popup (for implicit flow)
        const handlePopupRedirect = () => {
            try {
                if (popup.location.href.includes('access_token=') || popup.location.href.includes('id_token=')) {
                    const url = new URL(popup.location.href);
                    const hash = url.hash.substring(1);
                    const params = new URLSearchParams(hash);
                    
                    const access_token = params.get('access_token');
                    const id_token = params.get('id_token');
                    const error = params.get('error');

                    if (error) {
                        clearInterval(checkClosed);
                        popup.close();
                        reject(new Error(error));
                        return;
                    }

                    if (id_token) {
                        clearInterval(checkClosed);
                        popup.close();
                        resolve(id_token);
                    } else if (access_token) {
                        clearInterval(checkClosed);
                        popup.close();
                        resolve(access_token);
                    }
                }
            } catch (e) {
                // Cross-origin error is expected until redirect happens
                // This is normal during OAuth flow
            }
        };

        // Check popup URL periodically (for implicit flow)
        const redirectCheck = setInterval(() => {
            try {
                handlePopupRedirect();
            } catch (e) {
                // Ignore cross-origin errors
            }
        }, 500);
    });
};

