/* ===============================
   PASSWORD + MUSIC (never stops)
================================ */

const PASSWORD = "1402";
const music = document.getElementById("bgm");

/* Keep music alive no matter what - re-attach on any user interaction */
function ensureMusic(){
  if(music.paused){
    music.play().catch(function(){});
  }
}

document.addEventListener("click", ensureMusic);
document.addEventListener("touchstart", ensureMusic);
document.addEventListener("keydown", ensureMusic);

/* When the page regains focus, resume music */
document.addEventListener("visibilitychange", function(){
  if(!document.hidden) ensureMusic();
});

function unlock(){
  var entered = document.getElementById("pass").value;

  if(entered === PASSWORD){
    document.getElementById("lock").classList.add("hidden");
    document.getElementById("journey-intro").classList.remove("hidden");
    music.play().catch(function(){});
  } else {
    alert("Wrong code! Try again!");
  }
}

document.getElementById("pass").addEventListener("keydown", function(e){
  if(e.key === "Enter") unlock();
});


/* ===============================
   JOURNEY DATA
================================ */

var journeyPages = [
  {
    photo: "journey1.jpg",
    text: "Once upon a time, there was this guy... just vibing, wearing a beanie, thinking life was complete with earphones and good music..."
  },
  {
    photo: "journey2.jpg",
    text: "And somewhere else, there was this absolute queen... sitting pretty, dressed in red, not knowing someone was about to fall hopelessly for her..."
  },
  {
    photo: "photo2.jpg",
    text: "Then destiny said 'let me do my thing'... and brought two hearts together. She had no idea this one glance would change everything..."
  },
  {
    photo: "journey3.jpg",
    text: "The first moments together... suddenly the world felt warmer, the sky looked brighter, and my heart? It already knew."
  },
  {
    photo: "journey4.jpg",
    text: "From casual hangouts to dressing up together... every moment with you became my favorite memory."
  },
  {
    photo: "journey5.jpg",
    text: "Train stations, random adventures, your hand on your chin being all cute... I was falling deeper with every second."
  },
  {
    photo: "journey6.jpg",
    text: "Even our tilted, weird-angle selfies are the most beautiful photos in my gallery. Because they have you in them."
  },
  {
    photo: "photo1.jpg",
    text: "Date nights, movie nights, just-because nights... every moment with you is my favorite kind of magic."
  },
  {
    photo: "journey7.jpg",
    text: "Heads together, hearts together... this is where I always want to be. Right next to you."
  },
  {
    photo: "journey8.jpg",
    text: "Festival vibes, matching outfits, your smile outshining every decoration around us... you are my celebration."
  },
  {
    photo: "journey9.jpg",
    text: "Through every season, every outfit change, every good day and bad day... my favorite constant is you."
  },
  {
    photo: "journey10.jpg",
    text: "From strangers to soulmates... this journey has been the best adventure of my life. And I never want it to end."
  }
];

var currentPage = -1;


/* ===============================
   JOURNEY NAVIGATION
================================ */

function showScreen(id){
  var screens = document.querySelectorAll(".screen");
  for(var i = 0; i < screens.length; i++){
    screens[i].classList.add("hidden");
  }
  document.getElementById(id).classList.remove("hidden");
}

function nextJourney(startAt){
  if(typeof startAt === "number"){
    currentPage = startAt;
  } else {
    currentPage++;
  }

  if(currentPage >= journeyPages.length){
    showScreen("proposal");
    return;
  }

  showScreen("journey-page");

  var page = journeyPages[currentPage];
  var img = document.getElementById("journey-photo");
  var text = document.getElementById("journey-text");
  var btn = document.getElementById("journey-next-btn");

  /* Fade in new photo */
  img.style.animation = "none";
  img.offsetHeight; /* trigger reflow */
  img.style.animation = "fadeInPhoto 0.6s ease-out";
  img.src = page.photo;

  /* Type out the text */
  text.textContent = "";
  typeText(text, page.text, 0);

  /* Update dots */
  renderDots();

  /* Update button text for last page */
  if(currentPage === journeyPages.length - 1){
    btn.textContent = "The Big Question...";
  } else {
    btn.textContent = "Next";
  }
}

function typeText(el, str, i){
  if(i < str.length){
    el.textContent += str[i];
    setTimeout(function(){ typeText(el, str, i + 1); }, 30);
  }
}

function renderDots(){
  var container = document.getElementById("journey-dots");
  container.innerHTML = "";
  for(var i = 0; i < journeyPages.length; i++){
    var dot = document.createElement("span");
    dot.className = "dot" + (i === currentPage ? " active" : "");
    container.appendChild(dot);
  }
}


/* ===============================
   YES / NO BUTTONS
================================ */

var yes = document.getElementById("yes");
var no  = document.getElementById("no");

