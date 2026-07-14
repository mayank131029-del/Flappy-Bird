let bird = document.getElementById("bird-box")
let vh = window.innerHeight - 50
let vw = window.innerWidth
let background = document.getElementById("background")
let obs = document.querySelectorAll(".block")
let obsBox = document.querySelector("#blocks")
let position = 80;
let velocity = 0;
let paused = true
let positionx = 0
let blockpositon = vw
let speed = 3
let score = document.getElementById("score")
let highscore = document.getElementById("highscore")
let highscorevalue = localStorage.getItem("highscore") || 0
highscore.innerText = "High Score: " + highscorevalue
let menu = document.getElementById("menu-box")
let yrScore = document.getElementById("yr-score")
let title = document.getElementById("title")
let gameover = false

let music = new Audio()
music.src = "assets/music.mp3"
music.loop = true
music.volume = 0.5


let count = 0

function gravity() {

    if (!paused) {



        if (position >= vh) {
            collision()
        }
        if (position < 60) {
            collision()

        }
        velocity += 0.5;
        position += velocity;

        bird.style.top = position + "px";

        requestAnimationFrame(gravity);
    }
}

gravity();

window.addEventListener("keydown", (e) => {

    if (e.key === " ") {
        if (!paused) {
            paused = true
            menu.style.display = "flex"
            music.pause()
        }
        else {
            paused = false
            gravity()
            bganimate()
            gameover = false
            music.play()
            menu.style.display = "none"
        }
    }
});

window.addEventListener("keydown", (e) => {

    if (gameover) {
        return;
    }
    if (e.key === "ArrowUp") {
        velocity = -8;
    }

})

function bganimate() {
    if (!paused) {

        blockpositon -= speed
        positionx -= speed

        background.style.backgroundPositionX = `${positionx}px`

        obsBox.style.left = `${blockpositon}px`

        createBlock()
        countupdate()
        // updateBlocks()
        // console.log(blockpositon)
        requestAnimationFrame(bganimate)


    }
}
bganimate()



function createBlock() {

    if (obs.length === 0) {
        let block = document.createElement("div")
        block.classList.add("block")
        block.innerHTML = `<div class="pipe top"></div>`
        obsBox.appendChild(block)
        obs = document.querySelectorAll(".block")
        let randwomheight = Math.floor((Math.random() * 51) + 17) + "%";
        block.style.height = randwomheight
        return;
    }

    const lastrectp = obs[obs.length - 1].getBoundingClientRect().left
    if (lastrectp < vw) {
        let block = document.createElement("div")
        block.classList.add("block")
        block.innerHTML = `<div class="pipe top"></div>`
        obsBox.appendChild(block)
        obs = document.querySelectorAll(".block")
        let randwomheight = Math.floor((Math.random() * 51) + 25) + "%";
        block.style.height = randwomheight
        // console.log(randwomheight)


    }


    // document.title=obs.length +","+firstrectp
}

function countupdate() {
    const blockrect = obs[count].getBoundingClientRect()
    const birdrect = bird.getBoundingClientRect()
    if (obs[count].getBoundingClientRect().left <= 360) {
        count++
        score.innerText = "Score: " + count
        // document.title = obs[count].getBoundingClientRect().left + "," + count
        // if (count % 5 == 0) {
        //     // alert("hello")
        //     let food = document.createElement("div")
        //     food.classList.add("food")
        //     food.style.left = window.innerWidth + "px";
        //     obsBox.appendChild(food)
        // }

    }

    
    if (birdrect.right > blockrect.left && birdrect.left < blockrect.right && birdrect.bottom > blockrect.top && birdrect.top < blockrect.bottom) {
        collision()
    }
    
}

function collision() {
    if (count > highscorevalue) {
        highscorevalue = count
        highscore.innerText = "High Score: " + highscorevalue
        localStorage.setItem("highscore", highscorevalue)

    }
    music.pause()
    music.currentTime = 0
    const gameovermusic = new Audio("assets/gameover.mp3")
    gameovermusic.play()
    console.log(count)
    paused = true
    gameover = true
    menu.style.display = "flex"
    title.innerText = "Game Over"
    yrScore.innerText = "Your Score: " + count
    count = 0
    velocity = 0
    position = 100
    blockpositon = vw
    positionx = 0
    score.innerText = "Score: 0"
    obsBox.style.left = `${blockpositon}px`
    obsBox.innerHTML = ""
    obs = document.querySelectorAll(".block")



}

