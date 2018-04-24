

const BOSS_WIDTH = 136;
const BOSS_HEIGHT = 90;

const STAGE_REVEAL = "reveal";

const HEALTH_HEIGHT = 5;
const HEALTH_GAP = 8;

const BOSS = {
    x: 0,
    y: -BOSS_HEIGHT,
    health: 80000,
    stage: STAGE_REVEAL

};

BOSS.startingHealth = BOSS.health;



const BOSS_BOUNDS_1 = {
    width: BOSS_WIDTH * 0.94,
    height: BOSS_HEIGHT / 3
};

const BOSS_BOUNDS_2 = {
    width: BOSS_WIDTH * 0.8,
    height: BOSS_HEIGHT / 3.4
};

const BOSS_BOUNDS_3 = {
    width: BOSS_WIDTH * 0.5,
    height: BOSS_HEIGHT / 6.4
};

BOSS.contains = (x, y) => {

    let point = {
        x: x,
        y: y
    };

    return checkInObject(
        point,
    {
        x: BOSS.x,
        y: BOSS.y -(BOSS_HEIGHT/2) + (BOSS_BOUNDS_1.height /2),
        width: BOSS_BOUNDS_1.width,
        height: BOSS_BOUNDS_1.height
    }) ||
    checkInObject(
        point,
    {
        x: BOSS.x,
        y: BOSS.y -(BOSS_HEIGHT/2) + (BOSS_BOUNDS_1.height) + (BOSS_BOUNDS_2.height /2),
        width: BOSS_BOUNDS_2.width,
        height: BOSS_BOUNDS_2.height
    }) ||
    checkInObject(
        point,
    {
        x: BOSS.x,
        y: BOSS.y -(BOSS_HEIGHT/2) + (BOSS_BOUNDS_1.height) + (BOSS_BOUNDS_2.height) + (BOSS_BOUNDS_3.height /2),
        width: BOSS_BOUNDS_3.width,
        height: BOSS_BOUNDS_3.height
    });

};


BOSS.hit = (dmg) => {
    BOSS.health -= dmg;

    if(BOSS.health < 0) {
        BOSS.health = 0;
        BOSS.deathAnimation();
        STATS.bossDefeated = 100000;
    }
};

BOSS.isDead = () => {
    return BOSS.health <= 0;
}

BOSS.update = (delta) => {
    BOSS.revealStage(delta);
    BOSS.fightStage(delta);
    BOSS.flyAwayStage(delta);
    BOSS.playerLoseStage(delta);
};

let drawBossImage = true;

BOSS.draw = (delta) => {


    BOSS.drawPlayerLoseStage(delta);

    g.save();


    g.translate(BOSS.x, BOSS.y);


    // g.fillStyle = 'red';
    // g.fillRect(
    //     -(BOSS_BOUNDS_1.width/2),
    //     -(BOSS_HEIGHT/2),
    //     BOSS_BOUNDS_1.width,
    //     BOSS_BOUNDS_1.height);

    // g.fillRect(
    //     -(BOSS_BOUNDS_2.width/2),
    //     -(BOSS_HEIGHT/2) + BOSS_BOUNDS_1.height,
    //     BOSS_BOUNDS_2.width,
    //     BOSS_BOUNDS_2.height);

    // g.fillRect(
    //     -(BOSS_BOUNDS_3.width/2),
    //     -(BOSS_HEIGHT/2) + BOSS_BOUNDS_1.height + BOSS_BOUNDS_2.height,
    //     BOSS_BOUNDS_3.width,
    //     BOSS_BOUNDS_3.height);

    if(drawBossImage) {
        g.drawImage(imgEnemyShips,
            0,
            0,
            BOSS_WIDTH,
            BOSS_HEIGHT,
            -(BOSS_WIDTH/2),
            -(BOSS_HEIGHT/2),
            BOSS_WIDTH,
            BOSS_HEIGHT);
    }
    
        

    // health bar
    g.save();

    g.translate(-(BOSS_WIDTH/2), -(BOSS_HEIGHT/2) - (HEALTH_GAP));

    g.fillStyle = 'green';
    g.fillRect(
        0,
        0,
        BOSS_WIDTH * (BOSS.health / BOSS.startingHealth),
        HEALTH_HEIGHT);

    g.restore();

    g.restore();
};


