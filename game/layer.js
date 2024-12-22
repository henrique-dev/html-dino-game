class Layer {
  constructor(game, image, x, y, width, height, speed) {
    this.game = game;
    this.image = image;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.objects = [
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width * 2, y: this.y },
      { x: this.x + this.width * 3, y: this.y },
    ]
  }

  update() {
    this.objects.forEach((object) => {
      object.x -= this.speed;
      if (object.x <= -this.width) {
        object.x = this.width * 3;
      }
    })
  }

  draw(context) {
    this.objects.forEach((object) => {
      context.drawImage(this.image, object.x, object.y, this.width, this.height);
    })

  }
}
