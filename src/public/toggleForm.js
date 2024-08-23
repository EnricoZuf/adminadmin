document.addEventListener('DOMContentLoaded', function() {
    const showRegisterFormButton = document.getElementById('show-register-form');
    const showLoginFormButton = document.getElementById('show-login-form');

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
});
