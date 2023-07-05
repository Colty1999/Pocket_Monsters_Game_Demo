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

class sprite {
    constructor({ position, src, frames = { max: 1 } }) {
        this.position = position;
        this.image = new Image();
        this.image.src = src;
        this.frames = frames;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y);
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height,
        )
    }
}

const player = new sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    src: './GameAssets/Images/playerDown.png',
    frames: { max: 4 }
})


const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }
    draw() {
        c.fillStyle = "rgba(255, 0, 0, 0.2)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = [];
const offset = {
    x: -352,
    y: -470
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )

    })
})

const background = new sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    src: './GameAssets/Images/GameDemoMap.png'
})

const foreground = new sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    src: './GameAssets/Images/GameMapForeground.png'
})

background.image.onload = () => {
    player.position.x = (wdh - player.image.width / 4) / 2;
    player.position.y = (hgt - player.image.height) / 2;

    background.draw();
    player.draw();
    // c.drawImage(
    //     player.image,
    //     0,
    //     0,
    //     player.image.width / 4,
    //     player.image.height,
    //     player.position.x,
    //     player.position.y,
    //     player.image.width / 4,
    //     player.image.height,
    // )
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

const movables = [background, foreground, ...boundaries]

const rectangularCollision = ({ rectangle1, rectangle2 }) => {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}

const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    })
    player.draw();
    // c.drawImage(background.image, background.position.x, background.position.y)


    let moving = true;
    if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach((movable) => { movable.position.y += 3 })
    }
    else if (keys.ArrowDown.pressed && lastKey === "ArrowDown") {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach((movable) => { movable.position.y -= 3 })
    }
    else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach((movable) => { movable.position.x += 3 })
    }
    else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach((movable) => { movable.position.x -= 3 })
    }
    foreground.draw();

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

