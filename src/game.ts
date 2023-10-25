import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let player: Phaser.Physics.Arcade.Sprite;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

function preload(this: Phaser.Scene) {
    // Load images and sprites
    this.load.image('background', 'assets/images/background/background.jpg');
    this.load.image('platform', 'assets/images/platforms/platform.png');
    this.load.image('moving_platform', 'assets/images/platforms/moving_platform.png');
    this.load.image('player', 'assets/images/player/player.jpg');
    this.load.image('enemy1', 'assets/images/enemies/enemy1.jpg');
    this.load.image('enemy2', 'assets/images/enemies/enemy2.jpg');
    this.load.image('coin', 'assets/images/collectibles/coin.jpg');
    this.load.image('powerup', 'assets/images/collectibles/powerup.jpg');
}

function create(this: Phaser.Scene) {
    // Background
    this.add.image(400, 300, 'background');

    // Platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    // Player
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Physics for player and platforms
    this.physics.add.collider(player, platforms);
    
    // Initialize the cursor keys
    cursors = this.input.keyboard!.createCursorKeys();
    // More game objects and logic can be added here
}

function update(this: Phaser.Scene) {
    // Game loop code goes here, for example handling player movement

    if (cursors) {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
        }
        else {
            player.setVelocityX(0);
        }
        
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }
}

export const game = new Phaser.Game(config);
