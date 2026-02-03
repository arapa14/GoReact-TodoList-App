import React, { useState } from 'react'
import RegisterForm from '../Components/RegisterForm'
import { register } from '../Services/AuthService'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await register(name, email, password)
            window.location.href = '/login'
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1>Register</h1>

            <RegisterForm
                name={name}
                email={email}
                password={password}
                loading={loading}
                error={error}
                onNameChange={setName}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
            />

            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </>
    )
}

export default Register
