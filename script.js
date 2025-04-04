// DOM Elements
const userBtn = document.getElementById('userBtn');
const chefBtn = document.getElementById('chefBtn');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginRoleInput = document.getElementById('loginRoleInput');
const signupRoleInput = document.getElementById('signupRoleInput');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const loginForm = document.getElementById('loginFormContainer');
const signupForm = document.getElementById('signupFormContainer');
const chefAdditionalInfo = document.getElementById('chefAdditionalInfo');
const landingPage = document.getElementById('landingPage');
const userDashboard = document.getElementById('userDashboard');
const chefDashboard = document.getElementById('chefDashboard');
const userDisplayName = document.getElementById('userDisplayName');
const chefDisplayName = document.getElementById('chefDisplayName');
const filterBtns = document.querySelectorAll('.filter-btn');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');

// Slideshow functionality
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize slideshow
setInterval(nextSlide, 5000);

// Tab switching functionality
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Role switching functionality
userBtn.addEventListener('click', () => {
    userBtn.classList.add('active');
    chefBtn.classList.remove('active');
    loginRoleInput.value = 'user';
    signupRoleInput.value = 'user';
    chefAdditionalInfo.style.display = 'none';
});

chefBtn.addEventListener('click', () => {
    chefBtn.classList.add('active');
    userBtn.classList.remove('active');
    loginRoleInput.value = 'chef';
    signupRoleInput.value = 'chef';
    chefAdditionalInfo.style.display = 'block';
});

// Form switching functionality
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signupTab.click();
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginTab.click();
});

// Form submission handling
// loginButton.addEventListener('click', () => {
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;
//     const role = loginRoleInput.value;

//     // Basic validation
//     if (!email || !password) {
//         alert('Please fill in all fields');
//         return;
//     }

//     // Simulate login
//     if (role === 'user') {
//         userDisplayName.textContent = email.split('@')[0];
//         landingPage.style.display = 'none';
//         userDashboard.style.display = 'block';
//     } else {
//         chefDisplayName.textContent = email.split('@')[0];
//         landingPage.style.display = 'none';
//         chefDashboard.style.display = 'block';
//     }
// });

signupButton.addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = signupRoleInput.value;

    // Basic validation
    if (!email || !username || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Simulate signup
    if (role === 'user') {
        userDisplayName.textContent = username;
        landingPage.style.display = 'none';
        userDashboard.style.display = 'block';
    } else {
        chefDisplayName.textContent = username;
        landingPage.style.display = 'none';
        chefDashboard.style.display = 'block';
    }
});

// Forgot password functionality
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset link has been sent to your email');
});

// Enhanced Food Filter and Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const foodGrid = document.getElementById('foodGrid');
    const foodCards = document.querySelectorAll('.food-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    // Filter functionality
    function filterFoodItems(category) {
        foodCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            const category = btn.dataset.filter;
            filterFoodItems(category);
        });
    });

    // Search functionality
    function searchFoodItems(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            // If search is empty, respect current category filter
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterFoodItems(activeFilter);
            return;
        }
        
        foodCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const chef = card.querySelector('p').textContent.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            
            if ((title.includes(query) || chef.includes(query)) && 
                (activeFilter === 'all' || card.dataset.category === activeFilter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        searchFoodItems(searchTerm);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value;
            searchFoodItems(searchTerm);
        }
    });

    // Food card click functionality
    foodCards.forEach(card => {
        card.addEventListener('click', () => {
            const foodName = card.querySelector('h3').textContent;
            const chefName = card.querySelector('p').textContent;
            const price = card.querySelector('.food-price').textContent;
            
            // Show food details (simulated with alert for now)
            alert(`You selected ${foodName} by ${chefName} for ${price}`);
            
            // In a real app, you might open a modal with more details
            // or navigate to a food details page
        });
    });
});

document.getElementById('signupButton').addEventListener('click', async () => {
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const role = document.getElementById('signupRoleInput').value;  

    if (!email || !username || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const signupData = { email, username, password, role };

    if (role === 'chef') {
        signupData.chefSpecialty = document.getElementById('chefSpecialty')?.value.trim() || 'Not specified';
        signupData.chefExperience = document.getElementById('chefExperience')?.value.trim() || '0';
    }

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Signup successful as ${role}! Redirecting to login...`);
            document.getElementById('switchToLogin').click();
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Signup failed. Please try again.');
        }
    } catch (error) {
        alert('Error signing up. Please check your network connection.');
        console.error(error);
    }
});

document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful! Redirecting to dashboard...');
            
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);

            // Redirect based on user role
            if (data.role === 'chef') {
                window.location.href = 'chef.html';
            } else {
                window.location.href = 'land.html';
            }
        } else {
            alert(data.error || 'Login failed. Please try again.');
        }
    } catch (error) {
        alert('Error logging in. Please check your network connection.');
        console.error(error);
    }
});

