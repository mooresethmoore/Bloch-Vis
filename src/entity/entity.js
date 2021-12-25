import * as mat4 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";
import { getVMatrix, getPMatrix } from "../system/camera.js";

export class Entity {
    constructor(nodeMMatrix, primitive, material, renderer, texture, children) {
        this.nodeMMatrix = nodeMMatrix;
        this.primitive = primitive;
        this.material = material;
        this.renderer = renderer;
        this.texture = texture;
        this.children = children;
    }

    draw(canvasData, baseMatrix) {
        let gl = canvasData.gl;
        let buffers = canvasData.buffers;
        let vertexArrays = canvasData.vertexArrays;
        let cameraProperties = canvasData.cameraProperties;
        let lightProperties = canvasData.lightProperties;

        var mMatrix = mat4.create();
        mat4.multiply(mMatrix, baseMatrix, this.nodeMMatrix);

        gl.useProgram(this.renderer.shaderProgram);
        this.renderer.initializer(gl, this.renderer.shaderProgram);

        const drawInput = {
            mMatrix : mMatrix,
            vMatrix : getVMatrix(canvasData),
            pMatrix : getPMatrix(canvasData),
            material : this.material,
            vertexArrays : vertexArrays,
            buffers : buffers,
            lightProperties : lightProperties,
            cameraPosition : cameraProperties.cameraPosition,
            texture : this.texture,
            primitive : this.primitive
        };
        
        this.renderer.draw(gl, drawInput);

        for(var child of this.children) {
            child.draw(canvasData, mMatrix);
        }
    }
}
