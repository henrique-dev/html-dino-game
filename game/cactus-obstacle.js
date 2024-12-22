class CactusObstacle {
  constructor(game, id) {
    this.game = game;
    this.id = id;
    this.image = document.getElementById('cactus');
    this.x = this.game.width;
    this.y = this.game.height - 130;
    this.width = 60;
    this.height = 100;
    this.speed = 5;
    this.collisionBox = {
      x: 0, y: 0, width: 0, height: 0
    }
  }

  update() {
    this.x -= this.speed;
  }

  draw(context) {
    // context.fillRect(
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height
    // );
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collidesWith(object){
    const Ax = this.x + this.collisionBox.x;
    const Ay = this.y + this.collisionBox.y;
    const Aw = this.width + this.collisionBox.width;
    const Ah = this.height + this.collisionBox.height;
    const Bx = object.x + object.collisionBox.x;
    const By = object.y + object.collisionBox.y;
    const Bw = object.width + object.collisionBox.width;
    const Bh = object.height + object.collisionBox.height;

    if (Bx + Bw >= Ax && Bx < Ax + Aw && By + Bh >= Ay && By < Ay + Ah) {
      return true;
    }

    return false;
  }

  outOfScreen() {
    return (this.x + this.width < -this.width * 1.5);
  }

  onDestroy() {
  }

  destroy() {
    this.onDestroy();
  }
}
