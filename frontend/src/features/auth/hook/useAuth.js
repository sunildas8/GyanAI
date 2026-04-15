import { useDispatch } from "react-redux";
import { register, login, getMe as getMeApi } from "../services/auth.api";
import { setError, setLoading, setUser } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({ username, email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register({ username, email, password });
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed';
            dispatch(setError(errorMessage));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({ email, password });
            dispatch(setUser(data.user));
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            dispatch(setError(errorMessage));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMeApi();
            dispatch(setUser(data.user));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch user data';
            dispatch(setError(errorMessage));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe
    };
}