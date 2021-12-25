export function initLight(canvasData) {
    let lightProperties = {};
    lightProperties.lightPosition = [0.0, 1.0, 3.0];
    lightProperties.ambient = [1.0, 1.0, 1.0];
    lightProperties.diffuse = [1.0, 1.0, 1.0];
    lightProperties.specular = [1.0, 1.0, 1.0];
    canvasData.lightProperties = lightProperties;
}