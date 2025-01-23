uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec4 modelMatrix = modelMatrix * vec4(position, 1.0);
    vec4 viewMatrix = viewMatrix * modelMatrix;
    vec4 projectedMatrix = projectionMatrix * viewMatrix;

    gl_Position = projectedMatrix;

    vUv = uv;
    vPosition = position;
}