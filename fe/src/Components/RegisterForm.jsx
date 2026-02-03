import React from 'react'

function RegisterForm({
    name,
    email,
    password,
    loading,
    error,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onSubmit
}) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => onNameChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => onEmailChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
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
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                    placeholder="Enter your password"
                    required
                />
            </div>

            {error && <small className="text-red-500">{error}</small>}

            <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
                {loading ? 'Loading...' : 'Register'}
            </button>
        </form>
    )
}

export default RegisterForm
