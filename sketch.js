let movingWords = []
let colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"]

function setup() {
    createCanvas(windowWidth, windowHeight)
    createP("The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. At that, they probably didn't have too much time after they detected us orbiting and intending to land. And if that were true, there could be only one place where their civilization was hidden.").addClass('text').hide()
    const texts = selectAll('.text')
    let spc = 100
    for (let i = 0; i < texts.length; i++) {
        const paragraph = texts[i].html()
        const words = paragraph.split(' ')
        for (let j = 0; j < words.length; j++) {
            const spannedWord = createSpan(words[j])
            const mw = new MovingWord(spannedWord, random(spc, width - spc), random(spc, height - spc))
            movingWords.push(mw)
        }
    }
}

function draw() {
    background(255, 1)
    for (let i = 0; i < movingWords.length; i++) {
        movingWords[i].moving();
    }

}


class MovingWord {
    constructor(element, x, y) {
        element.position(x, y)
        this.element = element
        this.x = x
        this.y = y
        this.a = random(-TAU, TAU)
        this.scl = 0.004
        this.l = int(random(2, 10))
        this.c = colors[int(random(colors.length))]
        this.ss = int(random(10, 30))

    }

    moving() {
        // let ax = noise(this.x * this.scl) * 100
        // let ay = noise(this.y * this.scl) * 100
        noStroke()
        fill(this.c)
        circle(this.x, this.y, this.ss)
        this.x += cos(this.a) * this.l
        this.y += sin(this.a) * this.l
        this.element.position(this.x, this.y)
        this.element.style('font-size', '' + this.ss + 'px')
        this.a += 0.09
        if (random(1) < 0.1) {
            this.l = int(random(1, 10))
        }
        this.ss += map(noise(this.x * this.scl, this.y * this.scl), 0, 1, -10, 10)
        if (this.ss < 0) {
            this.ss = 0
        }
        if (this.ss > 100) {
            this.ss = 100
        }

    }
}