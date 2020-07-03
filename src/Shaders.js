import { Shaders, GLSL } from "gl-react";

const shaders = Shaders.create({
  ORIGINAL: {
    frag: GLSL`
          precision highp float;
          uniform sampler2D tex;
          varying vec2 uv;

          void main()
          {
              vec3 col = texture2D( tex, uv ).xyz;
              gl_FragColor = vec4(col, 1.0);
          }
      `,
  },
  CRT: {
    frag: GLSL`
          precision highp float;
          uniform sampler2D tex;
          uniform float iTime;
          varying vec2 uv;
  
          void main()
          {
              vec3 oricol = texture2D( tex, uv ).xyz;
              vec3 col;
              float x =  sin(0.3*iTime+uv.y*21.0)*sin(0.7*iTime+uv.y*29.0)*sin(0.3+0.33*iTime+uv.y*31.0)*0.0017;
  
              col.r = texture2D(tex,vec2(x+uv.x+0.001,uv.y+0.001)).x+0.05;
              col.g = texture2D(tex,vec2(x+uv.x+0.000,uv.y-0.002)).y+0.05;
              col.b = texture2D(tex,vec2(x+uv.x-0.002,uv.y+0.000)).z+0.05;
              col.r += 0.08*texture2D(tex,0.75*vec2(x+0.025, -0.027)+vec2(uv.x+0.001,uv.y+0.001)).x;
              col.g += 0.05*texture2D(tex,0.75*vec2(x+-0.022, -0.02)+vec2(uv.x+0.000,uv.y-0.002)).y;
              col.b += 0.08*texture2D(tex,0.75*vec2(x+-0.02, -0.018)+vec2(uv.x-0.002,uv.y+0.000)).z;
  
              col = clamp(col*0.6+0.4*col*col*1.0,0.0,1.0);
  
              float vig = (0.0 + 1.0*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y));
              col *= vec3(pow(vig,0.3));
  
              col *= vec3(0.95,1.05,0.95);
              col *= 2.8;
  
              float scans = clamp( 0.35+0.35*sin(3.5*iTime+uv.y*gl_FragCoord.y/uv.y*1.5), 0.0, 1.0);
              
              float s = pow(scans,1.7);
              col = col*vec3( 0.4+0.7*s) ;
  
              col *= 1.0+0.01*sin(110.0*iTime);
              if (uv.x < 0.0 || uv.x > 1.0)
                  col *= 0.0;
              if (uv.y < 0.0 || uv.y > 1.0)
                  col *= 0.0;
              
              col*=1.0-0.65*vec3(clamp((mod(gl_FragCoord.x, 2.0)-1.0)*2.0,0.0,1.0));
              
              float comp = smoothstep( 0.1, 0.9, sin(iTime) );
  
              gl_FragColor = vec4(col, 1.0);
          }
      `,
  },
  VHS: {
    frag: GLSL`
        precision highp float;
        uniform sampler2D tex;
        uniform float iTime;
        varying vec2 uv;
        
        highp float rand(vec2 co)
        {
            highp float a = 12.9898;
            highp float b = 78.233;
            highp float c = 43758.5453;
            highp float dt= dot(co.xy ,vec2(a,b));
            highp float sn= mod(dt,3.14);
            return fract(sin(sn) * c);
        }
      
        void main()
        {
            highp float magnitude = 0.000008;
        
            // Set up offset
            vec2 offsetRedUV = uv;
            offsetRedUV.x = uv.x + rand(vec2(iTime*0.03,uv.y*0.42)) * 0.001;
            offsetRedUV.x += sin(rand(vec2(iTime*0.2, uv.y)))*magnitude;
            
            vec2 offsetGreenUV = uv;
            offsetGreenUV.x = uv.x + rand(vec2(iTime*0.004,uv.y*0.002)) * 0.004;
            offsetGreenUV.x += sin(iTime*9.0)*magnitude;
            
            vec2 offsetBlueUV = uv;
            offsetBlueUV.x = uv.y;
            
            // Load Texture
            float r = texture2D(tex, offsetRedUV).r;
            float g = texture2D(tex, offsetGreenUV).g;
            float b = texture2D(tex, uv).b;
            
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `,
  },
  Cyberpunk: {
    frag: GLSL`
        precision highp float;
        uniform sampler2D tex;
        varying vec2 uv;
        
        void main()
        {
            vec3 oricol = texture2D( tex, uv ).xyz;
            vec3 col = texture2D( tex, uv ).rgb;
            float oldx = col.x;
            float oldy = col.y;
            float add = abs(oldx - oldy)*0.5;
            float stepxy = step(col.y, col.x);
            float stepyx = 1.0 - stepxy;
            col.x = stepxy * (oldx + add) + stepyx * (oldx - add);
            col.y = stepyx * (oldy + add) + stepxy * (oldy - add);
            col.z = sqrt(col.z);
            col = mix(texture2D( tex, uv ).rgb, col, 1.0);
            gl_FragColor = vec4(col, 1.0);
        }
    `,
  },
});

export const ORIGINAL = shaders.ORIGINAL;

export const ShaderList = [
  {
    name: "CRT",
    reference: "MattiasCRT",
    link: "https://www.shadertoy.com/view/Ms23DR",
    shader: shaders.CRT,
  },
  {
    name: "VHS",
    reference: "VHS Shader",
    link: "https://www.shadertoy.com/view/MsK3zw",
    shader: shaders.VHS,
  },
  {
    name: "Cyberpunk",
    reference: null,
    link: null,
    shader: shaders.Cyberpunk,
  },
];
