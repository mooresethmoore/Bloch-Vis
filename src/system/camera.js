import * as mat4 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";
import { toRadian } from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/common.js"

export function getVMatrix(canvasData) {
    let cameraProperties = canvasData.cameraProperties;
    var vMatrix = mat4.create();
    mat4.lookAt(vMatrix, cameraProperties.cameraPosition, cameraProperties.center, cameraProperties.upVector);
    return vMatrix;
}

export function getPMatrix(canvasData) {
    let cameraProperties = canvasData.cameraProperties;
    var pMatrix = mat4.create();
    mat4.perspective(pMatrix, toRadian(cameraProperties.fovy), cameraProperties.aspect, cameraProperties.near, cameraProperties.far);
    mat4.multiply(pMatrix, cameraProperties.cameraRotationMatrix, pMatrix);
    return pMatrix;
}