export const LoginForm = ({onForgot}) => {
  return (
    <div>
        <form action="" className="space-y-5">
            <div>
                <label htmlFor="emailOrUsername"
                className="block text-sm font-medium text-gray-700">
                    Email o Usuario
                </label>

                <input type="text" 
                    id="emailOrUsername"
                    placeholder="correo@ejemplo.com o usuario"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                 />
                 
            </div>

            <div>
                <label htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>

                <input type="password" 
                    id="password"
                    placeholder="contraseña123"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                 />
            </div>

            <button
              type="submit"
              className="w-full bg-main-blue hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg
                          transition-colors duration-200 text-sm disabled:opacity-50"
            >
                Iniciar sesión
            </button>

            <p className="text-center text-sm">
              <button 
              type="button"
              className="text-main-blue hover:underline"
              onClick={onForgot}>
                ¿Olvidaste tu contraseña?
              </button>
            </p>
        </form>
    </div>
  )
}
