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
        <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}
        >
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={e => onEmailChange(e.target.value)}
            />

            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={e => onPasswordChange(e.target.value)}
            />

            {error && <small style={{ color: 'red' }}>{error}</small>}

            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    )
}

export default LoginForm
