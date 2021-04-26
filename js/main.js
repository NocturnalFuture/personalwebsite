const canvas = document.querySelector("canvas");
const sandbox = new GlslCanvas(canvas);

const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D image;


varying vec3 v_normal;
varying vec2 v_texcoord;

#define NUM_OCTAVES 5

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}


void main(void)
{
    vec2 uv =  v_texcoord;

    
    float strength = smoothstep(0.2, 0.01, uv.y);
    
    vec2 surface = strength * vec2(
    mix(-0.3, 0.3, fbm(5.0 * uv + 0.5 *  u_time)), 
    mix(-0.3, 0.3, fbm(5.0 * uv + 0.5 *  u_time))
    );
    
    uv += refract(vec2(0.0, 0.0), surface, 1.0 / 1.333);
    
    
    vec4 color = texture2D(image,uv);
    
    gl_FragColor = color;
}
`

sandbox.load(frag);
sandbox.setUniform("image", "https://nocturnalfuture.github.io/personalwebsite/images/ship.jpg")

const locations = document.querySelectorAll(".loco div")



const updateTimes = function() {
    locations.forEach(el => {
        const output = el.querySelector(".time");
        const timezone = el.getAttribute("data-timezone")
        const now = luxon.DateTime.now().setZone(timezone)
        output.innerHTML = now.toFormat("HH:mm:ss");
    })
}



setInterval(() => {
    updateTimes()
}, 1000)


const circleType = new CircleType(
  document.getElementById("rotated")
).radius(80);

$(window).scroll(function() {
  var offset = $(window).scrollTop();
  offset = offset * 0.4;

  $(".circular-text").css({
      "-moz-transform": "rotate(" + offset + "deg)",
      "-webkit-transform": "rotate(" + offset + "deg)",
      "-o-transform": "rotate(" + offset + "deg)",
      "-ms-transform": "rotate(" + offset + "deg)",
      transform: "rotate(" + offset + "deg)"
  });
});

function log() {
    setTimeout(console.log.bind(console, "%cFor Danni ❤️%c", "background: #000000;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px;", ""));
    
  }
  
  log();

  
const faders = document.querySelectorAll('.fade-in')
const appearOptions = {
    threshold: 1
}


const appearOnScoll =  new IntersectionObserver
(function(entries, appearOnScoll) {
        entries.forEach((entry) => {
            if(!entry.isIntersecting){
                return;
            } else {
                entry.target.style.opacity = "1.0"
                entry.target.classList.add("appear");
                appearOnScoll.unobserve(entry.target)
                console.log('hello');
            }
        }, )
},appearOptions)


faders.forEach((fader) => {
    appearOnScoll.observe(fader)
})

const target = document.querySelector(".targetMe");
const hiddenClass = document.querySelector(".info")
const hiddenClass2 = document.querySelector(".info2")

target.addEventListener('click', () => {
    hiddenClass.classList.toggle("opened")
})


target.addEventListener('click', () => {
    hiddenClass2.classList.toggle("opened2")
})

