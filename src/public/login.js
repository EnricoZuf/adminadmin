document.addEventListener('DOMContentLoaded', function() {
    const showRegisterFormButton = document.getElementById('show-register-form');
    const showLoginFormButton = document.getElementById('show-login-form');
    const register = document.getElementById('register-form')

    if (showRegisterFormButton) {
        showRegisterFormButton.addEventListener('click', function() {
            console.log('Register button clicked');
            window.location.href = '/register';
        });
    }

    if (showLoginFormButton) {
        showLoginFormButton.addEventListener('click', function() {
            console.log('Back to Login button clicked');
            window.location.href = '/login';
        });
    }

    register.addEventListener('submit', function(event){
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if(password !== confirmPassword){
            event.preventDefault();
            alert('Passwords do not match!');
        }
    });

});


