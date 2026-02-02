import React from 'react'
import RegisterForm from '../Components/RegisterForm'

function Register() {
    return (
        <>
            <h1>Register</h1>
            <RegisterForm />
            <p>Already have an account? <a href="/login">Login</a></p>
        </>
    )
}

export default Register
