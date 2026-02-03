import React, { useState } from 'react'
import LoginForm from '../Components/LoginForm'
import { login } from '../Services/AuthService'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const data = await login(email, password)
            localStorage.setItem('token', data.data)
            window.location.href = '/home'
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1>Login</h1>

            <LoginForm
                email={email}
                password={password}
                loading={loading}
                error={error}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
            />

            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </>
    )
}

export default Login
