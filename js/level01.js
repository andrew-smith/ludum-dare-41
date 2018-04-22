
const HARD_RIGHT = "hard_right",
      RIGHT      = "right",
      MIDDLE     = "middle",
      LEFT       = "left",
      HARD_LEFT  = "hard_left";

const TYPE_BASIC = "enemy_basic",
      TYPE_BASIC_SHOT = "enemy_basic_shoot";


var LEVEL1 = [
    {
        spawnTime: 1,
        deposeTime: 15,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 8,
        deposeTime: 15,
        type: TYPE_BASIC,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 12,
        deposeTime: 20,
        type: TYPE_BASIC,
        spawnLocation: [RIGHT, LEFT]
    }
];
