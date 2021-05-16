let videoTemplates = document.querySelectorAll(".videoTemplate");
let popupWindow = document.querySelector(".videoPopup");
let popupEmbed = document.querySelector(".popupEmbed")

console.log(videoTemplates);

popupWindow.addEventListener('click', function () {
    popupWindow.classList.remove('videoPopup--open');
    popupWindow.classList.add('videoPopup--closed');
    popupEmbed.src = "";
});

for (let index = 0; index < videoTemplates.length; index++) {
    videoTemplates[index].addEventListener('click', function () {
        popupWindow.classList.remove('videoPopup--closed');
        popupWindow.classList.add('videoPopup--open');
        popupEmbed.src = videoTemplates[index].dataset.videoYtId + "?autoplay=1&rel=0";
      });
    
}

