import * as mat4 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";
import * as vec3 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/vec3.js";
import { getVMatrix, getPMatrix } from "../system/camera.js";


export function drawScene(canvasData) {
    let gl = canvasData.gl;
    gl.clearColor(1.0, 0.9, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.disable(gl.DEPTH_TEST);
    canvasData.entities.sphere.draw(canvasData, mat4.create());
    canvasData.entities.cylinder.draw(canvasData, mat4.create());
    gl.enable(gl.DEPTH_TEST);
    canvasData.entities.root.draw(canvasData, mat4.create());

    let ctx = canvasData.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawLabel(canvasData, "z Axis", canvasData.entities.yAxis, [0.4, 0.4, 0.4])
    drawLabel(canvasData, "|0〉", canvasData.entities.yAxis, [0.35, 0.35, 0.35])
    drawLabel(canvasData, "|1〉", canvasData.entities.yAxis, [-0.35, -0.35, -0.35])

    drawLabel(canvasData, "x Axis", canvasData.entities.xAxis, [0.5, 0.5, 0.5])
    drawLabel(canvasData, "|+〉", canvasData.entities.xAxis, [0.35, 0.35, 0.35])
    drawLabel(canvasData, "|-〉", canvasData.entities.xAxis, [-0.35, -0.35, -0.35])

    drawLabel(canvasData, "y Axis", canvasData.entities.zAxis, [0.5, 0.5, 0.5])
    drawLabel(canvasData, "|i+〉", canvasData.entities.zAxis, [0.35, 0.35, 0.35])
    drawLabel(canvasData, "|i-〉", canvasData.entities.zAxis, [-0.35, -0.35, -0.35])

    let vector = canvasData.entities.vectors[0];
    let vectorText = "Θ : " + vector.theta.toFixed(2) + "°, Φ : " + vector.phi.toFixed(2) + "°";
    drawLabel(canvasData, vectorText, vector, [0.35, 0.35, 0.35])
}

function drawLabel(canvasData, text, entity, initVector) {
    let ctx = canvasData.ctx;
    let mMatrix = mat4.create();
    mat4.multiply(mMatrix, canvasData.entities.root.nodeMMatrix, entity.nodeMMatrix);

    let mvMatrix = mat4.create();
    mat4.multiply(mvMatrix, getVMatrix(canvasData), mMatrix);

    let mvpMatrix = mat4.create();
    mat4.multiply(mvpMatrix, getPMatrix(canvasData), mvMatrix);

    let initPoint = vec3.clone(initVector);
    let finalPoint = vec3.create();
    vec3.transformMat4(finalPoint, initPoint, mvMatrix);

    let xCoor = (finalPoint[0] + 1) * ctx.canvas.width / 2;
    let yCoor = (1 - finalPoint[1]) * ctx.canvas.height / 2
    ctx.fillText(text, xCoor, yCoor);
}