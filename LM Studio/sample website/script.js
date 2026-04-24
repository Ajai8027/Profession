// Smooth scroll to top
function smoothScrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Button click event handler
document.getElementById('cta-btn').addEventListener('click', myFunction);

// Add event listener to buttons
const buttons = document.querySelectorAll('.cta-btn');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        smoothScrollToTop();
    });
});
