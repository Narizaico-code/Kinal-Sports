import { create } from "zustand";
import { persist } from "zustand/middleware"
import { login as loginRequest } from "../../../shared/api"

export const useAuthStore = create(persist(
    (set, get) => ({
        user: null,
        token: null,
        expiresAt: null,
        loading: false,
        error: null,
        isAuthenticated: false,

        login: async ({ emailOrUsername, password }) => {
            try {
                set({ loading: true, error: null });

                const { data } = await loginRequest({ emailOrUsername, password });

                set({
                    user: data.userDetails,
                    token: data.token,
                    expiresAt: data.expiresAt,
                    loading: false
                })

                return { success: true };
            } catch (error) {
                console.log("Login error:", error);
                const message = 
                error.response?.data?.message || "Error de autenticación.";
                
                set({ error: message, loading: false });
                return { success: false, message };
            }
        }
    }),
    { name: "auth-storage" }
)
)