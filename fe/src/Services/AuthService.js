const BASE_URL = 'http://localhost:8080'

export async function login(email, password) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Login failed')
    }

    return data
}

export async function register(name, email, password) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Register failed')
    }

    return data
}

export async function getMe() {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No token')
  }

  const res = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Unauthorized')
  }

  return data
}
