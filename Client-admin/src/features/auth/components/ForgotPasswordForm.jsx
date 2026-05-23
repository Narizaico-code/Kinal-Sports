
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

export const ForgotPasswordForm = ({ onSwitch }) => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { forgotPassword, loading } = useAuthStore()
  const [emailSent, setEmailSent] = useState(false)

  const onSubmit = async (data) => {
    const result = await forgotPassword(data.email)
    if (result.success) {
      setEmailSent(true)
    }
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-50 text-green-800 p-4 rounded-lg">
          <p className="font-medium">Correo enviado</p>
          <p className="text-sm mt-1">
            Si existe una cuenta asociada a ese correo, recibirás un enlace para restablecer tu contraseña.
          </p>
        </div>
        <button
          onClick={onSwitch}
          className="text-main-blue font-medium hover:underline"
        >
          Volver a iniciar sesión
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Email
        </label>

        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main-blue"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido"
            }
          })}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90 transition-opacity"
      >
        {loading ? "Enviando..." : "Enviar Correo"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Recordaste tu contraseña?{" "}
        <button
          type="button"
          className="text-main-blue font-medium hover:opacity-80"
          onClick={onSwitch}
        >
          Iniciar Sesión
        </button>
      </p>
    </form>
  )
}
