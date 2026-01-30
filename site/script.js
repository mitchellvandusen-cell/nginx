/* ==========================================================================
   Mitch Van Dusen Insurance — Global JavaScript
   ========================================================================== */

// --- Scroll Reveal Animation ---
function reveal() {
    var reveals = document.querySelectorAll('.reveal, .fade-in-left, .fade-in-right');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// --- Review Form Handler (Testimonials Page) ---
(function () {
    var reviewForm = document.getElementById('reviewForm');
    var container = document.getElementById('reviews-container');
    var modalEl = document.getElementById('reviewModal');

    if (reviewForm && container && modalEl) {
        var modal = new bootstrap.Modal(modalEl);
        var scrollInterval;

        function checkAndEnableCycling() {
            var cards = container.querySelectorAll('.testimonial-card');
            if (cards.length >= 5) {
                container.classList.add('cycling-mode');
                var notice = document.getElementById('cycle-notice');
                if (notice) notice.style.display = 'block';

                if (!scrollInterval) {
                    scrollInterval = setInterval(function () {
                        container.scrollLeft += 1;
                        if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
                            container.scrollLeft = 0;
                        }
                    }, 20);

                    container.addEventListener('mouseenter', function () {
                        clearInterval(scrollInterval);
                        scrollInterval = null;
                    });

                    container.addEventListener('mouseleave', function () {
                        scrollInterval = setInterval(function () {
                            container.scrollLeft += 1;
                            if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
                                container.scrollLeft = 0;
                            }
                        }, 20);
                    });
                }
            }
        }

        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('reviewName').value;
            var loc = document.getElementById('reviewLocation').value;
            var comment = document.getElementById('reviewComment').value;
            var rating = 0;
            document.getElementsByName('rating').forEach(function (star) {
                if (star.checked) rating = parseInt(star.value);
            });

            if (rating === 5) {
                var newCard = document.createElement('div');
                newCard.className = 'testimonial-card reveal active';
                newCard.innerHTML =
                    '<div class="star-rating"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>' +
                    '<p class="text-white fst-italic">"' + comment + '"</p>' +
                    '<div class="mt-4"><h6 class="text-white mb-0">' + name + '</h6><small class="text-white-50">' + loc + '</small></div>';
                container.appendChild(newCard);
                alert('Thank you! Your 5-star review has been posted live.');
                checkAndEnableCycling();
            } else {
                alert('Thank you for your feedback! We have received your submission.');
            }
            reviewForm.reset();
            modal.hide();
        });

        checkAndEnableCycling();
    }
})();

// --- Contact Form Handler ---
(function () {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var firstName = document.getElementById('firstName').value;
            alert(
                'Thank you, ' + firstName + '! Your message has been received. I\'ll get back to you as soon as possible.'
            );
            contactForm.reset();
        });
    }
})();

// --- FAQ Accordion (auto-close others) ---
(function () {
    var faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            var parent = this.parentElement;
            var siblings = parent.parentElement.querySelectorAll('.faq-item');
            siblings.forEach(function (sibling) {
                if (sibling !== parent) {
                    sibling.classList.remove('open');
                }
            });
        });
    });
})();

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- Mobile navbar auto-close on link click ---
(function () {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    var navCollapse = document.getElementById('navbarNav');
    if (navCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });
    }
})();
