const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0,
  mouseY = 0;
let outlineX = 0,
  outlineY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  cursorOutline.style.left = outlineX - 20 + "px";
  cursorOutline.style.top = outlineY - 20 + "px";
  requestAnimationFrame(animateOutline);
}
animateOutline();

// WebGL Background
const canvas = document.getElementById("webgl-container");
const gl =
  canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

if (gl) {
  const vertexShaderSource = `
                attribute vec2 position;
                void main() {
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `;

  const fragmentShaderSource = `
                precision mediump float;
                uniform float time;
                uniform vec2 resolution;
                uniform vec2 mouse;

                float noise(vec2 p) {
                    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                }

                float smoothNoise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    
                    float a = noise(i);
                    float b = noise(i + vec2(1.0, 0.0));
                    float c = noise(i + vec2(0.0, 1.0));
                    float d = noise(i + vec2(1.0, 1.0));
                    
                    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                }

                float fbm(vec2 p) {
                    float value = 0.0;
                    float amplitude = 0.5;
                    float frequency = 1.0;
                    
                    for(int i = 0; i < 6; i++) {
                        value += amplitude * smoothNoise(p * frequency);
                        frequency *= 2.0;
                        amplitude *= 0.5;
                    }
                    return value;
                }

                void main() {
                    vec2 uv = gl_FragCoord.xy / resolution.xy;
                    vec2 m = mouse / resolution.xy;
                    
                    float aspect = resolution.x / resolution.y;
                    uv.x *= aspect;
                    m.x *= aspect;
                    
                    vec2 p = uv * 3.0 - vec2(1.5 * aspect, 1.5);
                    p += vec2(time * 0.05, time * 0.03);
                    
                    float dist = length(uv - m);
                    p += (m - uv) * (1.0 - smoothstep(0.0, 0.3, dist)) * 0.2;
                    
                    float n = fbm(p);
                    float n2 = fbm(p + vec2(time * 0.02, -time * 0.03) + n * 0.5);
                    
                    float pattern = n * 0.5 + n2 * 0.5;
                    pattern = smoothstep(0.3, 0.7, pattern);
                    
                    vec3 color1 = vec3(0.05, 0.0, 0.15);
                    vec3 color2 = vec3(0.0, 0.05, 0.1);
                    vec3 color3 = vec3(0.1, 0.0, 0.05);
                    
                    vec3 finalColor = mix(color1, color2, pattern);
                    finalColor = mix(finalColor, color3, n2 * 0.3);
                    
                    float vignette = 1.0 - length(uv - 0.5) * 0.8;
                    finalColor *= vignette;
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const timeLocation = gl.getUniformLocation(program, "time");
  const resolutionLocation = gl.getUniformLocation(program, "resolution");
  const mouseLocation = gl.getUniformLocation(program, "mouse");

  let mouseXGL = 0,
    mouseYGL = 0;
  document.addEventListener("mousemove", (e) => {
    mouseXGL = e.clientX;
    mouseYGL = window.innerHeight - e.clientY;
  });

  function render(time) {
    gl.uniform1f(timeLocation, time * 0.001);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(mouseLocation, mouseXGL, mouseYGL);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  render(0);
}

// Text scramble effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }

    this.el.innerText = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Initialize scramble on title words
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  const titleSpans = document.querySelectorAll(".hero-content h1 span");
  const phrases = ["COLLECTIVE", "INTELLIGENCE", "LAYER"];

  titleSpans.forEach((span, i) => {
    const fx = new TextScramble(span);
    setTimeout(() => {
      fx.setText(phrases[i]);
    }, i * 200);
  });
});

// Hover effects
document.querySelectorAll(".info-item, .email-display").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursorOutline.style.transform = "scale(1.5)";
    cursorDot.style.transform = "scale(2)";
  });
  item.addEventListener("mouseleave", () => {
    cursorOutline.style.transform = "scale(1)";
    cursorDot.style.transform = "scale(1)";
  });
});
