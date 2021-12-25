precision mediump float;
uniform vec3 uAmbientCoeff;
uniform vec3 uDiffuseCoeff;
uniform vec3 uSpecularCoeff;
uniform float uShininess;

uniform vec3 uLightAmbient;
uniform vec3 uLightDiffuse;
uniform vec3 uLightSpecular;

varying vec3 normal;
varying vec3 lightDir;
varying vec3 viewDir;

void main(void) {
    vec3 ambient = uAmbientCoeff * uLightAmbient;

    float diffuseAngle = max(dot(normal, lightDir), 0.0);

    vec3 diffuse = diffuseAngle * (uDiffuseCoeff * uLightDiffuse);

    vec3 reflected = normalize(reflect(-lightDir, normal));

    float specularAngle = max(dot(reflected, viewDir), 0.0);

    vec3 specular = pow(specularAngle, uShininess) * (uSpecularCoeff * uLightSpecular);

    vec3 color = ambient + diffuse + specular;

    gl_FragColor = vec4(color, 1.0);
}