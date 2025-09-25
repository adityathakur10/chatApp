const socket=io('http://localhost:3000')

document.getElementById('loginForm').addEventListener('submit',async function(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Reset errors
    clearErrors();
    
    // Validate inputs
    let isValid = true;
    
    // Email validation
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }
    
    // Password validation
    if (password.length < 6) {
        showError('passwordError', 'Please enter your password');
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {

        try {
            const response=await fetch('http://localhost:3000/chatApp/auth/login',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data=await response.json()
            if(response.ok){
                alert(data.message || 'login successful!')
                this.reset();
                socket.emit('userLoggedIn',email)

                localStorage.setItem('email', email);
                localStorage.setItem('username', data.username);
                window.location.href='/chat.html';
            }else{
                alert(data.message || 'login failed!')
            }
        } catch (error) {
            console.log(error)
            alert('an error occured.Please try again later.')
        }
       
    }
});

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}