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
        <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}
        >
            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={e => onNameChange(e.target.value)}
            />

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
                {loading ? 'Loading...' : 'Register'}
            </button>
        </form>
    )
}

export default RegisterForm
