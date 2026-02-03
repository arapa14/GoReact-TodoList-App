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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Register</h1>

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

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-green-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Register
