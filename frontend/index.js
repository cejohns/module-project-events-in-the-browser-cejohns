// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        if(!square.classList.contains('targeted')){
           document.querySelector('.targeted').classList.remove('targeted')
           square.classList.add('targeted')
        }
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    

    const currentSquare = document.querySelector('.targeted');
    const currentRow = currentSquare.parentElement;
    const currentIndex =  Array.from(currentRow.children).indexOf(currentSquare);
    const mosquito = currentSquare.firstChild;
    let liveMosquitoes = document.querySelectorAll('.mosquito[data-status="alive"]');
    
    
   
    

      switch (event.key) {
        case keys.up:
          if (currentRow.previousElementSibling) {
            currentSquare.classList.remove('targeted')
            currentRow.previousElementSibling.children[currentIndex].classList.add('targeted');
          }
          break;
        case keys.down:
          if (currentRow.nextElementSibling) {
            
            currentSquare.classList.remove('targeted')
             currentRow.nextElementSibling.children[currentIndex].classList.add('targeted');
          }
          break;
        case keys.left:
          if(currentSquare.previousElementSibling){
            currentSquare.classList.remove('targeted')
            currentSquare.previousElementSibling.classList.add('targeted')
         }
          break;
        case keys.right:
          if(currentSquare.previousElementSibling){
            currentSquare.classList.remove('targeted')
            currentSquare.nextElementSibling.classList.add('targeted')
         }
          break;
        case keys.space:
          if (mosquito && mosquito.dataset.status === 'alive') {
          mosquito.dataset.status = 'dead';
          currentSquare.style.backgroundColor = 'red';
        }
          break;
        default:
          return; // Do nothing if it's not an arrow key
      }

     


    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
   

    // 👉 TASK 5 - End the game 👈
if (!liveMosquitoes.length) {
          
    
  // Update info text
  const elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000);
  const infoText = document.querySelector('.info');
  infoText.textContent = `Extermination completed in ${seconds} seconds!`;

      // Display restart button
      let restartButton = document.getElementById('restartButton');
     if (!restartButton) {
    restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.id = 'restartButton'; // Assign an id for easy identification
    restartButton.addEventListener('click', () => {
      location.reload();
    });
    const existingRestartButton = document.getElementById('restartButton');
    if (existingRestartButton) {
      existingRestartButton.replaceWith(restartButton);
    } else {
      document.querySelector('h2').insertAdjacentElement('beforeend', restartButton);
    }
      
          }
         
        }      
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
