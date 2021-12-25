import { Primitive } from "../component/primitive.js";
import * as vec3 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/vec3.js";

export function createEmpty(canvasData) {
    return new Primitive(canvasData, [], [], [], [], []);
}

export function createCube(canvasData, size) {
    const cubeVertices = [
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
    ];
    
    const cubeIndices = [
        3, 2, 1, 3, 1, 0,
        5, 0, 1, 5, 1, 6,
        7, 4, 5, 7, 5, 6,
        7, 2, 3, 7, 3, 4,
        4, 3, 0, 4, 0, 5,
        2, 7, 6, 2, 6, 1
    ];

    const cubeTexels = [
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 1.0
    ];

    const cubeNormals = calculateCubeNormals(cubeVertices);

    const cubeTangents = [
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
    ];

    return new Primitive(canvasData, cubeVertices.map(x => x * size), cubeIndices, cubeNormals, cubeTangents, cubeTexels);
}

export function createCylinder(canvasData, baseRadius, topRadius, height, sliceNumber, stackNumber) {
    const colorBegin = 0.30;
    const colorEnd = 0.70;
    var cylinderVertices = [];
    var cylinderIndices = [];
    var cylinderColors = [];
    
    var h;
    var i, j;
    for(h of getStackPoints(stackNumber)) {
        var radius = baseRadius + h * (topRadius - baseRadius);
        for([i, j] of getUnitCirclePoints(sliceNumber)) {
            cylinderVertices = cylinderVertices.concat([radius * i, height * h, radius * j]);
            cylinderColors = cylinderColors.concat([colorBegin + h * (colorEnd - colorBegin)]);
        }
    }
    // For adding top to cylinder
    for([i, j] of getUnitCirclePoints(sliceNumber)) {
        cylinderVertices = cylinderVertices.concat([0, height * h, 0]);
        cylinderColors = cylinderColors.concat([colorBegin + h * (colorEnd - colorBegin)]);
    }

    for(h = 0; h < stackNumber; h++) {
        for(i = 0; i < sliceNumber; i++) {
            const p1 = (h * sliceNumber) + i;
            const p2 = (h * sliceNumber) + ((i + 1) % sliceNumber);
            const p3 = ((h + 1) * sliceNumber) + i;
            const p4 = ((h + 1) * sliceNumber) + ((i + 1) % sliceNumber);

            cylinderIndices = cylinderIndices.concat([p1, p4, p2, p1, p4, p3]);
        }
    }

    var steps = cylinderVertices.length / 3;
    var cylinderNormals = [];
    var cylinderTangents = [];
    var cylinderTexels = [];
    for(i = 0; i < steps; i++) {
        cylinderNormals = cylinderNormals.concat([0.0, 1.0, 0.0]);
        cylinderTangents = cylinderTangents.concat([0.0, 0.0, 0.0]);
        cylinderTexels = cylinderTexels.concat([0.0, 1.0]);
    }

    return new Primitive(canvasData, cylinderVertices, cylinderIndices, cylinderNormals, cylinderTangents, cylinderTexels);
}

function getUnitCirclePoints(sliceNumber) {
    var pointsList = [];
    const increment = (Math.PI * 2) / sliceNumber;
    for(var i = 0.0; i < (Math.PI * 2); i += increment) {
        pointsList.push([Math.cos(i), Math.sin(i)]);
    }
    return pointsList;
}

function getStackPoints(stackNumber) {
    var pointsList = [];
    const increment = 1 / stackNumber;
    for(var i = 0.0; i < 1; i += increment) {
        pointsList.push(i);
    }
    return pointsList;
}

function calculateCubeNormals(vertices) {
    var normals = [];
    for(var v = 0; v < vertices.length; v += 3) {
        var normal = vec3.create();
        vec3.normalize(normal, vertices.slice(v, v + 3));
        const unTypedNormal = [normal[0], normal[1], normal[2]];
        normals = normals.concat(unTypedNormal);
    }
    return normals;
}