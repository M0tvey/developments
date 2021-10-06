// -------------------------------- particles animation --------------------------------
(_=>{
  const wrap = document.querySelector('.particles_circle');
  if (!wrap) return;

  const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    particles = [],
    properties = {
      bgColor: '#E5E5E5',
      particleColor: 'rgba(0, 233, 233, 1)',
      particleRadius: 5,
      particleCount: 50,
      particleMaxVelocity: 0.5,
      lineLingth: 70,
      particleLife: 6,
      bigRadius: 200,
      maxLinesCount: 4
    },
    reDrawBackground = _=> {
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h);
    },
    reDrowParticles = _=> {
      for (const i in particles) {
        // particles[i].reCalculeteLife();
        particles[i].reDraw();
        particles[i].position();
      }
    },
    drowLines = _=> {
      let x1, y1, x2, y2, length, opacity, linesCount = 0;

      for (const a in particles) {
        for (let b = 0; b < particles.length; b++) {
          
        // for (const b in particles) {
          x1 = particles[a].x;
          y1 = particles[a].y;
          x2 = particles[b].x;
          y2 = particles[b].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLingth && linesCount <= properties.maxLinesCount) {
            opacity = 1 - length / properties.lineLingth;
            ctx.lineWidth = '0.4';
            ctx.strokeStyle = `rgba(0, 180, 180, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
            linesCount++;
          } else linesCount--;
        }
        // }
      }
    },
    circle = _=> {
      const y = wrap.offsetHeight / 2,
        x = wrap.offsetWidth / 2;

      ctx.beginPath();
      ctx.arc(x, y, properties.bigRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(46, 110, 45, .1)';
      ctx.fill();
    },
    loop = _=> {
      reDrawBackground();
      drowLines();
      reDrowParticles();
      circle();
      // requestAnimationFrame(loop);
    },
    init = _=> {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle);
      }

      loop();
    };

  let w = canvas.width = wrap.offsetWidth,
    h = canvas.height = wrap.offsetHeight;

  wrap.append(canvas);
  
  class Particle {
    constructor(){
      this.x = (Math.random() * properties.bigRadius) + (w / 2) - (properties.bigRadius / 2);
      this.y = (Math.random() * properties.bigRadius) + (h / 2) - (properties.bigRadius / 2);
      // this.velocityX = .95;
      this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      // this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
      this.radius = properties.particleRadius;//Math.random() * properties.particleRadius + 1;
    }

    reCalculeteLife() {
      if (this.life < 1) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }

      this.life--;
    }

    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }

    position() {
      const senterX = w / 2,
        senterY = h / 2;

      let length = (Math.sqrt(Math.pow(this.x - senterX, 2) + Math.pow(this.y - senterY, 2))) + 3;

      if (length >= properties.bigRadius) {
        this.velocityX *= -1;
        this.velocityY *= -1;
      } else {
        this.velocityX;
        this.velocityY;
      };
      
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  window.onresize = _=> {
    w = canvas.width = wrap.offsetWidth;
    h = canvas.height = wrap.offsetHeight;
  }

  init();
})();