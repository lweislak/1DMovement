class Avatar extends Phaser.Scene {
    constructor() {
        super("avatarScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        
        this.bodyX = 200; //Default position for player sprite
        this.bodyY = 500;

        this.heartPosition = this.bodyY;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        this.load.image("character", "character_roundGreen.png");
        this.load.image("heart", "tile_heart.png");
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        my.sprite.character = this.add.sprite(this.bodyX, this.bodyY, "character");
        my.sprite.heart = this.add.sprite(this.bodyX, this.bodyY, "heart");

        my.sprite.heart.visible = false; //start with projectile invisible

        //Key objects
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        let my = this.my; //create an alias to this.my for readability 

        if (this.aKey.isDown && this.bodyX > 0) {
            this.bodyX = this.bodyX - 10; //decrement X coordinate to move body position left
            this.updateCharacterPosition();
        }  else if (this.dKey.isDown && this.bodyX < 800) { //800 is the width of the canvas
            this.bodyX = this.bodyX + 10; //increment X coordinate to move body position right
            this.updateCharacterPosition();
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            my.sprite.heart.visible = true;
        }
        if (my.sprite.heart.visible && this.heartPosition > 0) {
            this.heartPosition = this.heartPosition - 1;
            //console.log("heart position: ", this.heartPosition); //TEST
            my.sprite.heart.setY(this.heartPosition);
        } else {
            my.sprite.heart.visible = false;
        }
    }

    //Helper function to update character sprite when key is pressed
    updateCharacterPosition() {
        let my = this.my;    // create an alias to this.my for readability
        my.sprite.character.setX(this.bodyX);
    }

}