// AR/VR-style animated 3D background using Three.js
window.addEventListener('DOMContentLoaded', function() {
  // Create and insert canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0'; 
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '0';
  canvas.style.display = 'block'; 
  document.body.prepend(canvas);

  // Setup Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 8;

  // Add floating spheres
  const spheres = [];
  for (let i = 0; i < 18; i++) {
    const geometry = new THREE.SphereGeometry(Math.random()*0.5+0.3, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: [0x00c3ff, 0xffff1c, 0xffffff, 0x8e54e9][i%4],
      transparent: true,
      opacity: 0.7,
      roughness: 0.3,
      metalness: 0.7
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      (Math.random()-0.5)*12,
      (Math.random()-0.5)*8,
      (Math.random()-0.5)*8
    );
    scene.add(sphere);
    spheres.push(sphere);
  }
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x00c3ff, 1.2, 100);
  pointLight.position.set(0, 6, 8);
  scene.add(pointLight);

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    spheres.forEach((s, i) => {
      s.rotation.x += 0.002 + i*0.0002;
      s.rotation.y += 0.003 + i*0.0003;
      s.position.y += Math.sin(Date.now()/900 + i)*0.002;
    });
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
