

const BOSS_WIDTH = 136;
const BOSS_HEIGHT = 90;

const HEALTH_HEIGHT = 5;
const HEALTH_GAP = 8;

const BOSS = {
    x: 0,
    y: -BOSS_HEIGHT,
    health: 10

};

BOSS.startingHealth = BOSS.health;


BOSS.contains = (point) => {

    return true;
};


BOSS.hit = (dmg) => {
    BOSS.health -= dmg;

    if(BOSS.health < 0) {
        BOSS.health = 0;
        BOSS.deathAnimation();
    }
};

BOSS.isDead = () => {
    return BOSS.health <= 0;
}

BOSS.update = (delta) => {
    BOSS.revealStage(delta);
};

let drawBossImage = true;

BOSS.draw = (delta) => {


    g.save();


    g.translate(BOSS.x, BOSS.y);

    // g.fillStyle = 'red';
    // g.fillRect(
    //     -(BOSS_WIDTH/2),
    //     -(BOSS_HEIGHT/2),
    //     BOSS_WIDTH,
    //     BOSS_HEIGHT);

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

    if(revealStageOver) {
        return;
    }

    BOSS.y += delta * 0.05;

    if(BOSS.y > BOSS_HEIGHT / 2 + 10) {
        revealStageOver = true;
    }
}


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