(function ($) {
    "use strict";

    // Superfish on nav menu
    $('.nav-menu').superfish({
        animation: {opacity: 'show'},
        speed: 400
    });
    
    
    // Typed Initiate
    if ($('.top-header h2').length == 1) {
        var typed_strings = $('.top-header p').text();
        var typed = new Typed('.top-header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    // Smooth scrolling on the navbar links
    $(".nav-menu a, #mobile-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.nav-menu').length) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
            }
        }
    });


    // Stick the header at top on scroll
    $(".header").sticky({topSpacing: 0, zIndex: '50'});


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Skills section
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });


    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    //progress bar 
    document.addEventListener("DOMContentLoaded", function () {
        const progressBars = document.querySelectorAll(".progress-bar");
    
        progressBars.forEach(bar => {
            const percentage = bar.getAttribute("data-percent");
            bar.style.width = percentage + "%";
            bar.textContent = percentage + "%"; // Display percentage inside the bar
        });
    });
    
    // Toggle the experience details based on the clicked section
    document.getElementById('current-work').addEventListener('click', function() {
        document.getElementById('current-work-details').classList.add('active');
        document.getElementById('volunteering-details').classList.remove('active');
    });

    document.getElementById('volunteering').addEventListener('click', function() {
        document.getElementById('volunteering-details').classList.add('active');
        document.getElementById('current-work-details').classList.remove('active');
    });

    function showExperienceDetails(id) {
        // Blur background
        document.querySelector('.experience-boxes').classList.add('blur');
        
        // Show popup
        document.getElementById(id).classList.add('active');
    }

    function closeExperienceDetails() {
        // Remove blur effect
        document.querySelector('.experience-boxes').classList.remove('blur');
        
        // Hide all popups
        document.querySelectorAll('.experience-popup').forEach(popup => {
            popup.classList.remove('active');
        });
    }
    
    document.addEventListener("click", function (event) {
        if (event.target.closest(".popup")) return;
        let popups = document.querySelectorAll(".popup.active");
        for (let popup of popups) {
            popup.classList.remove("active");
        }
    });

    
    function opentab(tabname) {
        var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-content");

        // Remove active classes from all tabs and hide all content
        for (var tablink of tablinks) {
            tablink.classList.remove("active-link");
        }

        for (var tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }

        // Add active class to the clicked tab and show its content
        document.getElementById(tabname).classList.add("active-tab");
        event.currentTarget.classList.add("active-link");

        // Restart progress bar animation if 'skills' tab is clicked
        if (tabname === "skills") {
            let progressBars = document.querySelectorAll("#skills .progress-bar");
            progressBars.forEach((bar) => {
                let width = bar.getAttribute("data-percent"); // Get target percentage
                bar.style.width = "0"; // Reset width

                setTimeout(() => {
                    animateProgressBar(bar, width);
                }, 200); // Small delay before starting animation
            });
        }

        
    }

    // Function to animate progress bars
    document.addEventListener("DOMContentLoaded", function () {
        const progressBars = document.querySelectorAll(".progress-bar");
    
        progressBars.forEach(bar => {
            let targetPercent = parseInt(bar.getAttribute("data-percent"));
            let currentPercent = 0;
    
            // Reset width to 0 for animation to replay when revisiting the page
            bar.style.width = "0%";
            bar.textContent = "0%";
    
            setTimeout(() => {
                let interval = setInterval(() => {
                    if (currentPercent >= targetPercent) {
                        clearInterval(interval);
                    } else {
                        currentPercent++;
                        bar.style.width = currentPercent + "%";
                        bar.textContent = currentPercent + "%";
                    }
                }, 20); // Adjust speed (lower = faster)
            }, 500); // Delay to ensure reset effect
        });
    });
    

    // Ensure Progress Bar Animates on Page Load if Skills Tab is Active
    document.addEventListener("DOMContentLoaded", function () {
        if (document.getElementById("skills").classList.contains("active-tab")) {
            let progressBars = document.querySelectorAll("#skills .progress-bar");
            progressBars.forEach((bar) => {
                let width = bar.getAttribute("data-percent");
                animateProgressBar(bar, width);
            });
        }
    });



})(jQuery);

