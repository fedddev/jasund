export const fragmentShader = `#version 300 es
precision highp float;

in vec2 vTexCoord; // Texture coordinates
out vec4 fragColor; // Output color

uniform float uTime; // Time uniform to animate the gradient

// Function to interpolate between colors based on a normalized time value
vec3 sunsetGradient(float t) {
    // Interpolating between sunset colors (orange, pink, purple)
    vec3 color1 = vec3(1.0, 0.5, 0.0);   // Deep orange
    vec3 color2 = vec3(1.0, 0.8, 0.2);   // Bright yellow
    vec3 color3 = vec3(1.0, 0.4, 0.6);   // Soft pink
    vec3 color4 = vec3(0.5, 0.0, 0.5);   // Purple

    // Use a sin wave to simulate a time-varying gradient
    float cycle = sin(t * 3.14159 * 0.5); // Sin wave oscillation from 0 to 1
    float mixFactor = (cycle + 1.0) * 0.5; // Normalize to range [0, 1]
    
    if (t < 0.33) {
        return mix(color1, color2, t * 3.0); // Transition from orange to yellow
    } else if (t < 0.66) {
        return mix(color2, color3, (t - 0.33) * 3.0); // Transition from yellow to pink
    } else {
        return mix(color3, color4, (t - 0.66) * 3.0); // Transition from pink to purple
    }
}

void main() {
    // Animate the gradient by using time and texture coordinates
    float t = mod(uTime + vTexCoord.x * 0.5, 1.0); // Move gradient across screen
    vec3 color = sunsetGradient(t); // Get the color for the given time position
    
    fragColor = vec4(color, 1.0); // Output the final color
}`;
