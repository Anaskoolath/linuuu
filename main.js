// Credentials validation
const VALID_USERNAME = 'linlin'
const VALID_PASSWORD = '24022004';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    const signInBtn = document.getElementById('sign-in-btn');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorDiv = document.getElementById('error-message');
            
            console.log('Button clicked!');
            console.log('Username:', username);
            console.log('Password:', password);
            
            // Validate credentials
            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                console.log('Login successful!');
                // Success - redirect to about page
                errorDiv.style.display = 'none';
                // small heart burst then redirect
                createBurstHearts(18);
                setTimeout(() => { window.location.href = 'linu.html'; }, 900);
            } else {
                console.log('Login failed!');
                // Error - show error message (personalized)
                errorDiv.textContent = "i dont remember you as a girlfreind";
                errorDiv.style.display = 'block';
                
                // Add shake animation
                errorDiv.classList.add('shake');
                setTimeout(() => {
                    errorDiv.classList.remove('shake');
                }, 500);
                
                // Clear password field
                document.getElementById('password').value = '';
            }
        });
    } else {
        console.error('Sign in button not found!');
    }
    
    // Password visibility toggle
    const togglePwd = document.getElementById('toggle-password');
    const pwdInput = document.getElementById('password');
    if (togglePwd && pwdInput) {
        togglePwd.addEventListener('click', () => {
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                togglePwd.textContent = '🙈';
                togglePwd.setAttribute('aria-label', 'Hide password');
            } else {
                pwdInput.type = 'password';
                togglePwd.textContent = '👁️';
                togglePwd.setAttribute('aria-label', 'Show password');
            }
        });
    }
    
    // Typewriter dedication (time-based greeting)
    const dedicationEl = document.getElementById('dedication-type');
    if (dedicationEl) {
        const now = new Date();
        const h = now.getHours();
        let greet = 'Hello';
        if (h >= 5 && h < 12) greet = 'Good morning';
        else if (h >= 12 && h < 17) greet = 'Good afternoon';
        else if (h >= 17 && h < 22) greet = 'Good evening';
        else greet = 'Good night';
        const dedicationText = `${greet}, my love`;
        typeWriter(dedicationEl, dedicationText, 50);
    }

    // Floating hearts (gentle background animation)
    setInterval(() => {
        createHeart();
    }, 900);
});

/* Typewriter function */
function typeWriter(el, text, speed) {
    let i = 0;
    el.textContent = '';
    const t = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(t);
    }, speed);
}

/* Creates a single floating heart at a random horizontal position */
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const size = Math.floor(Math.random() * 18) + 14; // 14-32
    heart.style.setProperty('--dur', (Math.random() * 5 + 6) + 's');
    heart.style.left = Math.floor(Math.random() * 95) + 'vw';
    heart.style.opacity = (Math.random() * 0.6) + 0.4;

    const shape = document.createElement('div');
    shape.className = 'heart-shape';
    shape.style.width = size + 'px';
    shape.style.height = size + 'px';
    heart.appendChild(shape);

    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, (parseFloat(heart.style.getPropertyValue('--dur')) * 1000) + 1200);
}

/* Create multiple hearts quickly (e.g., for a burst on success) */
function createBurstHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(createHeart, i * 40 + Math.random() * 120);
    }
}