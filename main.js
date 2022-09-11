import './style.css';
const canvas = document.getElementById('canvas');
const slider = document.querySelector('.slider');
const slider2 = document.querySelector('.slider2')
const slider3 = document.querySelector('.slider3');
const check = document.querySelector('.check');

let constant = 50;
let wide = 50*1000;
let var1 = 28;
let rotate = 1

function polynomial(x) {
  return (((constant-(var1*x)+((x**3)*rotate))/wide)*-1)+10;
}

slider.value = 50;
slider2.value = 50;
slider3.value = 50;

const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'white';

updateGraph();

function drawFunction(fn, x1, x2) {
  graphFunction(fn, x1, x2);

  function graphFunction(fn, x1, x2) {
    const o = getFunctionValues(fn, x1, x2, 10000);
  
    drawGraph(o.values, x1, x2, o.min, o.max);
  }
  
  function getFunctionValues(fn, x1, x2, n) {
    const arr = [];
    const step = (x2-x1)/n;
  
    let max = Infinity;
    let min = -Infinity;
  
    for(let x = x1; x <= x2; x += step) {
      const y = fn(x);
      arr.push({ x, y });
  
      min = Math.min(y, min);
      max = Math.max(y, max);
    }
  
    return { values: arr, max, min };
  }
  
  function drawGraph(values) {
    for(let i = 0; i < values.length-1; i++) {
      const x = values[i].x+(canvas.width/2);
      const y = values[i].y+(canvas.height/2);
  
      const nextX = values[i+1].x+(canvas.width/2);
      const nextY = values[i+1].y+(canvas.height/2);
  
      ctx.lineTo(x, y, nextX, nextY);
    }
  }
}

ctx.stroke();

function updateGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  drawFunction(polynomial, -360, 0);
  drawFunction(polynomial, 0, 360);

  ctx.stroke();
}

slider.oninput = function() {
  constant = ((slider.value-50)*10000)*wide/1000;

  updateGraph();
}

slider2.oninput = function() {
  wide = slider2.value*1000
  console.log(wide)

  updateGraph();
}

slider3.oninput = function() {
  var1 = (slider3.value-50)*1000;

  updateGraph();
}

check.onchange = function() {
  rotate = rotate*-1;

  updateGraph();
}