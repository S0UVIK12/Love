document.addEventListener("DOMContentLoaded", function () {
    const photos = document.querySelectorAll(".photo");
    let currentPhotoIndex = 0;

    photos.forEach((photo) => {
        let startX, startY, endX, endY;

        // Touch Events for Mobile
        photo.addEventListener("touchstart", (event) => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        });

        photo.addEventListener("touchend", (event) => {
            endX = event.changedTouches[0].clientX;
            endY = event.changedTouches[0].clientY;
            handleSwipe(photo, startX, startY, endX, endY);
        });

        // Mouse Events for Desktop
        photo.addEventListener("mousedown", (event) => {
            startX = event.clientX;
            startY = event.clientY;
        });

        photo.addEventListener("mouseup", (event) => {
            endX = event.clientX;
            endY = event.clientY;
            handleSwipe(photo, startX, startY, endX, endY);
        });
    });

    function handleSwipe(photo, startX, startY, endX, endY) {
        let deltaX = endX - startX;
        let deltaY = endY - startY;
        let direction = "";

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 50 ? "right" : "left";
        } else {
            direction = deltaY < -50 ? "up" : "down";
        }

        if (direction === "left" || direction === "right" || direction === "up") {
            let rotateValue = direction === "left" ? "-20deg" : "20deg";
            let translateValue = direction === "up"
                ? "translateY(-120vh)"
                : `translateX(${deltaX > 0 ? "120vw" : "-120vw"})`;

            photo.style.transform = `${translateValue} rotate(${rotateValue})`;
            photo.style.opacity = "0";

            setTimeout(() => {
                photo.style.display = "none";
                currentPhotoIndex++;

                if (currentPhotoIndex === photos.length) {
                    showRose();
                }
            }, 600);
        }
    }

    function showRose() {
        const roseContainer = document.querySelector(".rose-container");
        roseContainer.style.display = "flex";
        setTimeout(() => {
            roseContainer.style.opacity = "1";
            document.querySelector(".message").style.opacity = "1";
            startHeartsAnimation();
        }, 500);
    }
    
    
});
