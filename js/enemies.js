

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

        if(contains) {
            console.log("HIT");
        }
        else {
            console.log("MISS");
        }

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
