
// graphics context
let g = null;

// timeline graphics context
let tg = null;

// current key state
const keys = {};

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_SPACE = 32;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

// https://stackoverflow.com/a/22593907/462276
Image.prototype.load = function(url){
       var thisImg = this;
       var xmlHTTP = new XMLHttpRequest();
       xmlHTTP.open('GET', url,true);
       xmlHTTP.responseType = 'arraybuffer';
       xmlHTTP.onload = function(e) {
           var blob = new Blob([this.response]);
           thisImg.src = window.URL.createObjectURL(blob);
       };
       xmlHTTP.onprogress = function(e) {
           thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
       };
       xmlHTTP.onloadstart = function() {
           thisImg.completedPercentage = 0;
       };
       xmlHTTP.send();
   };

Image.prototype.completedPercentage = 0;

$(() => {
    console.log("Game loading");

    g = document.getElementById("maincanvas").getContext('2d');
    tg = document.getElementById("beatcanvas").getContext('2d');

    window.onkeyup = function(e) { keys[e.keyCode] = false; releaseShoot(e.keyCode); }
    window.onkeydown = function(e) { keys[e.keyCode] = true; pressShoot(e.keyCode); }

    checkForEverythingLoaded();
});

let backgroundMusic = null;
// p5 function
function preload() {
    console.log("preload");
    backgroundMusic = loadSound("res/bensound-moose.mp3");

    loadImages();
};

let analyzer = null;
let PEAKS = [];

let musicLoaded = false;

// p5 function
function setup() {

    analyzer = new p5.Amplitude();
    analyzer.setInput(backgroundMusic);

    backgroundMusic.processPeaks((peaks) => {
        PEAKS = peaks;

        musicLoaded = true;
    }, 0.5, 0.1, 300); // PRODUCTION SETTINGS
    // }, 0.5, 0.1, 900); // DEV SETTINGS
};
// p5 function
function draw() {
    // LEAVE THIS BLANK
};


let imgPlayerShip = new Image();
let imgLightning = new Image();
let imgRocketButt = new Image();
let imgBackground = new Image();
let imgBackgroundOverlay = new Image();
let imgBullets = new Image();

const loadImages = () => {

    imgPlayerShip.load("res/Main-Ships.png");
    document.getElementById("imagestore").appendChild(imgPlayerShip);

    imgLightning.load("res/lightning-1.png");
    document.getElementById("imagestore").appendChild(imgLightning);

    imgRocketButt.load("res/rocket-butts.png");
    document.getElementById("imagestore").appendChild(imgRocketButt);

    imgBackground.load("res/background.png");
    document.getElementById("imagestore").appendChild(imgBackground);

    imgBackgroundOverlay.load("res/background-overlay.png");
    document.getElementById("imagestore").appendChild(imgBackgroundOverlay);

    imgBullets.load("res/bullet-collection.png");
    document.getElementById("imagestore").appendChild(imgBullets);
};



const checkForEverythingLoaded = () => {

    let allLoaded = musicLoaded;

    allLoaded = allLoaded && imgPlayerShip.completedPercentage > 99;
    allLoaded = allLoaded && imgLightning.completedPercentage > 99;
    allLoaded = allLoaded && imgRocketButt.completedPercentage > 99;
    allLoaded = allLoaded && imgBackground.completedPercentage > 99;
    allLoaded = allLoaded && imgBackgroundOverlay.completedPercentage > 99;
    allLoaded = allLoaded && imgBullets.completedPercentage > 99;

    if(!allLoaded) {
        console.log("still loading");
        setTimeout(checkForEverythingLoaded, 100);
    }
    else {
        console.log("READY TO START");


        backgroundMusic.play();
        gameloop();
    }
};

// how long since last frame
let LAST_UPDATE = 0;