let revealStageOver = false;

BOSS.revealStage = (delta) => {

    if(BOSS.stage !== STAGE_REVEAL) {
        return;
    }

    BOSS.y += delta * 0.05;

    if(BOSS.y > BOSS_HEIGHT / 2 + 10) {
        BOSS.stage = STAGE_FIGHT;
    }
}


const STAGE_FIGHT = "fight";

let fightShotDelta = 0;

BOSS.fightStage = (delta) => {
    if(BOSS.stage !== STAGE_FIGHT) {
        return;
    }

    fightShotDelta += delta;
};

let deathAnimationStarted = false;
BOSS.deathAnimation = () => {

    if(deathAnimationStarted) {
        return;
    }

    deathAnimationStarted = true;

    deathExplosion();

    for(var i=0; i<120; i++) {
        setTimeout(deathExplosion, i * 4);
    }

    setTimeout(() => {drawBossImage = false;}, 100);
}


const deathExplosion = () => {
    createExplosion(
        (BOSS.x - BOSS_WIDTH/2) + (Math.random() * BOSS_WIDTH),
        (BOSS.y - BOSS_HEIGHT/2) + (Math.random() * BOSS_HEIGHT));
    
}


const STAGE_FLY_AWAY = "fly away!";

const randomFlyAwayDirection = ((Math.random() *2) -1)/20

BOSS.flyAwayStage = (delta) => {
    if(BOSS.stage !== STAGE_FLY_AWAY) {
        return;
    }

    BOSS.x += randomFlyAwayDirection * delta;
    BOSS.y -= 0.1 * delta;

};


const STAGE_PLAYER_LOSE = "time to die now";
let playerLoseDelta = 0;
let showLightning = false;
BOSS.playerLoseStage = (delta) => {
    if(BOSS.stage !== STAGE_PLAYER_LOSE) {
        return;
    }

    showLightning = true;

    // playerLoseDelta += delta;

    // if(playerLoseDelta > playerLoseTimeToFire) {
    //     playerLoseDelta = 0;

    //     playerLoseTimeToFire = Math.max(playerLoseTimeToFire-1, 0);



        // // fire towards player
        // let startPos = new Victor(BOSS.x, BOSS.y);
        // let playerPos = new Victor(PLAYER_POSITION.x, PLAYER_POSITION.y);

        // let vec = new Victor(playerPos.distanceX(startPos),playerPos.distanceY(startPos)).norm();
        // vec = vec.divide(new Victor(1.5, 1.5));


        // emitShot(createVectorShot(startPos, vec));
    // }
};


let bossLightningDelta = 0;
let timeForPlayerToDieDelta = 0;

BOSS.drawPlayerLoseStage = (delta) => {
    if(BOSS.stage !== STAGE_PLAYER_LOSE || BOSS.isDead()) {
        return;
    }

    bossLightningDelta += delta;
    timeForPlayerToDieDelta += delta;

    if(bossLightningDelta < 200) {
        return;
    }
    if(bossLightningDelta > 400) {
        bossLightningDelta = 0;
    }

    if(timeForPlayerToDieDelta > 1000) {
        PLAYER_DEAD = true;
        createExplosion(PLAYER_POSITION.x, PLAYER_POSITION.y);
        endGame();
    }

    // calculate angle towards player
    let startPos = new Victor(BOSS.x, BOSS.y);
    let playerPos = new Victor(PLAYER_POSITION.x, PLAYER_POSITION.y);
    let vec = new Victor(playerPos.distanceX(startPos),playerPos.distanceY(startPos)).norm()

    let angle = vec.angle();

    g.save();

    g.translate(BOSS.x, BOSS.y);
    g.rotate(angle + (Math.PI /2), 0);


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