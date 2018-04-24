
const HARD_RIGHT = "hard_right",
      RIGHT      = "right",
      MIDDLE     = "middle",
      LEFT       = "left",
      HARD_LEFT  = "hard_left";

const TYPE_BASIC = "enemy_basic",
      TYPE_BASIC_SHOT = "enemy_basic_shoot",
      TYPE_SCATTER_SHOT = "enemy_scatter_shot",
      TYPE_TARGET_PLAYER = "enemy_target_player";


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
    {
        spawnTime: 33,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 33,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 33,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 36,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 36,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 36,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },




    // breakdown
    {
        spawnTime: 40,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 40.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 41,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 41.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 42,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 42.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },
    {
        spawnTime: 43,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 43.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },

    {
        spawnTime: 44,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 44.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 45,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 45.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 46,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 46.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },
    {
        spawnTime: 47,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 47.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },

    {
        spawnTime: 48,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 48.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 49,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 49.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 50,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 50.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },
    {
        spawnTime: 51,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 51.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },

    {
        spawnTime: 52,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 52.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 53,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 53.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 54,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 54.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },
    {
        spawnTime: 55,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_RIGHT]
    },
    {
        spawnTime: 55.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },



    // end breakdown


    {
        spawnTime: 56,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [MIDDLE]
    },
    {
        spawnTime: 56.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [LEFT]
    },
    {
        spawnTime: 56.5,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [RIGHT]
    },
    {
        spawnTime: 57,
        type: TYPE_BASIC_SHOT,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 57,
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
        type: TYPE_TARGET_PLAYER,
        spawnLocation: [HARD_LEFT]
    },
    {
        spawnTime: 106,
        type: TYPE_TARGET_PLAYER,
        spawnLocation: [HARD_RIGHT]
    },

];
