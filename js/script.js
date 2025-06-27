
// code to randomise features book every site refresh. camel case for js, snake for html



// botd functinality
document.addEventListener('DOMContentLoaded', function() {

    const bookOfTheDay = document.querySelector('.botd #book_of_the_day');
    // check for botd 
    if (bookOfTheDay) {
        const bookLogo = bookOfTheDay.querySelector('.book_logo img');
        const bookTitle = bookOfTheDay.querySelector('.book_summary h3.title');
        const bookDescription = bookOfTheDay.querySelector('.book_summary p.description');

        // all book listings. can be expanded
        const books = [
            {
                title: "Romance of the Three Kingdoms",
                description: "It dramatizes the turbulent years at the end of the Han dynasty and the Three Kingdoms period, chronicling the power struggles among the warlords Cao Cao, Liu Bei, and Sun Quan as they vie for control over China. The novel blends history and legend, exploring themes of loyalty, strategy, and heroism. As one of China's Four Great Classical Novels, it has profoundly influenced Chinese culture and literature.",
                image: "./images/rotk.png"
            },
            {
                title: "Summoner: The Novice",
                description: "Summoner: The Novice follows Fletcher, a blacksmith's apprentice who discovers he has the rare ability to summon demons from another world. After a dangerous incident reveals his powers, he is sent to a military academy where gifted students are trained in magic and warfare. There, Fletcher must navigate rivalries, prejudice, and political intrigue, all while mastering his summoning skills and uncovering secrets that could change the fate of the empire. It's a fast-paced fantasy filled with action, magic, and coming-of-age themes.",
                image: "./images/summoner.png"
            },
            {
                title: "Skulduggery Pleasant",
                description: "Skulduggery Pleasant follows twelve-year-old Stephanie Edgley, who discovers a hidden world of magic after her uncle's mysterious death. Teaming up with Skulduggery Pleasant—a wisecracking, fire-throwing, undead detective—Stephanie dives into a world of sorcerers, secrets, and supernatural danger. As they unravel a dark conspiracy, she must quickly learn to navigate magic, monsters, and mayhem in this witty, action-packed fantasy adventure.",
                image: "./images/skulduggery.png"
            },
            {
                title: "The Journey to the West",
                description: "Journey to the West is a classic Chinese novel that follows the epic pilgrimage of the monk Tang Sanzang as he travels to India to obtain sacred Buddhist scriptures. He is accompanied by three magical disciples—most notably the mischievous and powerful Monkey King, Sun Wukong, along with the gluttonous Pigsy and the loyal Sandy. Along the way, they face numerous trials, demons, and moral challenges.",
                image: "./images/west.png"
            },

            {
                title: "A Game of Thrones",
                description: "Set in the fictional continents of Westeros and Essos, the series follows multiple interwoven storylines involving noble families vying for control of the Iron Throne and the Seven Kingdoms of Westeros. Key houses include the Starks, Lannisters, Baratheons, and Targaryens. Central characters such as Jon Snow, Daenerys Targaryen, and Tyrion Lannister navigate complex political intrigue, warfare, and supernatural threats.",
                image: "./images/got.png"
            },

            {
                title: "The Lord of The Rings",
                description: "The Lord of the Rings is an epic fantasy trilogy that follows Frodo Baggins, a humble hobbit tasked with destroying a powerful and corrupting artifact—the One Ring. Guided by the wizard Gandalf and joined by a diverse fellowship of allies, Frodo must journey across Middle-earth to Mount Doom, where the Ring can be destroyed. Along the way, they face dark forces led by the dark lord Sauron, who seeks to reclaim the Ring and conquer the world. Rich with lore, heroism, and themes of friendship and sacrifice, it's a cornerstone of modern fantasy literature.",
                image: "./images/lotr.png"
            }
        ];

        // functions to generate random book, integer, and display
        const getRandomInteger = (arrayLength) => {
            return Math.floor(Math.random() * arrayLength);
        };


        const getRandomBook = () => {
            const randomInteger = getRandomInteger(books.length);
            return books[randomInteger];
        };

        const displayBOTD = (book) => {
            bookLogo.src = book.image;
            bookLogo.alt = `${book.title} cover`;
            bookTitle.textContent = book.title;
            bookDescription.textContent = book.description;
        };

        // call functions and display
        const randomBook = getRandomBook();
        displayBOTD(randomBook);
    }
});

// hamburger dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const myLinks = document.getElementById('mylinks');
    
    if (hamburgerBtn && myLinks) {
        hamburgerBtn.addEventListener('click', function() {
            myLinks.classList.toggle('open');
        });
    }
});

