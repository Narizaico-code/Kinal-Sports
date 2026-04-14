import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthStore } from '../store/authStore';

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // Mandar informacion al backend para iniciar sesion
        console.log(data);

        const res = await login(data);

        if (res.success) {
            navigate('/dashboard');
            toast.success('Bienvenido de nuevo!', { duration: 4000 });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label
                    htmlFor="emailOrUsername"
                    className="block text-sm font-medium text-gray-800 mb-1.5"
                >
                    Email o Usuario
                </label>

                <input
                    id="emailOrUsername"
                    type="text"
                    placeholder="correo@ejemplo.com o usuario"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register('emailOrUsername', {
                        required: 'Este campo es obligatorio',
                    })}
                />

                {errors.emailOrUsername && (
                    <p className="text-red-600 text-xs mt-1">
                        {errors.emailOrUsername.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-800 mb-1.5"
                >
                    Contrasena
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...register('password', {
                        required: 'La contrasena es obligatoria',
                    })}
                />

                {errors.password && (
                    <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>

            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}

            <button
                type="submit"
                className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Iniciando...' : 'Iniciar Sesion'}
            </button>

            <p className="text-center text-sm">
                <button
                    type="button"
                    onClick={onForgot}
                    className="text-main-blue hover:underline"
                >
                    Olvidaste tu contrasena?
                </button>
            </p>
        </form>
    );
};
