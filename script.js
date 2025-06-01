const colors = {
    1: 'c1',
    2: 'c2',
    3: 'c3',
    4: 'c4',
    5: 'c5',
    6: 'c6'
  };

const batmanData = [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, /* ... */ ]; // Truncado por longitud
const container = document.querySelector('.batman');
  
batmanData.forEach(value => {
    const pixel = document.createElement('div');
    if (value !== 0) pixel.className = `pixel ${colors[value]}`;
    else pixel.className = 'pixel';
    container.appendChild(pixel);
});