const gameloop = () => {
    var now = new Date().getTime();

    // first time loop
    if(LAST_UPDATE === 0) {
        LAST_UPDATE = now;
    }

    let delta = now - LAST_UPDATE;

    playerActions(delta);

    g.save();
    g.imageSmoothingEnabled = false;
    render(delta);
    g.restore();

    LAST_UPDATE = now;
    setTimeout(gameloop, 1);
};

const CANVAS_WIDTH = 256;
const CANVAS_HEIGHT = 320;

const CANVAS_SCALE = 2;

const render = (delta) => {

    g.scale(CANVAS_SCALE, CANVAS_SCALE);

    // background picture
    renderBackground(delta);

    renderPlayer(delta);

    renderHud(delta);

    renderTimeline(delta);
};

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 32;

const PLAYER_POSITION = {
    x: (CANVAS_WIDTH / 2),
    y: (CANVAS_HEIGHT - PLAYER_HEIGHT - 5)
};

let PLAYER_SHOTS = [];

let needsReload = false;
let peaksFired = {};

// where the player is in their progression
// to get more powerfull bullets
let currentShotIndex = 0;

// how many shots are not missed (progression up bullets)
let shotsInARow = 0;

function clamp(num, min, max) {
    return Math.floor(num <= min ? min : num >= max ? max : num);
}

const pressShoot = (keyCode) => {
    if(keyCode === KEY_SPACE && !needsReload) {
        // then player can fire

        // work out how many points
        let now = backgroundMusic.currentTime();

        // find the closest peak
        let closestPeak = 99999999;
        let closestDiff = 99999999;
        peaksFired[closestPeak] = 'miss';

        PEAKS.forEach((peak) => {
            let diff = now - peak;

            if(diff < 0) {
                diff = diff * -1;
            }

            if(!peaksFired[peak] && diff < closestDiff) {
                closestDiff = diff;
                closestPeak = peak;

                //peaksFired[peak] = 'bad';
            }


        });

        if(closestDiff < 0.3) {
            peaksFired[closestPeak] = 'bad';
        }
        if(closestDiff < 0.2) {
            peaksFired[closestPeak] = "ok";
        }
        if(closestDiff < 0.1) {
            peaksFired[closestPeak] = "good";
        }
        if(closestDiff < 0.05) {
            peaksFired[closestPeak] = "great";
        }
        if(closestDiff < 0.02) {
            peaksFired[closestPeak] = "perfect";
        }

        let shotResult = 'miss';

        // this means we fired
        if(peaksFired[closestPeak] && closestDiff < 0.3) {
            flashIndex = 0;
            shotsInARow++;

            currentShotIndex = 1;
            if(shotsInARow > 5) {
                currentShotIndex = 2;
            }
            if(shotsInARow > 15) {
                currentShotIndex = 3;
            }

            console.log("Shots in a row: " + shotsInARow);
            console.log("Shot index    : " + currentShotIndex);

            shotResult = peaksFired[closestPeak];

            let shot = {
                x: PLAYER_POSITION.x,
                y: PLAYER_POSITION.y,
                type: 'bullet',
                level: 1,
                ttl: 3000,
                maxttl: 3000
            };

            shot.level = clamp(currentShotIndex, 1, 3);

            // shot.type = 'light';
            // shot.ttl = 200;

            shot.maxttl = shot.ttl;

            PLAYER_SHOTS.push(shot);

            if(shotsInARow > 25) {
                let lightning = {
                    x: PLAYER_POSITION.x,
                    y: PLAYER_POSITION.y,
                    type: 'light',
                    ttl: 250,
                    maxttl: 250
                };

                PLAYER_SHOTS.push(lightning);
            }
        }

        shotTextTtl = MAX_SHOT_TEXT_TTL;
        shotText = shotResult;


        console.log(shotResult);
        if(shotResult === 'miss') {
            shotsInARow = 0;
        }


        needsReload = true;
    }
};

const releaseShoot = (keyCode) => {
    if(keyCode === KEY_SPACE) {
        needsReload = false;
    }
};


