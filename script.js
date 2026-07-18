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
let sc = 0
let title = document.getElementById("title")
let gameover = false
let test
let foodposition = 0
let foods = document.querySelectorAll(".food")
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
        foodposition += speed

        background.style.backgroundPositionX = `${positionx}px`

        obsBox.style.left = `${blockpositon}px`

        createBlock()
        countupdate()
        // updateBlocks()
        // console.log(blockpositon)
        test = obs[obs.length - 1].getBoundingClientRect()
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
        let randwomheight = Math.floor((Math.random() * 51) + 18) + "%";
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
        sc++
        score.innerText = "Score: " + sc
        document.title = obs.length + "," + obs[obs.length - 1].style.height

        if (obs.length % 5 == 0) {
            // alert("hello")
            let food = document.createElement("div")
            food.classList.add("food")
            // food.style.left = `${foodposition}px`
            food.style.left = `${obs[obs.length - 1].getBoundingClientRect().left + 100}px`
            const remaingheight = 100 - obs[obs.length - 1].style.height.replace("%", "")
            const min = 5
            const max = remaingheight - 5
            food.style.top = Math.floor((Math.random() *(max - min))+ min ) + "%"
            obsBox.appendChild(food)
            foods = document.querySelectorAll(".food")
            // document.title = foods.length
        }
    }


    if (birdrect.right > blockrect.left && birdrect.left < blockrect.right && birdrect.bottom > blockrect.top && birdrect.top < blockrect.bottom) {
        collision()
    }
    if (obs.length >= 5) {
        foods.forEach((food) => {
            const foodrect = food.getBoundingClientRect()
            if (birdrect.right > foodrect.left && birdrect.left < foodrect.right && birdrect.bottom > foodrect.top && birdrect.top < foodrect.bottom) {
                const foodaudio = new Audio("assets/food.mp3")
                foodaudio.play()
                food.remove()
                speed += 0.2
                foods = document.querySelectorAll(".food")
                sc += 5
                score.innerText = "Score: " + sc
            }
        })
    }

}


    function collision() {
        if (sc > highscorevalue) {
            highscorevalue = sc
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
        yrScore.innerText = "Your Score: " + sc
        count = 0
        sc = 0
        speed = 3
        velocity = 0
        position = 100
        foodposition = 0
        blockpositon = vw
        positionx = 0
        score.innerText = "Score: 0"
        obsBox.style.left = `${blockpositon}px`
        obsBox.innerHTML = ""
        obs = document.querySelectorAll(".block")

    }


