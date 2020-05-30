const canvas = document.getElementById('ellipse');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', function () {
   canvas.width = this.innerWidth
   canvas.height = this.innerHeight
})


class Circle {
   constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.dx = randomize(1.3)
      this.dy = -1.3
   }
   update() {
      if (this.x + this.dx > canvas.width || this.x + this.dx < 0) {
         this.dx = -this.dx
      }
      if (this.y + this.dy > canvas.height || this.y + this.dy < 0) {
         this.dy = -this.dy
      }
      this.x += this.dx
      this.y += this.dy
      this.draw()
   }
}
Circle.prototype.draw = function () {
   c.beginPath()
   c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
   c.fillStyle = this.color
   c.fill()
   c.closePath()
}

let circles = []
function init() {
   let colors = ['#bc3a801a', '#3457b21a']
   for (let i = 0; i < 3; i++) {
      const x = randomize([canvas.width])(10)
      const y = randomize([canvas.height])(10)
      const radius = randomize([110])(40)
      const color = colors[i]
      circles.push(new Circle(x, y, radius, color))
   }
}



function animate() {
   requestAnimationFrame(animate)
   c.clearRect(0, 0, canvas.width, canvas.height)
   circles.forEach(circle => circle.update())

}

function randomize(x) {
   if (Array.isArray(x)) {
      let r
      if (typeof x[0] === 'number') {
         return function (min) {
            return Math.floor(Math.random() * (x - min) + min)
         }
      }
      for (let i = 0; i < x.length; i++) {
         r = Math.round(Math.random() * i)
      }
      return x[r]
   }
   return Math.ceil(Math.random() * x)
}

animate()
init()