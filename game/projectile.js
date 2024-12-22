class Projectile {
  constructor(game, id, x, y) {
    this.game = game;
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 3;
  }

  update() {
    this.x += this.speed;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  outOfScreen() {
    return this.x > this.game.width;
  }
}
