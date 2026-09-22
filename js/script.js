// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }

});


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ==========================================
// WELCOME MESSAGE
// ==========================================

window.addEventListener("load", () => {

    console.log("Welcome to Tech Empower Labs!");

});


// ==========================================
// FADE-IN ANIMATION
// ==========================================

const cards = document.querySelectorAll(
    ".card, .product-card, .why-container div"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s ease";

    observer.observe(card);

});


// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL =
    "https://uoykkbpwevqiufysrcrj.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_qK6xGWyIme1gUXDJGj2XOg_RNTRP6rZ";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const subject =
                document.getElementById("subject").value.trim();

            const message =
                document.getElementById("message").value.trim();

            const formMessage =
                document.getElementById("formMessage");

            formMessage.textContent =
                "Sending...";


            const { error } =
                await supabaseClient
                    .from("contact_messages")
                    .insert([
                        {
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        }
                    ]);


            if (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                formMessage.textContent =
                    "Sorry, your message could not be sent.";

            } else {

                formMessage.textContent =
                    "Your message has been sent successfully!";

                contactForm.reset();

            }

        }
    );

}


// ==========================================
// REQUEST QUOTE FORM
// ==========================================

const quoteForm =
    document.getElementById("quoteForm");

if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            // Get form values

            const name =
                document.getElementById("quoteName")
                    .value
                    .trim();

            const email =
                document.getElementById("quoteEmail")
                    .value
                    .trim();

            const phone =
                document.getElementById("quotePhone")
                    .value
                    .trim();

            const organisation =
                document.getElementById("quoteOrganisation")
                    .value
                    .trim();

            const service =
                document.getElementById("quoteService")
                    .value;

            const quantity =
                document.getElementById("quoteQuantity")
                    .value;

            const message =
                document.getElementById("quoteMessage")
                    .value
                    .trim();

            const formMessage =
                document.getElementById(
                    "quoteFormMessage"
                );


            // Show submitting message

            formMessage.textContent =
                "Submitting your quote request...";


            // Send data to Supabase

            const { error } =
                await supabaseClient
                    .from("quote_requests")
                    .insert([
                        {
                            name: name,
                            email: email,
                            phone: phone,
                            organisation: organisation,
                            service: service,

                            quantity: quantity
                                ? parseInt(quantity)
                                : null,

                            message: message
                        }
                    ]);


            // Check result

            if (error) {

                console.error(
                    "Quote request error:",
                    error
                );

                formMessage.textContent =
                    "Sorry, your quote request could not be submitted. Please try again.";

            } else {

                console.log(
                    "Quote request submitted successfully."
                );

                formMessage.textContent =
                    "Your quote request has been submitted successfully!";

                // Clear the form

                quoteForm.reset();

            }

        }
    );

}