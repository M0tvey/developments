// -------------------------------- particles animation --------------------------------
(_=>{
  const wrap = document.querySelector('.particles');
  if (!wrap) return;

  const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    particles = [],
    properties = {
      bgColor: 'rgba(17, 17, 19, 1)',
      particleColor: 'rgba(46, 110, 45, 1)',
      particleRadius: 5,
      particleCount: 100,
      particleMaxVelocity: 0.5,
      lineLingth: 100,
      particleLife: 6
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
      let x1, y1, x2, y2, length, opacity;

      for (const a in particles) {
        for (const b in particles) {
          x1 = particles[a].x;
          y1 = particles[a].y;
          x2 = particles[b].x;
          y2 = particles[b].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLingth) {
            opacity = 1 - length / properties.lineLingth;
            ctx.lineWidth = '0,5';
            ctx.strokeStyle = `rgba(46, 110, 45, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }
    loop = _=> {
      reDrawBackground();
      drowLines();
      reDrowParticles();
      requestAnimationFrame(loop);
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
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
      this.radius = Math.random() * properties.particleRadius;
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
      this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
      this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
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