// Impossible 3D Dotted Animation Engine
class Impossible3DAnimation {
  constructor() {
    this.container = document.getElementById('dots3dContainer');
    this.triangle = document.getElementById('impossibleTriangle');
    this.cube = document.getElementById('impossibleCube');
    this.spiral = document.getElementById('spiralFormation');
    this.floatingDots = document.getElementById('floatingDots');
    
    this.animationSpeed = 1;
    this.colorTheme = 0;
    this.isAnimating = true;
    
    this.colorThemes = [
      { primary: 'rgba(255, 136, 0, 0.8)', secondary: 'rgba(100, 200, 255, 0.8)', tertiary: 'rgba(255, 100, 200, 0.8)' },
      { primary: 'rgba(0, 255, 136, 0.8)', secondary: 'rgba(255, 100, 136, 0.8)', tertiary: 'rgba(136, 100, 255, 0.8)' },
      { primary: 'rgba(255, 255, 100, 0.8)', secondary: 'rgba(100, 255, 255, 0.8)', tertiary: 'rgba(255, 100, 255, 0.8)' }
    ];
    
    this.init();
  }
  
  init() {
    this.createImpossibleTriangle();
    this.createImpossibleCube();
    this.createSpiral();
    this.createFloatingParticles();
    this.setupControls();
    this.setupMouseInteraction();
  }
  
  createImpossibleTriangle() {
    const dots = [];
    const numDots = 60;
    const radius = 150;
    
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'triangle-dot dot-3d';
      
      // Create impossible triangle geometry
      const angle = (i / numDots) * Math.PI * 2;
      const r = radius * (1 + 0.3 * Math.sin(angle * 3));
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const z = Math.sin(angle * 2) * 50;
      
      dot.style.width = '4px';
      dot.style.height = '4px';
      dot.style.left = `${150 + x}px`;
      dot.style.top = `${150 + y}px`;
      dot.style.transform = `translateZ(${z}px)`;
      dot.style.animationDelay = `${i * 0.1}s`;
      
      this.triangle.appendChild(dot);
      dots.push(dot);
    }
    
