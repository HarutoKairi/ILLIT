const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");







const playButton = document.getElementById('playButton');
if (playButton) {
  playButton.addEventListener('click', () => {
    // xử lý khi nhấn nút
  });
}


/*
const btn = document.getElementById('play-btn');
btn?.addEventListener('click', handlePlay);

const btn = document.querySelector('#play-btn');
if (btn) {
  btn.addEventListener('click', handlePlay);
} else {
  console.warn('Không tìm thấy #play-btn trong DOM');
}
*/

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#play-btn');
  if (btn) {
    btn.addEventListener('click', handlePlay);
  }
});


/*
document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.play-pause');
  if (playButton) {
    playButton.addEventListener('click', () => {
      // hành động khi nhấn nút phát/tạm dừng
    });
  }
});
*/


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong(); 
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}


function prevMusic() {
  musicIndex--;
  if (musicIndex < 1) musicIndex = allMusic.length;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

/*
function prevMusic(){
  musicIndex--; 
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

*/

function nextMusic(){
  musicIndex++; 
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

nextBtn.addEventListener("click", ()=>{
  nextMusic();
});



// Thêm một lần, bên ngoài các listener khác
mainAudio.addEventListener("loadeddata", () => {
  let musicDuration = wrapper.querySelector(".max-duration");  // Sửa lỗi chính tả cho rõ ràng
  let mainAdDuration = mainAudio.duration;
  let totalMin = Math.floor(mainAdDuration / 60);
  let totalSec = Math.floor(mainAdDuration % 60);
  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }
  musicDuration.innerText = `${totalMin}:${totalSec}`;
});

// Sau đó, listener timeupdate (không có loadeddata lồng)
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time");
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});



// SỬA LỖI PHẦN PROGRESS BAR 
/*
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; 
  const duration = e.target.duration; 
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
   
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ 
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

*/

// SỬA LỖI CLICK TRÊN PROGRESS AREA
progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; 
  let clickedOffsetX = e.offsetX; 
  let songDuration = mainAudio.duration; 
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); 
  playingSong();
});






const CACHE_NAME = 'illit-music-player-v1';
const urlsToCache = [
  '/',
  '/index.html',
  './js/music-list.js',
  './js/script.js',
  './logo.svg',
  'images/yunah.jpg',
  'images/minju.jpg',
  'images/moka.jpg',
  'images/wonhee.jpg',
  'images/iroha.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});








// PHẦN CÒN LẠI GIỮ NGUYÊN
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

mainAudio.addEventListener("ended", ()=>{
  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; 
      loadMusic(musicIndex); 
      playMusic(); 
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); 
      musicIndex = randIndex; 
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration"></span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); 

  let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    };
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`; 
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); 
  });
}

function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}







// Xử lý chơi nhạc ở nền trên iOS
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && !mainAudio.paused) {
    // Giữ audio chạy ở nền (iOS sẽ tự handle nếu là PWA)
    mainAudio.play().catch(() => {});
  }
});

// Bắt sự kiện khi màn hình tắt (dùng screen wake lock nếu hỗ trợ, nhưng iOS hạn chế)
if ('wakeLock' in navigator) {
  let wakeLock = null;
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock released');
      });
    } catch (err) {
      console.error('Wake Lock failed:', err);
    }
  };

  mainAudio.addEventListener('play', requestWakeLock);
} else {
  console.warn('Wake Lock API not supported (common on iOS)');
}

// Đảm bảo audio preload
mainAudio.preload = 'auto';