const playerActions = (delta) => {

    let movement = 0.15 * delta;

    if(keys[KEY_W] || keys[KEY_UP]) {
        PLAYER_POSITION.y -= movement;
    }
    if(keys[KEY_S] || keys[KEY_DOWN]) {
        PLAYER_POSITION.y += movement;
    }
    if(keys[KEY_A] || keys[KEY_LEFT]) {
        PLAYER_POSITION.x -= movement;
    }
    if(keys[KEY_D] || keys[KEY_RIGHT]) {
        PLAYER_POSITION.x += movement;
    }

    // check bounds
    if(PLAYER_POSITION.y > CANVAS_HEIGHT) {
        PLAYER_POSITION.y = CANVAS_HEIGHT;
    }
    if(PLAYER_POSITION.y < 0 + PLAYER_HEIGHT) {
        PLAYER_POSITION.y = 0 + PLAYER_HEIGHT;
    }
    if(PLAYER_POSITION.x > CANVAS_WIDTH) {
        PLAYER_POSITION.x = CANVAS_WIDTH;
    }
    if(PLAYER_POSITION.x < 0) {
        PLAYER_POSITION.x = 0;
    }

    calculatePlayerShots(delta);
};


const calculatePlayerShots = (delta) => {
    let movement = 0.4 * delta;

    // player can only have x bullets in flight at once.
    // keep newer ones, discard old ones
    while(PLAYER_SHOTS.length > 25) {
        PLAYER_SHOTS.shift();
    }

    PLAYER_SHOTS.forEach((shot) => {

        if(shot.type === 'bullet') {
            shot.y -= movement;
        }
        if(shot.type === 'light') {
            shot.x = PLAYER_POSITION.x;
            shot.y = PLAYER_POSITION.y;
        }

        shot.ttl -= delta;

        if(shot.ttl < 0) {
            shot.expired = true;
        }
    });
};


const IMG_BG_WIDTH = 256;
const IMG_BG_HEIGHT = 320;

let bgPattern = null;
const getBgPattern = () => {
    if(!bgPattern) {
        bgPattern = g.createPattern(imgBackground, "repeat");
    }

    return bgPattern;
}

let bgOverlay = null;
const getBgOverlayPattern = () => {
    if(!bgOverlay) {
        bgOverlay = g.createPattern(imgBackgroundOverlay, "repeat");
    }
    return bgOverlay;
}

let backgroundOffset = 0;
let backgroundOverlayOffset = 0;
let bgTwinkle = 0;

const renderBackground = (delta) => {

    backgroundOffset += delta * 0.004;
    backgroundOverlayOffset += delta * 0.02;

    g.fillStyle = 'blue';
    g.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

    let twinkleOffset = 0;

    g.save();
    g.translate(0, backgroundOffset);
    g.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    g.fillStyle = getBgPattern();
    g.fill();
    g.restore();


    g.save();
    g.translate(0, backgroundOverlayOffset);
    g.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    g.fillStyle = getBgOverlayPattern();
    g.fill();
    g.restore();


}

let shotText = "";
let shotTextTtl = 0;
const MAX_SHOT_TEXT_TTL = 500;

const renderHud = (delta) => {

    shotTextTtl -= delta;

    if(shotTextTtl < 0) {
        shotTextTtl = 0;
    }

    g.save();

    g.globalAlpha = (shotTextTtl / MAX_SHOT_TEXT_TTL);
    g.fillStyle = 'pink';
    g.fillText(shotText, 5, 30);

    g.restore();

};

const renderPlayer = (delta) => {



    renderPlayerShots(delta);

    g.save();

    g.translate(PLAYER_POSITION.x,PLAYER_POSITION.y);

    // g.fillRect(-PLAYER_WIDTH / 2,
    //     -PLAYER_HEIGHT / 2,
    //     PLAYER_WIDTH,
    //     PLAYER_HEIGHT);

    // ship flame



    g.drawImage(imgPlayerShip,
        0 + 40 * 5,
        0,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
        -(PLAYER_WIDTH / 2),
        -(PLAYER_HEIGHT / 2),
        PLAYER_WIDTH,
        PLAYER_HEIGHT);


    g.fillStyle = 'black';
    g.fillRect(0,
        0,
        2,
        2);

    g.restore();
};




