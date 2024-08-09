document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const email = document.getElementById('email').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Signup successful') {
            alert('Thank you for signing up!');
            window.location.href = '/home';  // Redirect to home page
        } else {
            alert('this email is already registered.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error. Please try again.');
    });
});

// Toggle Side Navigation
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

// Toggle Dark Mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
