

// square explosion image
const IMG_EXP_SIZE = 42;
const MAX_IMG_COUNT = 6;
const IMG_EXP_FRAME_LENGTH = 50;

const createExplosion = (x, y) => {

    let exp = {
        x: x,
        y: y,
        explosion: true,
        timeAlive: 0,
        draw: (delta) => {

            g.save();

            g.translate(exp.x, exp.y);

            let explosionIdx = Math.min(Math.floor(exp.timeAlive / IMG_EXP_FRAME_LENGTH), MAX_IMG_COUNT);

            g.drawImage(imgExplosion,
                explosionIdx * IMG_EXP_SIZE,
                0,
                IMG_EXP_SIZE,
                IMG_EXP_SIZE,
                -(IMG_EXP_SIZE/2),
                -(IMG_EXP_SIZE/2),
                IMG_EXP_SIZE,
                IMG_EXP_SIZE
            );

            g.restore();
        },
        update: (delta) => {
            exp.timeAlive += delta;

            if(exp.timeAlive > IMG_EXP_FRAME_LENGTH *  MAX_IMG_COUNT) {
                exp.x = -999; // move off screen and dispose
                exp.y = -999;
            }
        }
    };

    emitShot(exp);
};


const createBasicEnemy = (x, y) => {
    let enemy = {x: x, y:y, type:'basic', health: 100};

    enemy.contains = (checkX, checkY) => {

        if(enemy.isDead()) {
            return false;
        }

        let contains = checkInObject({
            x: checkX, y: checkY
        }, {
            x: enemy.x,
            y: enemy.y,
            width: ENEMY_WIDTH,
            height: ENEMY_HEIGHT
        });

        return contains;
    };

    enemy.hit = (damage) => {
        enemy.health -= damage;

        if(enemy.isDead()) {
            createExplosion(enemy.x, enemy.y);
        }
    };

    enemy.isDead = () => {
        return enemy.health <= 0;
    };

    enemy.update = (delta) => {
        enemy.y += delta * 0.1;
    };

    enemy.draw = (delta) => {
        enemy._basedraw(delta);
    };

    enemy._basedraw = (delta) => {

        if(enemy.isDead()) {
            return;
        }

        g.save();

        g.translate(enemy.x, enemy.y);

        g.drawImage(imgEnemyShip1,
            0,
            0,
            ENEMY_WIDTH,
            ENEMY_WIDTH,
            -(ENEMY_WIDTH/2),
            -(ENEMY_WIDTH/2),
            ENEMY_WIDTH,
            ENEMY_WIDTH
        );

        g.restore();

    };

    return enemy;
};

const IMG_NME_BULLET_SIZE = 8;

// creates a shot object that sends it out via a vector
const createVectorShot = (pos, vec) => {
    let shot = {
        x: pos.x,
        y: pos.y,
        vec: vec,
        update: (delta) => {
            shot.x += delta * vec.x;
            shot.y += delta * vec.y;
        },
        draw: (delta) => {
            g.fillStyle = 'red';

            g.save();

            g.translate(shot.x, shot.y);

            g.drawImage(imgEnemyBullets,
                0,
                16,
                IMG_NME_BULLET_SIZE,
                IMG_NME_BULLET_SIZE,
                -(IMG_NME_BULLET_SIZE/2),
                -(IMG_NME_BULLET_SIZE/2),
                IMG_NME_BULLET_SIZE,
                IMG_NME_BULLET_SIZE
            );

            g.restore();
        }
    };

    return shot;
};

const createBasicShotEnemy = (x, y) => {
    let enemy = createBasicEnemy(x, y);

    enemy.shootCounter = 500;

    enemy.update = (delta) => {
        enemy.y += delta * 0.1;

        enemy.shootCounter += delta;

        if(enemy.shootCounter > 1000) {

            let shot = createVectorShot({
                x: enemy.x,
                y: enemy.y
            }, {
                x: 0,
                y: 0.2
            });
            emitShot(shot);

            enemy.shootCounter = 0;
        }

    };

    return enemy;
};

const createScatterShotEnemy = (x, y) => {
    let enemy = createBasicEnemy(x, y);

    enemy.shootCounter = 0;
    enemy.lastDegrees = 0;
    enemy.clockwiseShots = Math.random() > 0.5;

    enemy.update = (delta) => {
        enemy.y += delta * 0.1;

        enemy.shootCounter += delta;

        if(enemy.shootCounter > 200) {

            let vector = new Victor(0,0.2);
            vector.rotateByDeg(enemy.lastDegrees);

            if(enemy.clockwiseShots) {
                enemy.lastDegrees += 30;
            }
            else {
                enemy.lastDegrees -= 30;
            }

            let shot = createVectorShot({
                x: enemy.x,
                y: enemy.y
            },vector);


            emitShot(shot);

            enemy.shootCounter = 0;
        }

    };

    return enemy;
};
