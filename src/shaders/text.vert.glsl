varying vec2 vUv;
uniform float progress;
uniform float time;

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
    vUv = uv;
    vec3 pos = position;

    // Calculate same noise as fragment shader
    vec2 noiseUv = uv;
    noiseUv.x *= 3.0;
    float noise = fbm(vec3(noiseUv, 1.0) * 3.0) * 0.5 + 0.5;

    // Burn edge detection
    float burnZone = smoothstep(progress - 0.3, progress, noise);

    // Lift and curl vertices at burn edge
    pos.z += burnZone;  // lift up
    // pos.y -= burnZone * 0.15; // curl back

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
