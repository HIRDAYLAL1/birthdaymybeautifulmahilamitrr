/* =========================================================
   BIRTHDAY WEBSITE — MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const pages = document.querySelectorAll(".page");

function showPage(pageNumber) {

    pages.forEach(page => {
        page.classList.add("hidden");
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(`page${pageNumber}`);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
        selectedPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================================================
   BACKGROUND MUSIC
========================================================= */

const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 0.65;


/* =========================================================
   PAGE 1 → PAGE 2
========================================================= */

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    /*
       Browser music autoplay restrictions mean
       music is started after the user's click.
    */

    bgMusic.play().catch(() => {
        console.log("Music could not start automatically.");
    });

    showPage(2);
});


/* =========================================================
   PAGE 2 — PASSWORD
========================================================= */

const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passwordMessage = document.getElementById("passwordMessage");

const correctPassword = "HEY CUTIE MAHILA MITRR";


function checkPassword() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === correctPassword) {

        passwordMessage.textContent =
            "Password correct ❤️ Surprise unlocked!";

        passwordMessage.style.color = "#17834b";

        setTimeout(() => {
            showPage(3);
        }, 900);

    } else {

        passwordMessage.textContent =
            "Oops! Wrong password 😭 Try again, Mahila Mitrr!";

        passwordMessage.style.color = "#b01650";

        passwordInput.classList.add("wrong-password");

        setTimeout(() => {
            passwordInput.classList.remove("wrong-password");
        }, 500);
    }
}


passwordBtn.addEventListener("click", checkPassword);


/* Allow Enter key to submit password */

passwordInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        checkPassword();
    }

});


/* =========================================================
   PAGE 3 — 17 CANDLES
========================================================= */

const candles = document.querySelectorAll(".candle");

let candlesRemaining = candles.length;

candles.forEach(candle => {

    candle.addEventListener("click", () => {

        if (candle.classList.contains("extinguished")) {
            return;
        }

        candle.classList.add("extinguished");

        candlesRemaining--;

        if (candlesRemaining === 0) {

            document.getElementById("candleInstruction").textContent =
                "ALL 17 CANDLES ARE OUT! ❤️✨";

            setTimeout(() => {
                showPage(4);
            }, 1300);
        }

    });

});


/* =========================================================
   PAGE 4 — CAKE CUTTING
========================================================= */

const cake = document.getElementById("cake");
const cakeInstruction = document.getElementById("cakeInstruction");

let cakeAlreadyCut = false;

cake.addEventListener("click", () => {

    if (cakeAlreadyCut) {
        return;
    }

    cakeAlreadyCut = true;

    cake.classList.add("cut");

    cakeInstruction.textContent =
        "YAYYY! CAKE CUT HO GAYA! 🎂❤️✨";

    createCelebration();

    setTimeout(() => {
        showPage(5);
        startPhotos();
    }, 2200);

});


/* =========================================================
   CAKE CELEBRATION
========================================================= */

function createCelebration() {

    const symbols = ["❤️", "💖", "✨", "🎉", "💕", "🥳", "🎂"];

    for (let i = 0; i < 25; i++) {

        const item = document.createElement("div");

        item.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        item.style.position = "fixed";
        item.style.left = Math.random() * 100 + "vw";
        item.style.top = "50vh";
        item.style.fontSize =
            (18 + Math.random() * 25) + "px";

        item.style.zIndex = "9999";
        item.style.pointerEvents = "none";

        document.body.appendChild(item);

        const randomX =
            (Math.random() - 0.5) * 500;

        const randomY =
            -(200 + Math.random() * 400);

        item.animate(
            [
                {
                    transform: "translate(0, 0) scale(0.5)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${randomX}px, ${randomY}px) scale(1.3)`,
                    opacity: 0
                }
            ],
            {
                duration: 1400 + Math.random() * 800,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            item.remove();
        }, 2300);
    }
}


/* =========================================================
   PAGE 5 — 15 PHOTOS
========================================================= */

const photos = [

    "Snapchat-1529419096.jpg",

    "IMG-20260917-WA0021.jpg",

    "IMG-20260917-WA0020.jpg",

    "IMG-20260917-WA0005.jpg",

    "IMG-20260917-WA0004.jpg",

    "IMG-20260917-WA0029.jpg",

    "IMG-20260917-WA0019.jpg",

    "IMG-20260917-WA0028.jpg",

    "IMG-20260915-WA0007 (1).jpg",

    "IMG-20260917-WA0006 (1).jpg",

    "IMG-20260915-WA0002.jpg",

    "IMG-20260915-WA0004.jpg",

    "IMG-20260917-WA0027.jpg",

    "IMG-20260915-WA0009.jpg",

    "IMG-20260917-WA0007.jpg"

];


/*
   Temporary messages.

   We will replace these with the final
   photo-specific messages later.
*/

