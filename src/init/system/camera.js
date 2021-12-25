import * as mat4 from "../../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";

export function initCamera(canvasData) {
    let cameraProperties = {}
    cameraProperties.cameraPosition = [2, 2, 2];
    cameraProperties.center = [0, 0, 0];
    cameraProperties.upVector = [0, 1, 0];
    cameraProperties.fovy = 60;
    cameraProperties.aspect = 1.0;
    cameraProperties.near = 0.1;
    cameraProperties.far = 100;
    cameraProperties.cameraRotationMatrix = mat4.create();
    canvasData.cameraProperties = cameraProperties;
}