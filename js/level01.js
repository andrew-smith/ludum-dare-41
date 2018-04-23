
const HARD_RIGHT = "hard_right",
      RIGHT      = "right",
      MIDDLE     = "middle",
      LEFT       = "left",
      HARD_LEFT  = "hard_left";

const TYPE_BASIC = "enemy_basic",
      TYPE_BASIC_SHOT = "enemy_basic_shoot",
      TYPE_SCATTER_SHOT = "enemy_scatter_shot";


var LEVEL1 = [
    {
        spawnTime: 1,
        deposeTime: 15,
        type: TYPE_SCATTER_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 1,
        deposeTime: 15,
        type: TYPE_SCATTER_SHOT,
        spawnLocation: [HARD_LEFT]
    },
        {
            spawnTime: 5,
            deposeTime: 15,
            type: TYPE_SCATTER_SHOT,
            spawnLocation: [HARD_RIGHT]
        },
        {
            spawnTime: 5,
            deposeTime: 15,
            type: TYPE_SCATTER_SHOT,
            spawnLocation: [HARD_LEFT]
        },

            {
                spawnTime: 10,
                deposeTime: 15,
                type: TYPE_SCATTER_SHOT,
                spawnLocation: [HARD_RIGHT]
            },
            {
                spawnTime: 10,
                deposeTime: 15,
                type: TYPE_SCATTER_SHOT,
                spawnLocation: [HARD_LEFT]
            }
];
