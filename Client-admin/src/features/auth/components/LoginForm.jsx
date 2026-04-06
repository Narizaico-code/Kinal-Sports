export const LoginForm = () => {
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
        </form>
    </div>
  )
}
