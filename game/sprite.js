class Sprite {
  constructor(game, image, actor, clipRect, width, height) {
    this.game = game;
    this.image = image;
    this.actor = actor;
    this.clipRect = clipRect;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.clipRect.x,
      this.clipRect.y,
      this.clipRect.width,
      this.clipRect.height,
      this.actor.x,
      this.actor.y,
      this.width,
      this.height
    );
  }
}
