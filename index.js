const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Boundry {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = Boundry.width;
    this.height = Boundry.height;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundaries = [];
const player = new Player({
  position: {
    x: Boundry.width + Boundry.width / 2,
    y: Boundry.height + Boundry.width / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"],
];

map.forEach((row, rowIndex) => {
  row.forEach((symbol, symbolIndex) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundry({
            position: {
              x: symbolIndex * Boundry.width,
              y: rowIndex * Boundry.height,
            },
          })
        );
        break;
    }
  });
});

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  boundaries.forEach((boundry) => {
    boundry.draw();
    player.update();
    player.velocity.y = 0;
    player.velocity.x = 0;
  });
  if (keys.w.pressed) {
    player.velocity.y = -1;
  } else if (keys.a.pressed) {
    player.velocity.x = -1;
  } else if (keys.s.pressed) {
    player.velocity.y = 1;
  } else if (keys.d.pressed) {
    player.velocity.x = 1;
  }
}

animate();

window.addEventListener("keydown", ({ key }) => {
  console.log(key);
  switch (key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  console.log(key);
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