    this.triangleDots = dots;
  }
  
  createImpossibleCube() {
    const dots = [];
    const size = 100;
    const dotsPerEdge = 8;
    
    // Create cube edges with dots
    const edges = [
      // Front face
      [[0, 0, 0], [size, 0, 0]], [[size, 0, 0], [size, size, 0]], 
      [[size, size, 0], [0, size, 0]], [[0, size, 0], [0, 0, 0]],
      // Back face
      [[0, 0, size], [size, 0, size]], [[size, 0, size], [size, size, size]], 
      [[size, size, size], [0, size, size]], [[0, size, size], [0, 0, size]],
      // Connecting edges (impossible connections)
      [[0, 0, 0], [size, 0, size]], [[size, 0, 0], [0, 0, size]],
      [[size, size, 0], [0, size, size]], [[0, size, 0], [size, size, size]]
    ];
    
    edges.forEach((edge, edgeIndex) => {
      for (let i = 0; i < dotsPerEdge; i++) {
        const dot = document.createElement('div');
        dot.className = 'cube-dot dot-3d';
        
        const t = i / (dotsPerEdge - 1);
        const x = edge[0][0] + (edge[1][0] - edge[0][0]) * t - size/2;
        const y = edge[0][1] + (edge[1][1] - edge[0][1]) * t - size/2;
        const z = edge[0][2] + (edge[1][2] - edge[0][2]) * t - size/2;
        
        dot.style.width = '3px';
        dot.style.height = '3px';
        dot.style.left = `${100 + x}px`;
        dot.style.top = `${100 + y}px`;
        dot.style.transform = `translateZ(${z}px)`;
        dot.style.animationDelay = `${edgeIndex * 0.2 + i * 0.05}s`;
        
        this.cube.appendChild(dot);
        dots.push(dot);
      }
    });
    
    this.cubeDots = dots;
  }
  
  createSpiral() {
    const dots = [];
    const numDots = 80;
    const maxRadius = 180;
    const height = 300;
    
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'spiral-dot dot-3d';
      
      const t = i / numDots;
      const angle = t * Math.PI * 6; // 3 full rotations
      const radius = maxRadius * t;
      const x = Math.cos(angle) * radius;
      const y = (t - 0.5) * height;
      const z = Math.sin(angle) * radius;
      
      dot.style.width = `${3 + t * 3}px`;
      dot.style.height = `${3 + t * 3}px`;
      dot.style.left = `${200 + x}px`;
      dot.style.top = `${200 + y}px`;
      dot.style.transform = `translateZ(${z}px)`;
      dot.style.animationDelay = `${i * 0.08}s`;
      
      this.spiral.appendChild(dot);
      dots.push(dot);
    }
    
    this.spiralDots = dots;
  }
  
  createFloatingParticles() {
    const particles = [];
    const numParticles = 30;
    
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-dot';
      
      const x = Math.random() * window.innerWidth;
      const animationDuration = 8 + Math.random() * 12;
      const animationDelay = Math.random() * 10;
      const size = 2 + Math.random() * 4;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.animationDelay = `${animationDelay}s`;
      
      this.floatingDots.appendChild(particle);
      particles.push(particle);
    }
    
    this.floatingParticles = particles;
  }
  
  setupControls() {
    // All features are now visible by default - no click toggles needed
    // Ensure all elements are displayed
    this.triangle.style.display = 'block';
    this.cube.style.display = 'block';
    this.spiral.style.display = 'block';
    this.floatingDots.style.display = 'block';
    
    // Optional: Speed and color controls still work if user interacts
    const speedBtn = document.getElementById('speedControl');
    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        this.cycleSpeed();
      });
    }
    
    const colorBtn = document.getElementById('colorShift');
    if (colorBtn) {
      colorBtn.addEventListener('click', () => {
        this.cycleColorTheme();
      });
    }
  }
  
  toggleVisibility(element, button) {
    const isVisible = element.style.display !== 'none';
    element.style.display = isVisible ? 'none' : 'block';
    button.classList.toggle('active');
  }
  
  cycleSpeed() {
    const speeds = [0.5, 1, 2, 3];
    const currentIndex = speeds.indexOf(this.animationSpeed);
    this.animationSpeed = speeds[(currentIndex + 1) % speeds.length];
    
    // Update animation speeds
    const animations = [
      { element: this.container, property: 'animation-duration', value: `${30 / this.animationSpeed}s` },
      { element: this.triangle, property: 'animation-duration', value: `${15 / this.animationSpeed}s` },
      { element: this.cube, property: 'animation-duration', value: `${20 / this.animationSpeed}s` },
      { element: this.spiral, property: 'animation-duration', value: `${25 / this.animationSpeed}s` }
    ];
    
    animations.forEach(anim => {
      if (anim.element) {
        anim.element.style[anim.property] = anim.value;
      }
    });
  }
  
  cycleColorTheme() {
    this.colorTheme = (this.colorTheme + 1) % this.colorThemes.length;
    const theme = this.colorThemes[this.colorTheme];
    
    // Update triangle colors
    this.triangleDots.forEach(dot => {
      dot.style.background = `radial-gradient(circle, ${theme.primary} 0%, rgba(255, 255, 255, 0.3) 100%)`;
      dot.style.boxShadow = `0 0 15px ${theme.primary}`;
    });
    
    // Update cube colors
    this.cubeDots.forEach(dot => {
      dot.style.background = `radial-gradient(circle, ${theme.secondary} 0%, rgba(255, 255, 255, 0.3) 100%)`;
      dot.style.boxShadow = `0 0 12px ${theme.secondary}`;
    });
    
    // Update spiral colors
    this.spiralDots.forEach(dot => {
      dot.style.background = `radial-gradient(circle, ${theme.tertiary} 0%, rgba(255, 255, 255, 0.3) 100%)`;
      dot.style.boxShadow = `0 0 10px ${theme.tertiary}`;
    });
  }
  
  setupMouseInteraction() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      if (this.container) {
        this.container.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
      }
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      if (this.container) {
        this.container.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    });
  }
  
  // Performance optimization
  pause() {
    this.isAnimating = false;
    if (this.container) {
      this.container.style.animationPlayState = 'paused';
    }
  }
  
  play() {
    this.isAnimating = true;
    if (this.container) {
      this.container.style.animationPlayState = 'running';
    }
  }
  
  destroy() {
    // Clean up all elements
    this.triangle.innerHTML = '';
    this.cube.innerHTML = '';
    this.spiral.innerHTML = '';
    this.floatingDots.innerHTML = '';
  }
}

// Initialize animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.impossible3D = new Impossible3DAnimation();
  
  // Pause animation when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.impossible3D.pause();
    } else {
      window.impossible3D.play();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Recreate floating particles on resize for better distribution
    const floatingDots = document.getElementById('floatingDots');
    if (floatingDots && window.impossible3D) {
      floatingDots.innerHTML = '';
      window.impossible3D.createFloatingParticles();
    }
  });
});
