// 258
// -------------------------------- particles animation circle WebGl --------------------------------
(_ => {
  const wrap = document.querySelector('.particles_circle_webgl')
  if (!wrap) return

  const prop = {
    size: [w, h] = [560, 490],
    bgColor: 0xffffff,
    particleColor: 'rgba(0, 233, 233, 1)',
    particleRadius: 2,
    particleCount: 350,
    lineLingth: 100,
    bigRadius: 200,
    maxLinesCount: 2,
    radiusImages: [
      { url: '/assets/img/circle_images/image_3.svg', h: 30, w: 30 },
      { url: '/assets/img/circle_images/image_4.svg', h: 30, w: 30 },
      { url: '/assets/img/circle_images/image_5.svg', h: 30, w: 30 },
      { url: '/assets/img/circle_images/image_6.svg', h: 30, w: 30 },
      { url: '/assets/img/circle_images/image_1.svg', h: 30, w: 30 },
      { url: '/assets/img/circle_images/image_2.svg', h: 30, w: 30 }
    ],
    customImages: [
      { url: '/assets/img/circle_images/5g.png', h: 100, w: 100, x: 230, y: 120, custom: true },
      { url: '/assets/img/circle_images/ai.png', h: 100, w: 100, x: 420, y: 260, custom: true },
      { url: '/assets/img/circle_images/cloud.png', h: 120, w: 120, x: 170, y: 330, custom: true }
    ]
  }

  var renderer = new THREE.WebGLRenderer()
  renderer.setSize(w, h)
  renderer.setClearColor(prop.bgColor, 1)

  var scene = new THREE.Scene()
  wrap.addEventListener('mousemove', onMouseMove, false)
  var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000),
    mouseX,
    mouseY;
  wrap.appendChild(renderer.domElement)















  
  // window.addEventListener("resize", function() {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix()
  //   renderer.setSize( window.innerWidth, window.innerHeight )
  // })

  // ----------------------- poinys
  const renderingParent = new THREE.Group(),
    sphereGeometry = new THREE.SphereGeometry(prop.particleRadius, 20, 20),
    sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00dede }),
    sphereThree = []

  for (var i = 0; i < prop.particleCount; i++) {
    sphereThree[i] = new THREE.Mesh(sphereGeometry, sphereMaterial)

    var theta = THREE.Math.randFloatSpread(360)
    var phi = THREE.Math.randFloatSpread(360)

    sphereThree[i].position.x = prop.bigRadius * Math.sin(theta) * Math.cos(phi)
    sphereThree[i].position.y = prop.bigRadius * Math.sin(theta) * Math.sin(phi)
    sphereThree[i].position.z = prop.bigRadius * Math.cos(theta)
    sphereThree[i].lines = 0

    renderingParent.add(sphereThree[i])
  }
  // ----------------------- lines
  const Lmaterial = new THREE.LineBasicMaterial({ color: 0xadffff })
  let lines = {}
  renderingParent.children.forEach(pointA => {
    renderingParent.children.forEach(pointB => {
      if (!lines[pointB.uuid] || lines[pointB.uuid] <= prop.maxLinesCount) {
        const dx = pointA.position.x - pointB.position.x,
          dy = pointA.position.y - pointB.position.y,
          dz = pointA.position.z - pointB.position.z,
          distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance <= prop.lineLingth && distance != 0) {
          const points = [];
          points.push(new THREE.Vector3(pointA.position.x, pointA.position.y, pointA.position.z))
          points.push(new THREE.Vector3(pointB.position.x, pointB.position.y, pointB.position.z))

          const Lgeometry = new THREE.BufferGeometry().setFromPoints(points)
          renderingParent.add(new THREE.Line(Lgeometry, Lmaterial))
          lines[pointB.uuid] = lines[pointB.uuid] ? lines[pointB.uuid] + 1 : 1
        }
      }
    })
  })

  var resizeContainer = new THREE.Group()
  resizeContainer.add(renderingParent)
  scene.add(resizeContainer)

  camera.position.z = 400;

  var animate = function () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  };


  var myTween;
  function onMouseMove(event) {
    if (myTween)
      myTween.kill()

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
    myTween = gsap.to(renderingParent.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX })
    //particles.rotation.x = mouseY*-1;
    //particles.rotation.y = mouseX;
  }
  animate()

  // Scaling animation
  var animProps = { scale: 1, xRot: 0, yRot: 0 };
  // gsap.to(animProps, {duration: 10, scale: 1.3, repeat: -1, yoyo: true, ease: "sine", onUpdate: function() {
  //   renderingParent.scale.set(animProps.scale,animProps.scale,animProps.scale)
  // }})

  gsap.to(
    animProps, {
    duration: 120,
    xRot: Math.PI * 2,
    yRot: Math.PI * 4,
    repeat: -1,
    yoyo: true,
    ease: "none",
    onUpdate: function () {
      resizeContainer.rotation.set(animProps.xRot, animProps.yRot, 0)

      // renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0)
    }
  }
  )
})()