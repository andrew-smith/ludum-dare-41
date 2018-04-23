
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

    {
        spawnTime: 21,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 21,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },


    {
        spawnTime: 25,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },


    {
        spawnTime: 30,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 30,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 30,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },







    // Middle section - constant beat
    // left to right
    {
        spawnTime: 87,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 88,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 89,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 90,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },
    {
        spawnTime: 91,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },

    // wave of 2
    {
        spawnTime: 93,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 93,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },

    // wave of 3
    {
        spawnTime: 96,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 96,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 96,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },

    // wave of 5
    {
        spawnTime: 100,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 100,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 100,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 100,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },
    {
        spawnTime: 100,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },



    {
        spawnTime: 105,
        type: TYPE_SCATTER_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 106,
        type: TYPE_SCATTER_SHOT,
        spawnLocation: [HARD_LEFT]
    },

];
