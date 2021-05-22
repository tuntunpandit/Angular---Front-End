import { AuthService } from './authentication/auth.service';

export function appInitializer(_authS: AuthService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        _authS.refreshToken()
            .subscribe()
            .add(resolve);
    });
}