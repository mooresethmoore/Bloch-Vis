attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVPMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMVMatrix;

uniform vec3 uLightPosition;

varying vec3 normal;
varying vec3 lightDir;
varying vec3 viewDir;

void main(void) {
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);

    normal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 0.0)));

    vec4 vertexEyePosition = uMVMatrix * vec4(aVertexPosition, 1.0);

    vec4 lightEyePosition = uVMatrix * vec4(uLightPosition, 1.0);

    lightDir = normalize(vec3(lightEyePosition - vertexEyePosition));

    viewDir = normalize(-vec3(vertexEyePosition));
}