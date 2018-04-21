
// graphics context
let g = null;

// current key state
const keys = {};

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_SPACE = 32;

$(() => {
    console.log("Game loading");

    g = document.getElementById("maincanvas").getContext('2d');

    window.onkeyup = function(e) { keys[e.keyCode] = false; releaseShoot(e.keyCode); }
    window.onkeydown = function(e) { keys[e.keyCode] = true; pressShoot(e.keyCode); }

    gameloop();
});




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


};

const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;

const PLAYER_POSITION = {
    x: (CANVAS_WIDTH / 2),
    y: (CANVAS_HEIGHT - PLAYER_HEIGHT - 5)
};

let PLAYER_SHOTS = [];

let needsReload = false;

const pressShoot = (keyCode) => {
    if(keyCode === KEY_SPACE && !needsReload) {
        // then player can fire
        console.log("fire!");
        PLAYER_SHOTS.push({x: PLAYER_POSITION.x, y: PLAYER_POSITION.y});
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

    if(keys[KEY_W]) {
        PLAYER_POSITION.y -= movement;
    }
    if(keys[KEY_S]) {
        PLAYER_POSITION.y += movement;
    }
    if(keys[KEY_A]) {
        PLAYER_POSITION.x -= movement;
    }
    if(keys[KEY_D]) {
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
    g.fillRect(PLAYER_POSITION.x - (PLAYER_WIDTH/2),
        PLAYER_POSITION.y - (PLAYER_HEIGHT / 2),
        PLAYER_WIDTH,
        PLAYER_HEIGHT);

    g.fillStyle = 'black';
    g.fillRect(PLAYER_POSITION.x,
        PLAYER_POSITION.y,
        2,
        2);

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
