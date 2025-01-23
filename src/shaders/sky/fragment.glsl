uniform float uTime;
uniform vec3 uSkyColorDay;
uniform vec3 uSkyColorNight;
uniform float uRotationSpeed;

varying vec2 vUv;
varying vec3 vPosition;

float pi = 22.0 / 7.0;

vec3 getSkyColor(float time) {
    vec3 dayColor = uSkyColorDay;
    vec3 nightColor = uSkyColorNight;

    return mix(dayColor, nightColor, sin(time * pi));
}

void main() {
    // Rotate the sky based on the time of day
    float rotationAngle = uTime * uRotationSpeed; // Rotation based on time
    mat3 rotationMatrix = mat3(
        cos(rotationAngle), 0.0, sin(rotationAngle),
        0.0, 1.0, 0.0,
        -sin(rotationAngle), 0.0, cos(rotationAngle)
    );

    // Apply rotation to the position to simulate sun movement
    vec3 rotatedPosition = rotationMatrix * vPosition;

    // Get sky color based on the time of day
    vec3 skyColor = getSkyColor(uTime);

    // Lighten the color closer to the zenith (the top of the sky) for more realistic lighting
    float zenithFactor = 1.0 - abs(rotatedPosition.y); // Zenith is at the top of the sphere, y = 1.0
    skyColor *= mix(0.8, 1.2, zenithFactor); // Apply zenith effect (brighter overhead)

    gl_FragColor = vec4(skyColor, 1.0);
}