class Game {
  constructor(context, width, height, image) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.player = new Player(this, 50, this.height - 190, 120, 190);
    this.inputHandler = new InputHandler(this);
    this.keys = new Set();
    this.objects = new Map();
    this.objectIdsToRemove = [];
    this.idGenerator = 0;
    this.background = new Background(this);

    this.difficulty = 1;
    this.maxObstaclesPerTime = 1;
    this.nextObstacleTime = 0;
    this.currentObstaclesCount = 0;
    this.gameOver = false;
  }

  start() {
    let startTime = 0;
    this.objects.clear();
    this.currentObstaclesCount = 0;
    this.gameOver = false;

    const animate = (timestamp) => {
      const deltaTime = timestamp - startTime;

      this.context.clearRect(0, 0, this.width, this.height);

      this.update(deltaTime);
      this.draw();
      this.inputPressReceived();
      this.garbageCollector();

      startTime = timestamp;

      if (!this.gameOver) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  inputPressReceived() {
    this.player.inputPressReceived(this.keys);
  }

  inputTouchReceived(code) {
    this.player.inputTouchReceived(code);

    if (code === 'KeyR') {
      this.restartGame();
    }
  }

  restartGame() {
    this.start();
  }

  generateObstacle() {
    if (this.currentObstaclesCount <= 0) {
      const obstacle = new CactusObstacle(this, this.nextId());
      // obstacle.speed += this.difficulty;
      // if (obstacle.speed > 15) {
      //   obstacle.speed = 15;
      // }
      obstacle.onDestroy = () => {
        this.currentObstaclesCount--;
      };
      this.objects.set(obstacle.id, obstacle);

      this.currentObstaclesCount++;
      this.difficulty++;
    }
  }

  update(deltaTime) {
    this.player.update(deltaTime);

    this.objects.forEach((object) => {
      object.update();

      if (object.outOfScreen()) {
        this.objectIdsToRemove.push(object.id);
        object.destroy();
      }

      if (object.collidesWith(this.player)) {
        this.gameOver = true;
      }
    });

    this.generateObstacle();

    this.background.update();
  }

  draw() {
    this.background.draw(this.context);

    this.player.draw(this.context);

    this.objects.forEach((object) => {
      object.draw(this.context);
    });

    if (this.gameOver) {
      this.context.font = '64px Arial';
      const wordMetrics = this.context.measureText('Game Over');
      this.context.fillText('Game Over', (this.width / 2) - wordMetrics.width / 2, this.height / 2);
    }

    this.context.font = '32px Arial';
    this.context.fillText(`Objects count: ${this.objects.size}`, 10, 40);
  }

  garbageCollector() {
    this.objectIdsToRemove.forEach((idToRemove) => {
      this.objects.delete(idToRemove);
    });
    this.objectIdsToRemove = [];
  }

  nextId() {
    return this.idGenerator++;
  }

  spawnObject(ojectClass, x, y) {
    const objectId = this.nextId();

    this.objects.set(objectId, new ojectClass(this, objectId, x, y));
  }
}
