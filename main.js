console.log(collisions);
class sprite {
    constructor({ position, src }) {
        this.position = position;
        this.image = new Image();
        this.image.src = src;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

//canvas preparation
const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
const tempCanvas = document.createElement("canvas");
const tempC = tempCanvas.getContext("2d");

const objects = [];

// Resizing
// wdh = canvas.width = window.innerWidth;
// hgt = canvas.height = 3 * window.innerWidth / 4;
let wdh = canvas.width = 1024;
let hgt = canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    constructor({ position }) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }
    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        boundaries.push(
            new Boundary({
                position: {
                    x: j * 48,
                    y: i * 48
                }
            })
        )

    })
})

const player = new sprite({
    position: {
        x: 0,
        y: 0
    },
    src: './GameAssets/Images/playerDown.png'
})

const background = new sprite({
    position: {
        x: -350,
        y: -450
    },
    src: './GameAssets/Images/GameDemoMap.png'
})

background.image.onload = () => {
    player.position.x = (wdh - player.image.width / 4) / 2;
    player.position.y = (hgt - player.image.height) / 2;

    background.draw();
    // player.draw();
    c.drawImage(
        player.image,
        0,
        0,
        player.image.width / 4,
        player.image.height,
        player.position.x,
        player.position.y,
        player.image.width / 4,
        player.image.height,
    )
    // objects.forEach(
    //     (object) => {
    //         c.drawImage(object.image, object.x, object.y);
    //     }
    // )
}

const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    // c.drawImage(background.image, background.position.x, background.position.y)
    c.drawImage(
        player.image,
        0,
        0,
        player.image.width / 4,
        player.image.height,
        player.position.x,
        player.position.y,
        player.image.width / 4,
        player.image.height,
    )

    if (keys.ArrowUp.pressed && lastKey === "ArrowUp") background.position.y += 3;
    else if (keys.ArrowDown.pressed && lastKey === "ArrowDown") background.position.y -= 3;
    else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") background.position.x += 3;
    else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") background.position.x -= 3;


}
animate();

let lastKey = "";
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            lastKey = "ArrowUp";
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            lastKey = "ArrowDown";
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey = "ArrowLeft";
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey = "ArrowRight";
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
})


// window.addEventListener('resize', () => {
//     let wdh = canvas.width = window.innerWidth;
//     let hgt = canvas.height = 3 * window.innerWidth / 4;
//     c.drawImage(background.image, background.x, background.y)
//     c.drawImage(
//         player.image,
//         0,
//         0,
//         player.image.width / 4,
//         player.image.height,
//         wdh / 2,
//         hgt / 2,
//         player.image.width / 4,
//         player.image.height,
//     )



//     // let wdh = canvas.width = window.innerWidth;
//     // let hgt = canvas.height = 3 * window.innerWidth / 4;
//     // c.drawImage(background.image, background.x, background.y)
//     // c.drawImage(
//     //     player.image,
//     //     0,
//     //     0,
//     //     player.image.width / 4,
//     //     player.image.height,
//     //     player.x,
//     //     player.y,
//     //     player.image.width / 4,
//     //     player.image.height,
//     // )

//     // let tcw = tempCanvas.width = canvas.width;
//     // let tch = tempCanvas.height = canvas.height;
//     // tempC.drawImage(canvas, 0, 0);
//     // let cw = canvas.width = window.innerWidth;
//     // let ch = canvas.height = 3 * window.innerWidth / 4;
//     // c.drawImage(tempCanvas, 0, 0, tcw * (cw / tcw), tch * (ch / tch));
//     // console.log(`tcw: ${tcw}, tch: ${tch}, cw: ${cw}, ch: ${ch}`)
//     // console.log(`tcw: ${cw / tcw}, tch: ${ch / tch}`)
//     // 1024x576
// })

