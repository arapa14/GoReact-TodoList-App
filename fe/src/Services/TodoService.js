const BASE_URL = 'http://localhost:8080'

export async function getTodoAPI() {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error('No token')
    }

    const res = await fetch(`${BASE_URL}/todos`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Unauthorized')
    }

    return data
}

export async function postTodoAPI(task) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error('No token')
    }

    const res = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Unauthorized')
    }

    return data
}

export async function patchTodoAPI(id, payload) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error('No token')
    }

    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Unauthorized')
    }

    return data
}

export async function deleteTodoAPI(id) {
    const token = localStorage.getItem('token')

    if (!token) {
        throw new Error('No token')
    }

    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Unauthorized')
    }
}