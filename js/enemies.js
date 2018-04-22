

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

        g.fillStyle = 'red';
        g.fillRect(
            -(ENEMY_WIDTH /2),
            -(ENEMY_HEIGHT /2),
            ENEMY_WIDTH,
            ENEMY_HEIGHT
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

    enemy.update = (delta) => {
        enemy.y += delta * 0.1;

        enemy.shootCounter += delta;

        if(enemy.shootCounter > 200) {

            let vector = new Victor(0,0.2);
            vector.rotateByDeg(enemy.lastDegrees);

            enemy.lastDegrees += 30;

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