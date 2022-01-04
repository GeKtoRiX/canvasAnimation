const htmlCanvas01 = document.getElementById("canvas01");
const canvas01 = htmlCanvas01.getContext("2d");
// Растягивание холста на всю страницу. x(width) y(height).
htmlCanvas01.width = window.innerWidth;
htmlCanvas01.height = window.innerHeight;
const particlesArray = [];
/*
Hue - оттенок.
   Отображается в виде градусной цветовой окружности.
     (0, 100%, 50%) - red,
     (120, 100%, 50%) - green,
     (240, 100%, 50%) - blue.
Saturation - насыщенность.
   Отображается в процентном соотношении.
     (0, 0%, 0%) - grey,
     (0, 100%, 100%) - fullcolor.
Lightness - яркость.
   Отображается в процентном соотношении.
    (0, 50%, 0%) - black,
    (0, 50%, 50%) - fullcolor,
    (0, 50%, 100%) - white.
*/
// Переменная хранения цвета HSL.
var hue = 0;
// Установка тригера изменения размеров окна браузера.
window.addEventListener("resize", function () {
  // Растягивание холста на всю страницу. x(width) y(height).
  htmlCanvas01.width = window.innerWidth;
  htmlCanvas01.height = window.innerHeight;
  // Установка цвета заливки элемента.
  canvas01.fillStyle = "red";
  // Установка цвета обводки элемента.
  canvas01.strokeStyle = "blue";
  // Установка ширины обводки
  canvas01.lineWidth = 10;
  // Установка начальной точки отрисовки новой фигуры, используя линии.
  canvas01.beginPath();
  // Создание окружности(метод также используется для создания изогнутой линии или полкруга).
  canvas01.arc(200, 200, 50, 0, Math.PI * 2);
  canvas01.stroke();
  //  Отрисовка заливки элемента
  canvas01.fill();
  console.log(canvas01);
  /*
  // Указание цвета заливки фона.
  canvas01.fillStyle = "white";
  // Отрисовка прямоугольника.
  canvas01.fillRect(10, 10, 50, 50); */
});
// Структура с 2 свойствами
const mouse = {
  x: Math.random() * htmlCanvas01.width,
  y: Math.random() * htmlCanvas01.height,
};
// Триггер клика левой кнопкой мыши.
htmlCanvas01.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // Заполнение массива элементами отрисовки.
  for (let i = 0; i < 15; i++) {
    particlesArray.push(new Particle());
  }
});

// Триггер клика левой кнопкой мыши.
htmlCanvas01.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // Заполнение массива элементами отрисовки.
  for (let i = 0; i < 15; i++) {
    particlesArray.push(new Particle());
  }
});
/*
// Триггер перемещения курсора по экрану.
function drawCircle() {
  canvas01.fillStyle = "blue";
  // Установка ширины обводки
  canvas01.beginPath();
  // Создание окружности(метод также используется для создания изогнутой линии или полкруга).
  canvas01.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  canvas01.fill();
  console.log(canvas01);
}
*/
class Particle {
  constructor() {
    // this.x = Math.random() * htmlCanvas01.width;
    this.x = mouse.x;
    // this.y = Math.random() * htmlCanvas01.height;
    this.y = mouse.y;
    // Получение размера объекта.
    this.size = Math.random() * 15 + 1; //  1-25
    // Изменение скорости вектора.
    this.speedX = Math.random() * 2 - 1; // 0-1
    this.speedY = Math.random() * 2 - 1; // 0-1
    this.color = 'hsl(' + hue + ', 50%, 50%)';
  }
  update() {
    // Изменение вектора движения элеметов.
    this.x += this.speedX;
    this.y += this.speedY;
    // Уменьшение радиуса на 0.1 пикселя при каждой новой отрисовки.
    if (this.size > 0.5) this.size -= 0.1;
  }

  draw() {
    // Отрисовка элементов на холсте.
    canvas01.fillStyle = this.color;
    // Установка ширины обводки
    canvas01.beginPath();
    // Создание окружности(метод также используется для создания изогнутой линии или полкруга).
    canvas01.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    canvas01.fill();
    console.log(canvas01);
  }
}
/*
function init() {
  // Заполнение массива элементами отрисовки.
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}
*/
// Считывание информации и отрисовка окружностей на холсте.
function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.5) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}
// Рекурсия изменения вектора отрисовки элементов массива particlesArray.
function animate() {
  canvas01.fillStyle = "rgba(0,0,0,0.02)";
  canvas01.fillRect(0, 0, htmlCanvas01.width, htmlCanvas01.height);
  // Очищение холста с крайнего верхнего угла до крайнего нижнего угла.
  // canvas01.clearRect(0, 0, htmlCanvas01.width, htmlCanvas01.height);
  // Отрисовка элементов массива  particlesArray.
  handleParticles();
  // Инкрементация цвета HSL.
  hue++;
  // Единоразовый вызов функции отображения фрейма анимации.
  requestAnimationFrame(animate);
  // Перезагрузка страницы после считывания элементов массива.
  // if (particlesArray.length === 0) location.reload();
  console.log(particlesArray.length);
}
// Отрисовка окружностей в рекурсионной функции.
animate();
