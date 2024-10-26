document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault() 
  const email = document.getElementById('email').value 
  const password = document.getElementById('password').value 

  const response = await fetch('/login', { 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  }) 

  if (response.ok) {
      window.location.href = '/' 
  } else {
      const errorData = await response.json() 
      alert(errorData.message || 'Login failed') 
  }
}) 





