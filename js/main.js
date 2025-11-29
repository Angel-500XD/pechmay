document.addEventListener('DOMContentLoaded', function(){
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav-list');
    const showHintBtn = document.getElementById('showHint');

    const currentTheme = localStorage.getItem('animelab-theme');
    if (currentTheme === 'light') body.classList.add('light');

    // --- Modo claro / oscuro ---
    themeBtn.addEventListener('click', function(){
        body.classList.toggle('light');
        const isLight = body.classList.contains('light');
        localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
        themeBtn.textContent = isLight ? '☀️' : '🌙';
    });

    // --- MENÚ RESPONSIVO ---
    navToggle.addEventListener('click', function(){
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('show');
        navToggle.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link=>{
        link.addEventListener('click', ()=>{
            navList.classList.remove('show');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // --- Lightbox para galería ---
    window.openLightbox = function(src){
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightboxImg');
        img.src = src;
        lightbox.style.display = 'flex';
        img.style.transform = "scale(0.95)";
        setTimeout(()=> img.style.transform = "scale(1)", 50);
    };
    window.closeLightbox = function(e){
        if (e.target.id === 'lightbox' || e.target.id === 'lightboxImg') {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'none';
            document.getElementById('lightboxImg').src = '';
        }
    };

    // --- Modal de personajes ---
    window.showProfile = function(name){
        const data = {
            "Master Chief": {
                img: "assets/Master-Chief.png",
                desc: "Spartan-II conocido como John-117. Héroe de la humanidad.",
                extra: "Serie: Halo • Habilidades: liderazgo, combate avanzado, uso de MJOLNIR Mark VI."
            },
            "Cortana": {
                img: "assets/cortana.png",
                desc: "IA inteligente creada por la Dra. Halsey.",
                extra: "Función: análisis táctico, navegación, acceso a tecnología Forerunner."
            },
            "Johnson": {
                img: "assets/johnson.png",
                desc: "Sargento Avery Junior Johnson. Veterano y líder nato.",
                extra: "Resistencia excepcional y carisma en combate."
            },
            "Noble Six": {
                img: "assets/Noble_Six.png",
                desc: "Spartan-III del Equipo Noble. Defensor clave de Reach.",
                extra: "Especialidad: operaciones encubiertas y combate cercano."
            }
        };

        const char = data[name];
        if(!char) return;

        document.getElementById("charImg").src = char.img;
        document.getElementById("charName").textContent = name;
        document.getElementById("charDesc").textContent = char.desc;
        document.getElementById("charExtra").textContent = char.extra;

        const modal = document.getElementById("characterModal");
        modal.style.display = "flex";
        modal.querySelector('.char-modal-content').style.transform = "scale(0.95)";
        setTimeout(()=> modal.querySelector('.char-modal-content').style.transform = "scale(1)", 50);
    };
    window.closeCharModal = function(){
        document.getElementById("characterModal").style.display = "none";
    };

    // --- Modal de video ---
    window.openVideoModal = function(id){
        const modal = document.getElementById("videoModal");
        const frame = document.getElementById("videoFrame");
        frame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
        modal.style.display = "flex";
        modal.querySelector('iframe').style.transform = "scale(0.95)";
        setTimeout(()=> modal.querySelector('iframe').style.transform = "scale(1)", 50);
    };
    window.closeVideoModal = function(e){
        if(e.target.id === "videoModal"){
            document.getElementById("videoFrame").src = "";
            document.getElementById("videoModal").style.display = "none";
        }
    };

    // --- Validación de formulario ---
   const form = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

form.addEventListener('submit', function(ev){
    ev.preventDefault(); // Evita el envío real
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Función para marcar inputs
    const mark = (input, condition) => {
        input.classList.remove('input-error', 'input-success');
        if(condition){
            input.classList.add('input-success');
        } else {
            input.classList.add('input-error');
            valid = false;
        }
    };

    // Validaciones
    mark(name, name.value.trim() !== "");
    mark(email, /\S+@\S+\.\S+/.test(email.value)); // formato simple de email
    mark(message, message.value.trim().length >= 5);

    // Mostrar mensaje
    if(valid){
        formResult.textContent = `¡Gracias ${name.value}! Tu mensaje ha sido enviado.`;
        formResult.className = "success";
        form.reset();
        [name, email, message].forEach(el => el.classList.remove('input-success'));
    } else {
        formResult.textContent = "Por favor, corrige los campos marcados en rojo.";
        formResult.className = "error";
    }
});


    
    showHintBtn.addEventListener('click', function(){
        const hint = document.createElement('div');
        hint.className = 'hint';
        hint.textContent = 'Pista: Revisa css/style.css para variables y layout. Y js/main.js para eventos.';
        document.querySelector('.hero').appendChild(hint);
        hint.style.opacity = 0;
        setTimeout(()=> hint.style.opacity = 1, 50);
        setTimeout(()=> hint.remove(), 6000);
    });

    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    const volumeSlider = document.getElementById("musicVolume");
    if(musicBtn){
        musicBtn.addEventListener("click", ()=>{
            if(music.paused){
                music.play();
                musicBtn.textContent = "⏸ Pausar";
            }else{
                music.pause();
                musicBtn.textContent = "🎵 Música";
            }
        });
    }
    const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

if(music){
  // Cuando la música carga metadata, mostrar duración
  music.addEventListener("loadedmetadata", ()=>{
    durationEl.textContent = formatTime(music.duration);
    progress.max = Math.floor(music.duration);
  });

  // Actualizar progreso mientras suena
  music.addEventListener("timeupdate", ()=>{
    progress.value = Math.floor(music.currentTime);
    currentTimeEl.textContent = formatTime(music.currentTime);
  });

  // Cambiar posición de reproducción al mover la barra
  progress.addEventListener("input", ()=>{
    music.currentTime = progress.value;
  });
}

// Función para formatear tiempo en mm:ss
function formatTime(sec){
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

    if(volumeSlider && music){
        music.volume = volumeSlider.value;
        volumeSlider.addEventListener("input", ()=> { music.volume = volumeSlider.value; });
    }

    // --- Pie de página dinámico ---
    const year = document.getElementById("year");
    if(year) year.textContent = "© " + new Date().getFullYear();

    // --- ANIMACIÓN DE SECCIONES AL SCROLL ---
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('fadeUp');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hero, .card, .thumb, .video-card, .credits')
        .forEach(el=> observer.observe(el));
});
