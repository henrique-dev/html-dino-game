class Animation {
  constructor(game, actor, image, spriteStart, spriteEnd, spriteWidth, spriteHeight, width, height, frameRate = 80) {
    this.game = game;
    this.actor = actor;
    this.image = image;

    this.spriteStart = spriteStart;
    this.spriteEnd = spriteEnd;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;

    this.width = width;
    this.height = height;

    this.frameRate = frameRate;
    this.frameTime = 0;
    this.currentFrame = 0;
    this.sprites = [];

    for (let i=spriteStart; i<spriteEnd; i++) {
      const sprite = new Sprite(
        game,
        this.image,
        this.actor,
        { x: i * this.spriteWidth, y: 0, width: this.spriteWidth, height: 25 },
        this.width, this.height
      )

      this.sprites.push(sprite);
    }
  }

  update(deltaTime) {
    this.frameTime += deltaTime;
    this.currentFrame = parseInt(this.frameTime / this.frameRate);

    if (this.currentFrame >= this.sprites.length) {
      this.frameTime = 0;
      this.currentFrame = 0;
    }
  }

  draw(context) {
    context.imageSmoothingEnabled = false;
    this.sprites[this.currentFrame].draw(context);
    context.imageSmoothingEnabled = true;
  }
}