yes.onclick = function(){
  showFinale();
};

function moveNoButton(){
  var container = no.closest(".btns");
  if(!container) return;

  var rect = container.getBoundingClientRect();
  var btnW = no.offsetWidth;
  var btnH = no.offsetHeight;

  var maxX = rect.width - btnW;
  var maxY = rect.height - btnH;

  no.style.position = "absolute";
  no.style.left = Math.max(0, Math.random() * maxX) + "px";
  no.style.top  = Math.max(0, Math.random() * maxY) + "px";
}

no.addEventListener("mouseover", moveNoButton);
no.addEventListener("touchstart", function(e){
  e.preventDefault();
  moveNoButton();
}, {passive:false});


/* ===============================
   LOVELY FINALE
================================ */

function showFinale(){
  showScreen("finale");

  /* Title with typewriter */
  var titleEl = document.getElementById("finale-title");
  var titleText = "YAAAY! You said YES!";
  titleEl.textContent = "";
  typeText(titleEl, titleText, 0);

  /* Build the scrollable photo strip with ALL our photos */
  var strip = document.getElementById("finale-strip");
  strip.innerHTML = "";
  var allPhotos = [
    "journey1.jpg", "journey2.jpg", "photo2.jpg", "journey3.jpg",
    "journey4.jpg", "journey5.jpg", "journey6.jpg", "photo1.jpg",
    "journey7.jpg", "journey8.jpg", "journey9.jpg", "journey10.jpg"
  ];
  for(var i = 0; i < allPhotos.length; i++){
    var imgEl = document.createElement("img");
    imgEl.src = allPhotos[i];
    imgEl.alt = "Memory " + (i + 1);
    strip.appendChild(imgEl);
  }

  /* The love message */
  var msgEl = document.getElementById("finale-msg");
  var lines = [
    "You just made me the happiest human on this entire planet!",
    "",
    "I promise to be your personal heater in winter,",
    "your unpaid therapist when you're dramatic,",
    "your biggest fan even when you sing badly,",
    "and your forever +1 to everything.",
    "",
    "I'll fight for the last bite of food with you",
    "(but secretly let you win every time).",
    "",
    "You're stuck with me now. No refunds.",
    "No exchange policy. Forever and always.",
    "",
    "I love you more than WiFi,",
    "and that's saying A LOT."
  ];
  msgEl.innerHTML = lines.join("<br>");

  /* Spawn floating hearts continuously */
  startFinaleHearts();

  /* Keep music playing */
  ensureMusic();
}

function startFinaleHearts(){
  var hearts = ["\u2764\uFE0F", "\uD83D\uDC9D", "\uD83D\uDC9E", "\uD83D\uDC93", "\uD83D\uDC9B", "\uD83D\uDC9A", "\uD83D\uDC97", "\uD83D\uDC96"];

  function spawnHeart(){
    var el = document.createElement("span");
    el.className = "finale-float-heart";
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.bottom = "-30px";
    el.style.fontSize = (16 + Math.random() * 20) + "px";
    var duration = 3 + Math.random() * 4;
    el.style.animationDuration = duration + "s";
    document.body.appendChild(el);

    setTimeout(function(){
      if(el.parentNode) el.parentNode.removeChild(el);
    }, duration * 1000);
  }

  setInterval(spawnHeart, 400);
}


/* ===============================
   SAKURA + HEART PARTICLES
================================ */

var canvas = document.getElementById("effects");
var ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var particles = [];

for(var i = 0; i < 60; i++){
  particles.push(createParticle());
}

function createParticle(){
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 6 + 4,
    speed: Math.random() * 1.5 + 0.5,
    drift: Math.random() * 1 - 0.5,
    type: Math.random() > 0.5 ? "petal" : "heart"
  };
}

function drawHeart(x, y, s){
  ctx.fillStyle = "#ff6fa5";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 5*s, y - 5*s, x - 15*s, y + 5*s, x, y + 15*s);
  ctx.bezierCurveTo(x + 15*s, y + 5*s, x + 5*s, y - 5*s, x, y);
  ctx.fill();
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < particles.length; i++){
    var p = particles[i];

    if(p.type === "petal"){
      ctx.fillStyle = "rgba(255,182,193,0.7)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      drawHeart(p.x, p.y, p.size / 5);
    }

    p.y += p.speed;
    p.x += p.drift;

    if(p.y > canvas.height){
      var np = createParticle();
      p.x = np.x;
      p.y = -10;
      p.size = np.size;
      p.speed = np.speed;
      p.drift = np.drift;
      p.type = np.type;
    }
    if(p.x > canvas.width) p.x = 0;
    if(p.x < 0) p.x = canvas.width;
  }

  requestAnimationFrame(animate);
}

animate();
