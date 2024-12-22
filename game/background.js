class Background {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById('bg_desert');
    this.layer = new Layer(game, this.image, 0, 0, game.height, game.height, 1);
  }

  update() {
    this.layer.update();
  }

  draw(context){
    this.layer.draw(context);
  }
}
