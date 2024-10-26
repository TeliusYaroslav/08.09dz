document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const response = await fetch('/auth/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })

    if (response.ok) {
        const user = await response.json()
        console.log('Registered user:', user)
    } else {
        console.error('Registration failed')
    }
}); 