const photoMessages = [

    "A beautiful face deserves a beautiful birthday. ❤️",

    "Some smiles just make the whole picture better. ✨",

    "One more beautiful memory of my Mahila Mitrr. 💕",

    "Birthday girl looking absolutely adorable. ❤️",

    "Another picture, another reason to smile. 🫶",

    "Okay, this picture is actually too cute. 😂❤️",

    "A little moment worth remembering forever. ✨",

    "Mahila Mitrr being Mahila Mitrr. 😂💕",

    "This smile deserves its own appreciation post. ❤️",

    "Beautiful memories, beautiful person. ✨",

    "Just a cute little birthday memory. 💖",

    "Some pictures don't need a caption. ❤️",

    "One of my favourite Mahila Mitrr moments. 🫶",

    "Keep smiling like this always. 💕",

    "And finally... one more beautiful memory. 🎂❤️"

];


const memoryPhoto =
    document.getElementById("memoryPhoto");

const photoMessage =
    document.getElementById("photoMessage");

const photoCounter =
    document.getElementById("photoCounter");

const photoNextBtn =
    document.getElementById("photoNextBtn");


let currentPhoto = 0;
let photosStarted = false;


/* Start the photo sequence */

function startPhotos() {

    if (photosStarted) {
        return;
    }

    photosStarted = true;

    currentPhoto = 0;

    showPhoto();

}


/* Show current photo */

function showPhoto() {

    if (currentPhoto >= photos.length) {

        photoCounter.textContent =
            "All memories complete ❤️";

        photoMessage.textContent =
            "That's all the memories for now... but the friendship continues. ❤️";

        photoNextBtn.classList.remove("hidden");

        return;
    }


    memoryPhoto.style.animation = "none";

    /*
       Force browser to restart animation
    */

    void memoryPhoto.offsetWidth;

    memoryPhoto.style.animation =
        "photoAppear 0.8s ease";


    memoryPhoto.src =
        photos[currentPhoto];

    photoMessage.textContent =
        photoMessages[currentPhoto];

    photoCounter.textContent =
        `${currentPhoto + 1} / ${photos.length}`;


    /*
       Automatically move to next photo
       after a few seconds.
    */

    setTimeout(() => {

        if (
            currentPhoto <
            photos.length - 1
        ) {

            currentPhoto++;

            showPhoto();

        } else {

            currentPhoto++;

            showPhoto();

        }

    }, 4000);

}


/* Page 5 → Page 6 */

photoNextBtn.addEventListener("click", () => {

    showPage(6);

});


/* =========================================================
   PAGE 6 — LETTER
========================================================= */

const openLetterBtn =
    document.getElementById("openLetterBtn");

const closeLetterBtn =
    document.getElementById("closeLetterBtn");

const letterIntro =
    document.getElementById("letterIntro");

const letterBox =
    document.getElementById("letterBox");

const letterNextBtn =
    document.getElementById("letterNextBtn");


/* Open letter */

openLetterBtn.addEventListener("click", () => {

    letterIntro.classList.add("hidden");

    letterBox.classList.remove("hidden");

});


/* Close letter */

closeLetterBtn.addEventListener("click", () => {

    letterBox.classList.add("hidden");

    letterIntro.classList.remove("hidden");

    letterNextBtn.classList.remove("hidden");

});


/* Page 6 → Page 7 */

letterNextBtn.addEventListener("click", () => {

    showPage(7);

});


/* =========================================================
   PAGE 7 — EMOTIONAL MESSAGE
========================================================= */

const emotionalNextBtn =
    document.getElementById("emotionalNextBtn");


/*
   Give the message time to appear
   before showing Next button.
*/

setTimeout(() => {

    emotionalNextBtn.classList.remove("hidden");

}, 4200);


/* Page 7 → Page 8 */

emotionalNextBtn.addEventListener("click", () => {

    showPage(8);

});


/* =========================================================
   PAGE 8 — END
========================================================= */

function finishBirthdayWebsite() {

    /*
       Stop music only on final page.
    */

    bgMusic.pause();

    bgMusic.currentTime = 0;

}


/*
   When Page 8 becomes visible,
   stop music.
*/

emotionalNextBtn.addEventListener("click", () => {

    setTimeout(() => {
        finishBirthdayWebsite();
    }, 100);

});


/* =========================================================
   PREVENT IMAGE DRAGGING
========================================================= */

memoryPhoto.addEventListener("dragstart", (event) => {

    event.preventDefault();

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "🎂 Birthday Website loaded successfully ❤️"
);
// ===============================
// END BUTTON + RESTART
// ===============================

const endBtn = document.getElementById("endBtn");
const thankYouMessage = document.getElementById("thankYouMessage");

if (endBtn) {
    endBtn.addEventListener("click", () => {

        // Hide END button
        endBtn.style.display = "none";

        // Show thank-you message
        if (thankYouMessage) {
            thankYouMessage.classList.remove("hidden");
        }

        // After 2.5 seconds, restart from Page 1
        setTimeout(() => {

            // Hide thank-you message
            if (thankYouMessage) {
                thankYouMessage.classList.add("hidden");
            }

            // Show Page 1
            showPage(1);

            // Show END button again for next cycle
            endBtn.style.display = "";

            // Reset password
            const passwordInput = document.getElementById("passwordInput");
            if (passwordInput) {
                passwordInput.value = "";
            }

            // Reset candles
            document.querySelectorAll(".candle").forEach(candle => {
                candle.classList.remove("blown");
                candle.style.opacity = "1";

                const flame = candle.querySelector(".flame");
                if (flame) {
                    flame.style.display = "inline";
                }
            });

        }, 2500);
    });
}
