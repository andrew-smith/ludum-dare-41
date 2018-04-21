
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

$(() => {
    console.log("Game loading");

    g = document.getElementById("maincanvas").getContext('2d');
    tg = document.getElementById("beatcanvas").getContext('2d');

    window.onkeyup = function(e) { keys[e.keyCode] = false; releaseShoot(e.keyCode); }
    window.onkeydown = function(e) { keys[e.keyCode] = true; pressShoot(e.keyCode); }

    gameloop();
});

let backgroundMusic = null;
// p5 function
function preload() {
    console.log("preload");
    backgroundMusic = loadSound("res/bensound-moose.mp3");
};

let analyzer = null;
let PEAKS = [];

// p5 function
function setup() {
    console.log("ready to start");

    analyzer = new p5.Amplitude();
    analyzer.setInput(backgroundMusic);

    backgroundMusic.processPeaks((peaks) => {
        PEAKS = peaks;

        console.log("starting");
        backgroundMusic.play();

    }, 0.5, 0.1, 300);
};
// p5 function
function draw() {
    // LEAVE THIS BLANK
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

    if(analyzer) {
        var rms = analyzer.getLevel();


    }


    g.save();
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
    g.fillStyle = 'blue';
    g.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

    renderPlayer(delta);

    renderTimeline(delta);
};

const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;

const PLAYER_POSITION = {
    x: (CANVAS_WIDTH / 2),
    y: (CANVAS_HEIGHT - PLAYER_HEIGHT - 5)
};

let PLAYER_SHOTS = [];

let needsReload = false;
let peaksFired = {};

const pressShoot = (keyCode) => {
    if(keyCode === KEY_SPACE && !needsReload) {
        // then player can fire

        // work out how many points
        let now = backgroundMusic.currentTime();

        // find the closest peak
        let closestPeak = 99999999;
        let closestDiff = 99999999;
        peaksFired[closestPeak] = 'bad';

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

        console.log("DIFF: " + closestDiff);

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

        // this means we fired
        if(peaksFired[closestPeak] && closestDiff < 0.3) {
            flashIndex = 0;

            console.log("fire!");
            PLAYER_SHOTS.push({x: PLAYER_POSITION.x, y: PLAYER_POSITION.y});
        }

        console.log(peaksFired[closestPeak]);


        needsReload = true;
    }
};

const releaseShoot = (keyCode) => {
    if(keyCode === KEY_SPACE) {
        console.log("Reloading")
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
    if(PLAYER_POSITION.y < 0) {
        PLAYER_POSITION.y = 0;
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
    while(PLAYER_SHOTS.length > 10) {
        PLAYER_SHOTS.shift();
    }

    PLAYER_SHOTS.forEach((shot) => {
        shot.y -= movement;
    });
};

const renderPlayer = (delta) => {

    g.fillStyle = 'red';

    g.save();

    g.translate(PLAYER_POSITION.x - (PLAYER_WIDTH/2),
        PLAYER_POSITION.y - (PLAYER_HEIGHT / 2))

    if(analyzer) {
        var rms = analyzer.getLevel();

        // if(rms > 0.4) {
        //     console.log("BEAT");
        // }
        // else {
        //     console.log("-");
        // }
    }

    g.fillRect(0,
        0,
        PLAYER_WIDTH,
        PLAYER_HEIGHT);

    g.fillStyle = 'black';
    g.fillRect(0,
        0,
        2,
        2);

    g.restore();

    renderPlayerShots(delta);
};


const renderPlayerShots = (delta) => {
    g.fillStyle = 'black';

    PLAYER_SHOTS.forEach((shot) => {
        g.fillRect(shot.x,
            shot.y,
            2,
            2);
    });


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
        let now = backgroundMusic.currentTime();

        let midpoint = CANVAS_BEAT_WIDTH / 2;

        PEAKS.forEach((peak) => {
            tg.save();

            let diff = (now - peak) * 100;

            tg.translate(midpoint, 0);


            tg.fillStyle = 'black';

            if(peaksFired[peak]) {
                tg.fillStyle = 'grey';
            }
            if(diff < 10 && diff > -10) {
                tg.fillStyle = 'white';
            }

            tg.fillRect(diff, 0, 2, CANVAS_BEAT_HEIGHT);



            tg.restore();
        });

    }

    tg.restore();
}
