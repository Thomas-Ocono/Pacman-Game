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
    this.radius = 19.5;
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
let lastKey = "";

const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
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

function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  boundaries.forEach((boundry) => {
    boundry.draw();

    if (keys.w.pressed && lastKey === "w") {
      for (let i = 0; i < boundaries.length; i++) {
        const boundry = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...player,
              velocity: {
                x: 0,
                y: -1,
              },
            },
            rectangle: boundry,
          })
        ) {
          player.velocity.y = 0;
          break;
        } else {
          player.velocity.y = -1;
        }
      }
    } else if (keys.a.pressed && lastKey === "a") {
      for (let i = 0; i < boundaries.length; i++) {
        const boundry = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...player,
              velocity: {
                x: -1,
                y: 0,
              },
            },
            rectangle: boundry,
          })
        ) {
          player.velocity.x = 0;
          break;
        } else {
          player.velocity.x = -1;
        }
      }
    } else if (keys.s.pressed && lastKey === "s") {
      for (let i = 0; i < boundaries.length; i++) {
        const boundry = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...player,
              velocity: {
                x: 0,
                y: 1,
              },
            },
            rectangle: boundry,
          })
        ) {
          player.velocity.y = 0;
          break;
        } else {
          player.velocity.y = 1;
        }
      }
    } else if (keys.d.pressed && lastKey === "d") {
      for (let i = 0; i < boundaries.length; i++) {
        const boundry = boundaries[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...player,
              velocity: {
                x: 1,
                y: 0,
              },
            },
            rectangle: boundry,
          })
        ) {
          player.velocity.x = 0;
          break;
        } else {
          player.velocity.x = 1;
        }
      }
    }

    if (
      circleCollidesWithRectangle({
        circle: player,
        rectangle: boundry,
      })
    ) {
      console.log("Collision!");
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });
  player.update();
}

animate();

window.addEventListener("keydown", ({ key }) => {
  console.log(key);
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
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
