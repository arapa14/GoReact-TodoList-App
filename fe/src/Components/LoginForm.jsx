import React from 'react'

function LoginForm({
    email,
    password,
    loading,
    error,
    onEmailChange,
    onPasswordChange,
    onSubmit
}) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => onEmailChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-sky-50"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => onPasswordChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-sky-50"
                    placeholder="Enter your password"
                    required
                />
            </div>

            {error && <small className="text-red-500">{error}</small>}

            <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    )
}

export default LoginForm