const renderPlayerShots = (delta) => {

    PLAYER_SHOTS.forEach((shot) => {
        if(shot.type === 'bullet') {
            renderBullet(shot);
        }
        else if(shot.type === 'light') {
            renderLightning(shot);
        }
    });


};

const BULLET_DIMS = {
    1: {
        w: 4, h: 7,
        sx: 0
    },
    2: {
        w: 8, h: 24,
        sx: 4
    },
    3: {
        w: 16, h: 32,
        sx: 12
    }
};

// height of the image
const IMG_BULLET_HEIGHT = 32;

const renderBullet = (shot) => {
    g.fillStyle = 'black';

    g.save();

    g.translate(shot.x, shot.y);

    let bullet = BULLET_DIMS[shot.level];

    g.drawImage(imgBullets,
        bullet.sx,
        IMG_BULLET_HEIGHT - bullet.h,
        bullet.w,
        bullet.h,
        -(bullet.w/2),
        0,
        bullet.w,
        bullet.h
    );

    g.restore();
};

IMG_LIGHT_WIDTH = 48;
IMG_LIGHT_HEIGHT = 320;

const renderLightning = (shot) => {
    g.fillStyle = 'white';

    if(shot.ttl < 0) {
        return;
    }

    g.save();

    g.globalAlpha = (shot.ttl / shot.maxttl);

    g.translate(shot.x, shot.y);

    // make skinnier (not height)
    g.scale(0.5, 1);

    if(Math.random() > 0.5) {
        g.scale(-1, 1);
    }

    g.drawImage(imgLightning,
        0,
        0,
        IMG_LIGHT_WIDTH,
        IMG_LIGHT_HEIGHT,
        -(IMG_LIGHT_WIDTH / 2),
        -IMG_LIGHT_HEIGHT,
        IMG_LIGHT_WIDTH,
        IMG_LIGHT_HEIGHT);

    g.restore();
};

const CANVAS_BEAT_WIDTH = 512;
const CANVAS_BEAT_HEIGHT = 50;

const flashArray = [
    'e6e6ff',
    'ccccff',
    'b3b3ff',
    '9999ff',
    '8080ff',
    '6666ff',
    '4d4dff',
    '3333ff',
    '1a1aff'
];
let flashIndex = 999;

const renderTimeline = (delta) => {

    flashIndex++;

    tg.save();



    tg.fillStyle = 'blue';
    if(flashIndex < flashArray.length) {
        tg.fillStyle = '#' + flashArray[flashIndex];
    }
    tg.fillRect(0,0,CANVAS_BEAT_WIDTH, CANVAS_BEAT_HEIGHT);


    if(backgroundMusic) {
        let midpoint = CANVAS_BEAT_WIDTH / 2;

        // area in the middle to indicate where to hit the beat
        const hitbar_width = 5
        tg.fillStyle = 'grey';
        tg.fillRect(midpoint - (hitbar_width/2), 0, hitbar_width, CANVAS_BEAT_HEIGHT);


        let now = backgroundMusic.currentTime();

        PEAKS.forEach((peak) => {
            tg.save();

            let diff = (now - peak) * 100;

            tg.translate(midpoint, 0);

            let beatWidth = 2;


            tg.fillStyle = 'black';

            if(peaksFired[peak]) {
                tg.fillStyle = 'grey';
            }
            if(diff < 7 && diff > -7) {
                tg.fillStyle = 'red';
                beatWidth = 4;
            }

            tg.fillRect(diff, 0, beatWidth, CANVAS_BEAT_HEIGHT);



            tg.restore();
        });

    }

    tg.restore();
}
