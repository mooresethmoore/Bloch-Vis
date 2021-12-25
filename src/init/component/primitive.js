import * as builder from "../../builder/primitiveBuilder.js";
import * as parametricBuilder from "../../builder/parametricPrimitiveBuilder.js";

export function initPrimitives(canvasData) {
    let gl = canvasData.gl;
    let primitives = {};
    let buffers = {};
    let vertexArrays = {
        vertexPositions : [],
        vertexIndices : [],
        vertexNormals : [],
        vertexTangents : [],
        vertexTexels : []
    };
    canvasData.vertexArrays = vertexArrays;

    buffers.vertexPositionBuffer = gl.createBuffer();
    buffers.vertexNormalBuffer = gl.createBuffer();
    buffers.vertexTexelBuffer = gl.createBuffer();
    buffers.vertexIndexBuffer = gl.createBuffer();
    buffers.vertexTangentBuffer = gl.createBuffer();

    primitives.empty = builder.createEmpty(canvasData);
    primitives.cube = builder.createCube(canvasData, 1);
    primitives.cylinder = builder.createCylinder(canvasData, 1, 1, 1, 30, 1);
    primitives.sphere = parametricBuilder.buildSphere(canvasData);
    primitives.sphere2 = parametricBuilder.buildSphere2(canvasData);
    
    canvasData.primitives = primitives;
    canvasData.buffers = buffers;
}