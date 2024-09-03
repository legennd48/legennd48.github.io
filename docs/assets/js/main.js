// Smooth Scrolling for Sidebar Links
document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back-to-Top Button
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Mobile Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.createElement('button');
toggleButton.textContent = '☰';
toggleButton.classList.add('sidebar-toggle');
document.body.insertBefore(toggleButton, sidebar);

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Close sidebar when a link is clicked (mobile view)
document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
    anchor.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            sidebar.classList.remove('open');
        }
    });
});
