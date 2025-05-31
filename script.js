// === 1. TYPING EFFECT ===
document.addEventListener('DOMContentLoaded', function() {
    const phrases = ["SOFTWARE ENGINEER   ", "AI ENTHUSIAST   "];
    const typewriterElement = document.querySelector('.typewriter');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let typingSpeed = 100;
  
    function typeWriter() {
      if (isPaused) {
        setTimeout(typeWriter, typingSpeed);
        return;
      }
  
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex--);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          isPaused = true;
          setTimeout(() => { isPaused = false; }, 1000);
        }
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex++);
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          isPaused = true;
          setTimeout(() => { isPaused = false; }, 2000);
        }
      }
  
      typingSpeed = isDeleting ? 50 : (Math.random() * 50 + 50);
      setTimeout(typeWriter, typingSpeed);
    }
  
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
  
    // === 2. 3D CARD TILT ===
    const projectCards = document.querySelectorAll('.project-card');
  
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
  
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 30px rgba(0, 210, 255, 0.4)`;
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        card.style.boxShadow = '0 0 30px var(--accent)';
      });
    });
  
    // === 3. PARTICLE.js BACKGROUND ===
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#00d2ff" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: "#00d2ff", opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
          }
        }
      });
    }
  
    // === 4. SCROLL ANIMATIONS (AOS) ===
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out-quad',
        once: true
      });
    }
  
    // === 5. EASTER EGG: JARVIS MODE (Press J + A + R) ===
    const jarvisAudio = document.getElementById('jarvis-audio');
    let keySequence = [];
    const secretCode = ['j', 'a', 'r'];
  
    document.addEventListener('keydown', (e) => {
      keySequence.push(e.key.toLowerCase());
      if (keySequence.length > secretCode.length) {
        keySequence.shift();
      }
      
      if (keySequence.join('') === secretCode.join('')) {
        document.body.classList.toggle('jarvis-mode');
        
        // Play sound if available
        if (jarvisAudio) {
          jarvisAudio.currentTime = 0;
          jarvisAudio.play().catch(e => console.log("Audio play failed:", e));
        }
        
        // Show notification
        showNotification("J.A.R.V.I.S. MODE ACTIVATED");
        
        // Reset sequence
        keySequence = [];
      }
    });
  
    function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'jarvis-notification';
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
      }, 2500);
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });