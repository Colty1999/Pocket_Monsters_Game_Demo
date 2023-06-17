window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const c = canvas.getContext('2d');

    // Resizing
    canvas.width = 1024;
    canvas.height = 576;

    const background = new Image();
    background.src = './GameAssets/game_demo_map.png';
    background.onload = () => {
        c.drawImage(background, 0, 0)
    }
});

// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = 3 * window.innerWidth / 4;
//     // 1024x576
// })