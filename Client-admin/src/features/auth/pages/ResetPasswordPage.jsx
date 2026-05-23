import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import kinalSportsLogo from '../../../assets/img/kinal_sports.png';

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { resetPassword, loading } = useAuthStore();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        if (!token) return;
        
        const result = await resetPassword(token, data.password);
        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Enlace inválido</h2>
                    <p className="text-gray-600 mb-6">No se encontró el token de seguridad. Por favor, solicita un nuevo enlace de recuperación.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-main-blue text-white px-6 py-2 rounded-lg hover:opacity-90"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center p-2">
                        <img 
                            src={kinalSportsLogo} 
                            alt="Kinal Sports Logo" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Restablecer Contraseña</h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        Ingresa tu nueva contraseña a continuación
                    </p>
                </div>

                {success ? (
                    <div className="text-center space-y-4">
                        <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                            <p className="font-medium">¡Contraseña actualizada!</p>
                            <p className="text-sm mt-1">
                                Tu contraseña ha sido cambiada exitosamente.
                            </p>
                        </div>
                        <p className="text-sm text-gray-500">Redirigiendo al inicio de sesión...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1.5">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main-blue"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    minLength: {
                                        value: 8,
                                        message: "Debe tener al menos 8 caracteres"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                        message: "Debe contener mayúsculas, minúsculas, números y un carácter especial"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1.5">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main-blue"
                                {...register("confirmPassword", {
                                    required: "Debes confirmar tu contraseña",
                                    validate: (val) => {
                                        if (watch('password') != val) {
                                            return "Las contraseñas no coinciden";
                                        }
                                    }
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-xs mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90 transition-opacity"
                        >
                            {loading ? "Actualizando..." : "Actualizar Contraseña"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};