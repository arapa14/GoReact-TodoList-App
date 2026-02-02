import React from 'react'
import LoginForm from '../Components/LoginForm'

function Login() {
    return (
        <>
            <h1>Login</h1>
            <LoginForm />
            <p>Don't have an account? <a href="/register">Register</a></p>
        </>
    )
}

export default Login
