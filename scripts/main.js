const POPUP_WINDOW = document.querySelector(".videoPopup");
const POPUP_EMBED = document.querySelector(".popupEmbed");
const LOADING_PORTFOLIO = document.querySelector(".loadingPortfolio");
const PAGE_LANGUAGE = document.documentElement.lang;
const VIDEO_DATA_LOCATION = "/data/videos.json";


const PopupAddButtonListener = () => {
    POPUP_WINDOW.addEventListener('click', function () {
        POPUP_WINDOW.classList.remove('videoPopup--open');
        POPUP_WINDOW.classList.add('videoPopup--closed');
        POPUP_EMBED.src = "";
    });
}

const videoTemplate = (element) => (   
    `<div class="videoTemplate" id="${element.id}" data-video-yt-id="${element.link}">
    <div class="videoName">
        <div class="videoFlex">
            <h3>${PAGE_LANGUAGE==="ru"?element.name:element.nameEN}</h3>
            <img src="img/play2.png" alt="Воспроизвести">
            <p>${PAGE_LANGUAGE==="ru"?element.description:element.descriptionEN}</p>
        </div>
    </div>
    <img class="videoBackground" src="img/videoThumbnails/${element.id}.jpg" alt="${element.name}">
    </div>`
    );
    
const GenerateVideoBlocks = (videos) => {
    let videoContainer = document.querySelector(".portfolio");
    LOADING_PORTFOLIO.classList.remove('loadingPortfolio');
    LOADING_PORTFOLIO.classList.add('videoTemplate--closed');
    for (let index=0; index < videos.length; index++) {
        let videoGeneratedTemplate = document.createElement('div');
        videoGeneratedTemplate.innerHTML = videoTemplate(videos[index]);
        let videoTemplateClass = videoGeneratedTemplate.querySelector(".videoTemplate");
        videoTemplateClass.addEventListener('click', () => {
            POPUP_WINDOW.classList.remove('videoPopup--closed');
            POPUP_WINDOW.classList.add('videoPopup--open');
            POPUP_EMBED.src = videos[index].link + "?autoplay=1&rel=0";
        })
        videoContainer.append(videoGeneratedTemplate.firstChild);
    }
}

fetch(VIDEO_DATA_LOCATION)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let videos = data.VideosList;
        PopupAddButtonListener();
        GenerateVideoBlocks(videos);
    })