/*---------------------------------------------------------------------*/
// functions to check for validation and send POST request, api calls

document.addEventListener('DOMContentLoaded', function() {
    const expYearSelect = document.getElementById('exp_year');
    if (expYearSelect) {
        // check to see if options are populated
        if (expYearSelect.options.length <= 1) {
            const currentYear = new Date().getFullYear();
            for (let i = 0; i < 10; i++) {
                const yearOption = document.createElement('option');
                yearOption.value = currentYear + i;
                yearOption.textContent = currentYear + i;
                expYearSelect.appendChild(yearOption);
            }
        }
    }
    
    // validation. only allow numbers for cvv
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    const paymentForm = document.getElementById('payment_form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const cardNumber = document.getElementById('card_number').value;
            const expMonth = document.getElementById('exp_month').value;
            const expYear = document.getElementById('exp_year').value;
            const cvv = document.getElementById('cvv').value;
            const messageDiv = document.getElementById('message');
            

            // debugging
            if (!messageDiv) {
                console.error('Message div not found');
                return;
            }

            messageDiv.textContent = "Processing payment...";
            messageDiv.style.color = "#333";
            messageDiv.style.backgroundColor = "#e7f3fe";
            messageDiv.style.border = "1px solid #c3e6cb";

            // validation for card number. allow 16 digits only
            const cardNumberRegex = /^\d{16}$/;
            if (!cardNumberRegex.test(cardNumber)) {
                messageDiv.textContent = "Invalid card number. Please enter 16 digits.";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.style.border = "1px solid #f5c6cb";
                return;
            }

            // card numbers must start with 51-55 for mastercard
            const masterCardRegex = /^5[1-5]\d{14}$/;
            if (!masterCardRegex.test(cardNumber)) {
                messageDiv.textContent = "Invalid card number.  Number must start with 51-55 for MasterCard.";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.style.border = "1px solid #f5c6cb";
                return;
            }            

            // check if expiration date is valid
            const expDate = new Date(expYear, expMonth - 1);
            const today = new Date();
            if (expDate < today) {
                messageDiv.textContent = "Your card has expired.";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.style.border = "1px solid #f5c6cb";
                return;
            }

            // CVV validation
            const cvvRegex = /^\d{3,4}$/;
            if (!cvvRegex.test(cvv)) {
                messageDiv.textContent = "Invalid security code. Please enter 3 or 4 digits.";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.style.border = "1px solid #f5c6cb";
                return;
            }

            const cardData = {
                master_card: parseInt(cardNumber, 10),
                exp_year: parseInt(expYear, 10),
                exp_month: parseInt(expMonth, 10),
                cvv_code: cvv,
            };

            // send data to server
            fetch('https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                // converts into json. 
                body: JSON.stringify(cardData), // data being sent in
            })

            // return error if server error
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || 'Server error');
                    });
                }
                 // to success page after confirmed successful payment
                sessionStorage.setItem('cardLastFour', cardNumber.slice(-4));
                window.location.href = "success.html"; 
                return response.json();
            })
            .then(data => {
                messageDiv.textContent = data.message || "Thank you for your payment.";
                messageDiv.style.backgroundColor = "#d4edda";
                messageDiv.style.color = "#155724";
                messageDiv.style.border = "1px solid #c3e6cb";
            })
            .catch(error => {
                messageDiv.textContent = error.message || "An error occurred. Please try again.";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.style.border = "1px solid #f5c6cb";
            });
        });
    }
});

/*---------------------------------------------------------------------*/
// functions responsible for retrieving the last 4 digits of the card number and displaying them

document.addEventListener('DOMContentLoaded', function() {
    // this gets the last 4 digits from the url
    const urlParameters = new URLSearchParameters(window.location.search);
    const lastFour = urlParameters.get('last4');

    // gets the required element
    const cardNumberDisplay = document.getElementById('card_number_display');

    // concatenate the string with the added text
    if (cardNumberDisplay && lastFour) {
        const maskedNumber = "**** **** **** " + lastFour;
        cardNumberDisplay.textContent = "Your credit card number ends in " + maskedNumber;
    }
    
});

document.addEventListener('DOMContentLoaded', function () {
    const cardNumberDisplay = document.getElementById('card_number_display');

    if (cardNumberDisplay) {

        const lastFour = sessionStorage.getItem('cardLastFour');

        if (lastFour) {
            cardNumberDisplay.textContent = `Your credit card number ends in **** **** **** ${lastFour}`;

            // clear the storage for security
            sessionStorage.removeItem('cardLastFour');
        }
    }
});
