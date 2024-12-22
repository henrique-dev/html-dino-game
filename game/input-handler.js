class InputHandler {
  constructor(game) {
    this.game = game;
    this.keysOnTouch = ['Space', 'KeyR'];
    this.keysOnPress = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    window.addEventListener('keydown', (event) => {
      if (this.keysOnPress.includes(event.code)) {
        this.game.keys.add(event.code);
      } else if (this.keysOnTouch.includes(event.code)) {
        this.game.inputTouchReceived(event.code);
      }
    });

    window.addEventListener('keyup', (event) => {
      this.game.keys.delete(event.code);
    });
  }
}
