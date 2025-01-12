document.getElementById('signupForm').addEventListener('submit',async function(e) {
    e.preventDefault();
    
    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Reset errors
    clearErrors();
    
    // Validate inputs
    let isValid = true;
    
    // Username validation
    if (username.length < 3) {
        showError('usernameError', 'Username must be at least 3 characters');
        isValid = false;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }
    
    // Password validation
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        try {
            const response=await fetch('http://localhost:3000/chatApp/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
            const data =await response.json();
            if(response.ok){
                alert(data.message || 'signup successful !!');
                this.reset();
                window.location.href='/login.html';
            }else{
                alert(data.message || 'signup failed.Please try again.')
            }
        } catch (error) {
            console.log('error connecting to the server :',error)
            alert('an error occured.Please try again later.');
        }


        // Here you would typically send the data to a server
        // console.log('Form submitted:', { username, email, password });
        // alert('Signup successful!');
        // this.reset();
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