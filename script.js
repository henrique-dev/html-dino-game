window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas_game");
  canvas.width = 1500;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");

  const game = new Game(ctx, canvas.width, canvas.height);
  game.start();
});
