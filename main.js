const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
const objects = [];

// Resizing
wdh = canvas.width = window.innerWidth;
hgt = canvas.height = 3 * window.innerWidth / 4;


const background = {};
background.image = new Image();
background.image.src = './GameAssets/Images/GameDemoMap.png';
background.x = -330;
background.y = -400;

const player = {};
player.image = new Image();
player.image.src = './GameAssets/Images/playerDown.png';
player.x = (wdh - player.image.width) / 2;
player.y = (hgt - player.image.height) / 2;

objects.push(background, player);

background.image.onload = () => {
    // c.drawImage(background, -330, -400)
    // c.drawImage(playerImage, (wdh - playerImage.width) / 2, (hgt - playerImage.height) / 2)
    objects.forEach(
        (object) => {
            c.drawImage(object.image, object.x, object.y);
            console.log(object)
        }
    )
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = 3 * window.innerWidth / 4;
    objects.forEach((object) => {
        c.drawImage(object.image, object.x, object.y);
        console.log(object)
    }
    )
    // 1024x576
})