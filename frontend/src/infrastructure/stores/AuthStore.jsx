import { logger } from "@/infrastructure/logging/Logger";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useNotificationStore from './NotificationStore.jsx';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      redirectToLogin: false,
      lastAuthCheck: null,
      authCheckInterval: 5 * 60 * 1000, // 5 minutes

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          logger.debug('🔍 [AuthStore] Attempting login for:', email);
          
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          logger.log('🔍 [AuthStore] Login response:', data);

          if (!response.ok) {
            throw new Error(data.error || data.message || 'Login failed');
          }

          // Backend returns: { success: true, data: { user, accessToken, refreshToken, expiresAt } }
          const userData = data.data || data;
          const token = userData.accessToken || userData.token;

          logger.log('🔍 [AuthStore] Extracted data:', {
            user: userData.user,
            token: token ? token.substring(0, 20) + '...' : 'null',
            tokenLength: token ? token.length : 0
          });

          set({
            user: userData.user,
            token: token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            redirectToLogin: false,
            lastAuthCheck: new Date()
          });

          logger.log('✅ [AuthStore] Login successful, state updated');
          return { success: true };
        } catch (error) {
          logger.error('❌ [AuthStore] Login failed:', error);
          set({
            isLoading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      register: async (email, password, username) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || data.message || 'Registration failed');
          }

          // Backend returns: { success: true, user: ... } for register
          const userData = data.data || data;
          const token = userData.accessToken || userData.token;

          set({
            user: userData.user,
            token: token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            redirectToLogin: false,
            lastAuthCheck: new Date()
          });

          return { success: true };
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          redirectToLogin: false,
          lastAuthCheck: null
        });
      },

      clearError: () => {
        set({ error: null });
      },

      // Getter for authenticated API calls
      getAuthHeaders: () => {
        const { token } = get();
        logger.log('🔍 [AuthStore] getAuthHeaders called, token:', token ? token.substring(0, 20) + '...' : 'null');
        return token ? { Authorization: `Bearer ${token}` } : {};
      },

      // Enhanced token validation with instant auto-redirect
      validateToken: async () => {
        const { token, lastAuthCheck, authCheckInterval } = get();
        
        if (!token) {
          logger.log('🔍 [AuthStore] No token found for validation');
          set({ isAuthenticated: false });
          return false;
        }

        // Check if we need to validate (avoid too frequent checks)
        const now = new Date();
        if (lastAuthCheck && (now - lastAuthCheck) < authCheckInterval) {
          logger.log('🔍 [AuthStore] Skipping validation, too recent');
          return true;
        }

        try {
          logger.log('🔍 [AuthStore] Validating token...');
          const response = await fetch('/api/auth/validate', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          logger.log('🔍 [AuthStore] Validation response status:', response.status);

          if (!response.ok) {
            logger.log('❌ [AuthStore] Token validation failed:', response.status);
            await get().handleAuthFailure('Token validation failed');
            return false;
          }

          const data = await response.json();
          logger.log('✅ [AuthStore] Token validation successful');
          set({ 
            user: data.user, 
            isAuthenticated: true, 
            lastAuthCheck: now,
            redirectToLogin: false
          });
          return true;
        } catch (error) {
          logger.error('❌ [AuthStore] Token validation error:', error);
          await get().handleAuthFailure('Authentication check failed');
          return false;
        }
      },

      // Handle authentication failures with instant redirect
      handleAuthFailure: async (reason = 'Session expired') => {
        const { showWarning } = useNotificationStore.getState();
        
        logger.log('🔐 [AuthStore] Handling auth failure:', reason);
        
        set({ 
          isAuthenticated: false, 
          token: null, 
          user: null,
          redirectToLogin: true,
          lastAuthCheck: new Date()
        });

        // Show notification
        showWarning(
          'Your session has expired. Redirecting to login...',
          'Session Expired',
          false
        );

        // Instant redirect - no countdown
        window.location.href = '/login';
      },

      // Reset redirect flag
      resetRedirectFlag: () => {
        set({ redirectToLogin: false });
      },

      // Refresh token if needed
      refreshToken: async () => {
        const { token } = get();
        if (!token) {
          logger.log('🔍 [AuthStore] No token to refresh');
          return false;
        }

        try {
          logger.log('🔍 [AuthStore] Refreshing token...');
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            logger.log('❌ [AuthStore] Token refresh failed');
            set({ isAuthenticated: false, token: null, user: null });
            return false;
          }

          const data = await response.json();
          const newToken = data.accessToken || data.token;
          
          logger.log('✅ [AuthStore] Token refreshed successfully');
          set({ token: newToken, isAuthenticated: true });
          return true;
        } catch (error) {
          logger.error('❌ [AuthStore] Token refresh error:', error);
          set({ isAuthenticated: false, token: null, user: null });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore; 