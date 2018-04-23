
const HARD_RIGHT = "hard_right",
      RIGHT      = "right",
      MIDDLE     = "middle",
      LEFT       = "left",
      HARD_LEFT  = "hard_left";

const TYPE_BASIC = "enemy_basic",
      TYPE_BASIC_SHOT = "enemy_basic_shoot",
      TYPE_SCATTER_SHOT = "enemy_scatter_shot";


var LEVEL1 = [


    // First beats come in
    {
        spawnTime: 13,
        deposeTime: 20,
        type: TYPE_BASIC,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 14,
        deposeTime: 20,
        type: TYPE_BASIC,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 15,
        deposeTime: 20,
        type: TYPE_BASIC,
        spawnLocation: [MIDDLE]
    },

    // Testing guys
    // {
    //     spawnTime: 1,
    //     deposeTime: 15,
    //     type: TYPE_BASIC,
    //     spawnLocation: [HARD_RIGHT]
    // },
    // {
    //     spawnTime: 1,
    //     deposeTime: 15,
    //     type: TYPE_BASIC,
    //     spawnLocation: [HARD_LEFT]
    // },
    // {
    //     spawnTime: 10,
    //     deposeTime: 15,
    //     type: TYPE_SCATTER_SHOT,
    //     spawnLocation: [HARD_RIGHT]
    // },
    // {
    //     spawnTime: 10,
    //     deposeTime: 15,
    //     type: TYPE_SCATTER_SHOT,
    //     spawnLocation: [HARD_LEFT]
    // }
];
