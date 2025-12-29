let money = 0;
let level = 1;

window.onload = function() {
  if(localStorage.getItem('money')) money = parseInt(localStorage.getItem('money'));
  if(localStorage.getItem('level')) level = parseInt(localStorage.getItem('level'));
  document.getElementById('money').innerText = money;
  document.getElementById('level').innerText = level;
}

const saleSound = document.getElementById('saleSound');
const bellSound = document.getElementById('bellSound');
const radio = document.getElementById('radio');
const customerVoice = document.getElementById('customerVoice');
radio.volume = 0.3;

function sell(price, element) {
  money += price;
  document.getElementById('money').innerText = money;
  saleSound.play();
  checkLevel();
  localStorage.setItem('money', money);
  localStorage.setItem('level', level);

  element.classList.add('product-sold');
  setTimeout(()=> element.classList.remove('product-sold'), 500);
}

function cook(product) {
  const ovenSound = new Audio("sounds/oven.mp3");
  ovenSound.volume = 0.5;
  ovenSound.play();
  product.classList.add('cooking');
  setTimeout(() => product.classList.remove('cooking'), 3000);
  bellSound.play();
}

function checkLevel() {
  if (money >= 5000) level = 2;
  if (money >= 20000) level = 3;
  if (money >= 50000) level = 4;
  if (money >= 100000) level = 5;
  if (money >= 500000) level = 10;
  if (level === 50) alert("قسم جديد قيد التطوير!");
  document.getElementById('level').innerText = level;
}

const customers = [document.getElementById('customer1'), document.getElementById('customer2')];
customers.forEach(c => moveCustomer(c));

function moveCustomer(customer){
  setInterval(()=>{
    const maxX=800, maxY=500;
    const newX=Math.floor(Math.random()*maxX);
    const newY=Math.floor(Math.random()*maxY);
    customer.style.left=newX+'px';
    customer.style.top=newY+'px';
    customer.style.transform = `rotateY(${Math.random()*360}deg)`; 
  },3000);
}

document.addEventListener('keydown', function(e){
  const player = document.querySelector('.worker');
  const step = 10;
  const maxX = 800, maxY = 500;

  let left = parseInt(player.style.left || 100);
  let top = parseInt(player.style.top || 300);

  if(e.key === 'ArrowRight') left = Math.min(left+step, maxX);
  if(e.key === 'ArrowLeft') left = Math.max(left-step, 0);
  if(e.key === 'ArrowUp') top = Math.max(top-step, 0);
  if(e.key === 'ArrowDown') top = Math.min(top+step, maxY);

  player.style.left = left + 'px';
  player.style.top = top + 'px';
});

setInterval(checkInteraction, 100);
function checkInteraction(){
  const player = document.querySelector('.worker');
  const oven = document.querySelector('.oven-bakery');
  const stock = document.querySelector('.work-table');

  const playerRect = player.getBoundingClientRect();
  const ovenRect = oven.getBoundingClientRect();
  const stockRect = stock.getBoundingClientRect();

  const ovenAction = document.getElementById('ovenAction');
  const stockAction = document.getElementById('stockAction');

  ovenAction.style.display = (playerRect.left < ovenRect.right && playerRect.right > ovenRect.left &&
                              playerRect.top < ovenRect.bottom && playerRect.bottom > ovenRect.top) ? 'block' : 'none';
  stockAction.style.display = (playerRect.left < stockRect.right && playerRect.right > stockRect.left &&
                              playerRect.top < stockRect.bottom && playerRect.bottom > stockRect.top) ? 'block' : 'none';
}