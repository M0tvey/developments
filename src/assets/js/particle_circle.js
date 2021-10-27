// -------------------------------- particles animation --------------------------------
(_=>{
  const wrap = document.querySelector('.particles_circle')
  if (!wrap) return

  const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    particles = [],
    prop = {
      bgColor: '#fff',
      particleColor: 'rgba(0, 233, 233, 1)',
      particleRadius: 3,
      particleCount: 200,
      lineLingth: 100,
      bigRadius: 200,
      maxLinesCount: 4,
      circlesCount: 4,
      differenceAngel: 4,
      differenceCords: 10,
      radiusImages: [
        {url: '/assets/img/circle_images/image_3.svg', h: 30, w: 30},
        {url: '/assets/img/circle_images/image_4.svg', h: 30, w: 30},
        {url: '/assets/img/circle_images/image_5.svg', h: 30, w: 30},
        {url: '/assets/img/circle_images/image_6.svg', h: 30, w: 30},
        {url: '/assets/img/circle_images/image_1.svg', h: 30, w: 30},
        {url: '/assets/img/circle_images/image_2.svg', h: 30, w: 30}
      ],
      customImages: [
        {url: '/assets/img/circle_images/5g.png', h: 100, w: 100, x: 230, y: 120, custom: true},
        {url: '/assets/img/circle_images/ai.png', h: 100, w: 100, x: 420, y: 260, custom: true},
        {url: '/assets/img/circle_images/cloud.png', h: 120, w: 120, x: 170, y: 330, custom: true}
      ]
    },
    reDrawBackground = _=> {
      ctx.fillStyle = prop.bgColor
      ctx.fillRect(0, 0, w, h)
    },
    reDrowParticles = _=> {
      for (const i in particles) {
        particles[i].id = i
        particles[i].reDraw()
        particles[i].position()
      }
    },
    drowLines = _=> {
      let x1, y1, x2, y2, length, opacity, next = 0

      for (let a = 0; a < particles.length; a++) {
        let linesCount = 0,
          maxlength = (a + prop.maxLinesCount) >= particles.length ? 0 : a + prop.maxLinesCount,
          particlesB = particles.filter((dot, index) => {
            // if (index >= a && index < maxlength) console.log(index)
            return dot.image || index >= a && index <= maxlength
          })

        // for (let b = a; b < maxlength; b++) {
        // for (let b = 0; b < prop.maxLinesCount; b++) {
        // for (const b in particles) {
        for (const b in particlesB) {

          // const dotA = particles[a],
          //   dotB = particles[b]
          const dotA = particles[a],
            dotB = particlesB[b]

          x1 = dotA.x
          y1 = dotA.y
          x2 = dotB.x
          y2 = dotB.y
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

          // if (length < prop.lineLingth) {
          // if (linesCount < prop.maxLinesCount) {
          // if (!dotB.image.custom && !dotA.velocityX != 1) {
            opacity = 1 - length / prop.lineLingth
            ctx.lineWidth = '0.4'
            ctx.strokeStyle = dotB.image ? `rgba(7, 87, 179, ${opacity})` : `rgba(0, 180, 180, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.closePath()
            ctx.stroke()
            // linesCount++
          // }
        }
      }
    },
    logo = _ => {
      const image = new Image()
      image.src = '/assets/img/netx_2025_logo.png'
      ctx.drawImage(image, (w / 2 - image.width / 2), (h / 2 - image.height / 2), 212, 212);
    },
    circle = _=> {
      const y = wrap.offsetHeight / 2,
        x = wrap.offsetWidth / 2

      ctx.beginPath()
      ctx.arc(x, y, prop.bigRadius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = 'rgba(46, 110, 45, .1)'
      ctx.fill()
    },
    loop = _=> {
      reDrawBackground()
      drowLines()
      reDrowParticles()
      // circle()
      requestAnimationFrame(loop)
      logo()
    },
    init = _=> {
      let count = 0,
        angel = 0

      for (let i = 0; i < prop.radiusImages.length; i++) {
        const angel = (360 / prop.radiusImages.length) * i,
          cord = prop.bigRadius + 50

        particles.push(new Particle(angel, cord, cord, prop.radiusImages[i]))
      }

      for (let i = 0; i < prop.particleCount; i++) {

        const angelId = (720 / prop.particleCount) * i,
          cord = ((prop.bigRadius - prop.particleRadius) / prop.circlesCount) * count,
          cordWithRandomX = Math.random() * ((cord + prop.differenceCords) - (cord - prop.differenceCords) + 1) + (cord - prop.differenceCords),
          cordWithRandomY = Math.random() * ((cord + prop.differenceCords) - (cord - prop.differenceCords) + 1) + (cord - prop.differenceCords),
          x = cordWithRandomX > (prop.bigRadius - prop.particleRadius) ? prop.bigRadius - prop.particleRadius : cordWithRandomX,
          y = cordWithRandomY > (prop.bigRadius - prop.particleRadius) ? prop.bigRadius - prop.particleRadius : cordWithRandomY

        if (count >= prop.circlesCount) {
          angel = Math.random() * ((angelId + prop.differenceAngel) - (angelId - prop.differenceAngel) + 1) + (angelId - prop.differenceAngel)
          count = 0
        }
        
        particles.push(new Particle(angel, x, y))
        
        if (i > prop.particleCount / 2) particles[i].velocityX = -1

        count++
      }

      for (let i = 0; i < prop.customImages.length; i++) {
        const angel = (360 / prop.customImages.length) * i,
          image = prop.customImages[i]

        particles.push(new Particle(angel, image.x, image.y, image))
      }

      loop()
    };

  let w = canvas.width = 560,
    h = canvas.height = 490

  wrap.append(canvas)
  
  class Particle {
    constructor(angel, cordX, cordY, isImage = false) {
      this.centerDistance = 0
      this.image = isImage
      this.x = this.image.x ? this.image.x : (w / 2) + (Math.cos(angel * (Math.PI / 180)) * cordX)
      this.y = this.image.y ? this.image.y : (h / 2) + (Math.sin(angel * (Math.PI / 180)) * cordY)
      this.velocityX = 1
      this.velocityY = 0
      this.radius = prop.particleRadius
    }

    reDraw() {
      const fillColor = this.image ? '#E1F1FF' : prop.particleColor

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = fillColor
      ctx.fill()
      if (this.image) {
        ctx.lineWidth = 1
        ctx.strokeStyle = "#9FE5E5"
        ctx.stroke()

        const image = new Image()
        image.src = this.image.url
        ctx.drawImage(image, this.x - image.width / 2, this.y - image.height / 2, this.image.h, this.image.w);
      }
    }

    position() {
      const senterX = w / 2,
        senterY = h / 2

      let length = (Math.sqrt(Math.pow(this.x - senterX, 2) + Math.pow(this.y - senterY, 2))),
        difference = ((prop.particleRadius - 2) - ((length / prop.bigRadius) * (prop.particleRadius - 2)))

      this.radius = this.image && !this.image.custom ? 23.5 : Math.sign(this.velocityX) == 1 ? prop.particleRadius + difference : prop.particleRadius - difference

      if (this.image) return
      if (length >= prop.bigRadius) {
        this.velocityX *= -1
        this.velocityY *= -1
      }

      this.x += this.velocityX * (1.2 - (length / prop.bigRadius))
      this.y += this.velocityY * (1.2 - (length / prop.bigRadius))
    }
  }

  init()
})();