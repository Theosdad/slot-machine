const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const reel4 = document.getElementById('reel4');
const reel5 = document.getElementById('reel5');
const reel6 = document.getElementById('reel6');
const reel7 = document.getElementById('reel7');
const reel8 = document.getElementById('reel8');
const reel9 = document.getElementById('reel9');
const spinButton = document.getElementById('spin');
const autoButton = document.getElementById('auto');
const scoreDisplay = document.getElementById('score');
const winSlogan = document.getElementById('win');
const winScore = document.getElementById('win-score');
const betDisplay = document.getElementById('bet');
const increaseBet = document.getElementById('bet-increase');
const decreaseBet = document.getElementById('bet-decrease');
const starsAmount = document.getElementById('stars-amount');

let score = 1000000;
let bet = 100;
betDisplay.textContent = bet;
let spinning = false;
let autoSpinning = false;


const reelElements = [];

const populateReelElements = () => {
    const reels = document.querySelectorAll('.reel');

    reels.forEach(reel => {
        const symbols = reel.querySelectorAll('.symbol');
        const reelImages = [];

        symbols.forEach(symbol => {
            const image = symbol.getAttribute('data-image');
            const image2x = symbol.getAttribute('data-image2x');
            const width = symbol.getAttribute('data-width');
            const height = symbol.getAttribute('data-height');
            reelImages.push({ image, image2x, width, height });
        });

        reelElements.push(reelImages);
    });
}

const getRandomElement = (reel) => {
    const reelIndex = Array.from(reel.parentElement.children).indexOf(reel);
    const reelImages = reelElements[reelIndex];
    const randomIndex = Math.floor(Math.random() * reelImages.length);
    const image = reelImages[randomIndex].image;
    const image2x = reelImages[randomIndex].image2x;
    const width = reelImages[randomIndex].width;
    const height = reelImages[randomIndex].height;


    return `<img src="${image}" srcset="${image2x} 2x" alt="Symbol ${randomIndex + 1}" width="${width}" height="${height}">`;
}

const spin = () => {
  if (spinning || score < bet) return;

  spinning = true;
  score -= bet;
  scoreDisplay.textContent = `${score}`;
  const maxStars = 9000;
  const spins = 5;
  const additionalStars = Math.min(100, maxStars - parseFloat(starsAmount.textContent));
  starsAmount.textContent = parseFloat(starsAmount.textContent) + additionalStars;

  for (let i = 0; i < spins; i++) {
    setTimeout(() => {
      reel1.innerHTML = '';
      reel2.innerHTML = '';
      reel3.innerHTML = '';
      reel4.innerHTML = '';
      reel5.innerHTML = '';
      reel6.innerHTML = '';
      reel7.innerHTML = '';
      reel8.innerHTML = '';
      reel9.innerHTML = '';
      reel1.innerHTML = getRandomElement(reel1);
      reel2.innerHTML = getRandomElement(reel2);
      reel3.innerHTML = getRandomElement(reel3);
      reel4.innerHTML = getRandomElement(reel4);
      reel5.innerHTML = getRandomElement(reel5);
      reel6.innerHTML = getRandomElement(reel6);
      reel7.innerHTML = getRandomElement(reel7);
      reel8.innerHTML = getRandomElement(reel8);
      reel9.innerHTML = getRandomElement(reel9);

      if (i === spins - 1) {
        checkWin();
        spinning = false;
      }
    }, i * 200);
  }
}

const checkForSymbol = (reelElement) => {
  const imageElement = reelElement.querySelector('img');
  if (imageElement) {
    return imageElement.getAttribute('src');
  }
  return null;
}

const checkWin = () => {
  const image1 = reel4.querySelector('img').getAttribute('src');
  const image2 = reel5.querySelector('img').getAttribute('src');
  const image3 = reel6.querySelector('img').getAttribute('src');

  if (image1 === image2 && image2 === image3) {
    const winAmount = bet * 5;
    score += winAmount;
    scoreDisplay.textContent = `${score}`;
    showWinMessage(winAmount);
  } else {
    showWinMessage(0)
  }
}

const showWinMessage = (amount) => {
    const message = amount > 0 ? `${amount}` : '';
    document.querySelector('.win').style.display = amount > 0 ? 'block' : 'none';
    document.getElementById('win').textContent = amount > 0 ? 'WIN' : '';
    document.getElementById('win-score').textContent = message;
}

spinButton.addEventListener('click', () => {
  if (!spinning && score >= bet) {
    spin();
  }
});

const autoSpin = () => {
  if (score >= bet && autoSpinning) {
    spin();
    setTimeout(autoSpin, 2000);
  } else {
    autoSpinning = false;
  }
}

autoButton.addEventListener('click', () => {
  if (!spinning) {
    autoSpinning = !autoSpinning;
    if (autoSpinning) {
      autoSpin();
    }
  } else {
    autoSpinning = false;
  }
});

increaseBet.addEventListener('click', () => {
  if (!spinning && bet < score) {
    const newBet = bet + 100;
    if (newBet <= score) {
      bet = newBet;
      betDisplay.textContent = bet;
    }
  }
});

decreaseBet.addEventListener('click', () => {
  if (!spinning && bet > 100) {
    const newBet = bet - 100;
    if (newBet >= 100) {
      bet = newBet;
      betDisplay.textContent = bet;
    }
  }
});

populateReelElements();
