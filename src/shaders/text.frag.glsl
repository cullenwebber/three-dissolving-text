varying vec2 vUv;
uniform float time;
uniform float progress;
#include "./perlin.glsl"

 float fbm(vec3 p) {                                                                                                                                                                                              
      float value = 0.0;                                                                                                                                                                                           
      float amplitude = 0.5;                                                                                                                                                                                       
      for (int i = 0; i < 3; i++) {                                                                                                                                                                                
          value += amplitude * cnoise(p);                                                                                                                                                                          
          p *= 2.0;                                                                                                                                                                                                
          amplitude *= 0.5;                                                                                                                                                                                        
      }                                                                                                                                                                                                            
      return value;                                                                                                                                                                                                
  }  

  void main() {                              
     vec2 uv = vUv;                                                                                                                                                                                                   
    uv.x *= 2.0; 
    float noise = fbm(vec3(uv, 1.0) * 3.0);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    noise = noise * 0.5 + 0.5;                                                                                                                                                                                   
                                                                                                                                                                                                                   
    float alpha = step(progress, noise);                                                                                                                                                                         
                                                                                                                                                                                                                 
    float edgeWidth = 0.5;                                                                                                                                                                                      
    float edge = smoothstep(progress - edgeWidth, progress, noise) * (1.0 - alpha);                                                                                                                              
    edge = pow(edge, 6.0);          

    vec3 red = vec3(1.0, 0.0, 0.0);                                                                                                                                                                                  
    vec3 yellow = vec3(1.0, 1.0, 0.0);                                                                                                                                                                               
    vec3 white = vec3(1.0);                                                                                                                                                                                          
    vec3 blue = vec3(0.0, 0.0, 1.0);                                                                                                                                                                                 
                                                                                                                                                                                                                    
    vec3 burnColor = vec3(0.);                                                                                                                                                                                                                                                                                                                                                                                      
    burnColor = mix(burnColor, red, smoothstep(0.35, 0.5, edge));                                                                                                                                                                                                                                                                                                 
    burnColor = mix(burnColor, yellow, smoothstep(0.55, 0.75, edge));                                                                                                                                                                                                                                                                                                 
    burnColor = mix(burnColor, blue, smoothstep(0.75, 0.85, edge)); 
    burnColor = mix(burnColor, vec3(0.), smoothstep(0.8, 1.0, edge)); 
                                                                                                                                                       
                                                                                                                                                                                                                 
    vec3 color = mix(burnColor, vec3(1.0), alpha); 
                                                                                                                                                              
    float finalAlpha = max(alpha, edge);                                                                                                                                                                         
                                                                                                                                                                                                                 
    gl_FragColor = vec4(color, finalAlpha);                                                                                                                                                                      
  } 