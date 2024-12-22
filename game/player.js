class Player {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speedY = 2;
    this.speedX = 2;

    this.jumpSpeed = 10;
    this.isJumping = false;
    this.lastJumpTime = 0;
    this.gravity = 0.25;
    this.initialY = 0;

    this.collisionBox = {
      x: 25,
      y: 35,
      width: -50,
      height: -70
    };

    const dinoImage = document.getElementById('dino');

    this.runAnimation = new Animation(
      this.game,
      this,
      dinoImage,
      5,
      11,
      dinoImage.width / 24,
      dinoImage.height,
      this.width,
      this.height
    );
    this.idleAnimation = new Animation(
      this.game,
      this,
      dinoImage,
      0,
      4,
      dinoImage.width / 24,
      dinoImage.height,
      this.width,
      this.height
    );

    this.currentAnimation = this.runAnimation;
  }

  inputPressReceived(keys) {
    if (keys.has('ArrowUp')) {
      this.y -= this.speedY;
    }
    if (keys.has('ArrowDown')) {
      this.y += this.speedY;
    }
    if (keys.has('ArrowLeft')) {
      this.x -= this.speedX;
    }
    if (keys.has('ArrowRight')) {
      this.x += this.speedX;
    }
  }

  inputTouchReceived(code) {
    switch (code) {
      case 'Space':
        this.startJump();
        break;
    }
  }

  startJump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.lastJumpTime = 0;
      this.initialY = this.y;
      this.currentAnimation = this.idleAnimation;
    }
  }

  updateJump(deltaTime) {
    if (this.isJumping) {
      this.y = this.initialY - this.lastJumpTime * (this.jumpSpeed - (this.gravity * this.lastJumpTime) / 2);

      if (this.y + this.height > this.game.height) {
        this.isJumping = false;
        this.y = this.game.height - this.height;
        this.currentAnimation = this.runAnimation;
      }

      this.lastJumpTime += deltaTime * 0.2;
    }
  }

  update(deltaTime) {
    this.updateJump(deltaTime);

    this.currentAnimation.update(deltaTime);
  }

  draw(context) {
    // context.fillRect(
    //   this.x + this.collisionBox.x,
    //   this.y + this.collisionBox.y,
    //   this.width + this.collisionBox.width,
    //   this.height + this.collisionBox.height
    // );

    this.currentAnimation.draw(context);
  }
}
