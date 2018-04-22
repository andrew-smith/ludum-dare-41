
const HARD_RIGHT = "hard_right",
      RIGHT      = "right",
      MIDDLE     = "middle",
      LEFT       = "left",
      HARD_LEFT  = "hard_left";

const TYPE_BASIC = "enemy_basic";

var LEVEL1 = [
    {
        spawnTime: 5,
        deposeTime: 10,
        type: TYPE_BASIC,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 10,
        deposeTime: 15,
        type: TYPE_BASIC,
        spawnLocation: [RIGHT, LEFT]
    }
];
