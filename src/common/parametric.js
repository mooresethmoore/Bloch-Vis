import * as vec3 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/vec3.js";
import { Primitive } from "../component/primitive.js";

function buildParamArray(paramMin, paramMax, paramSteps) {
    const step = (paramMax - paramMin) / paramSteps;
    var paramArray = [];
    for(var i = 0; i < paramSteps; i++) {
        paramArray.push(paramMin + i * step);
    }
    return paramArray;
}

function buildUVArray(uMin, uMax, uSteps, vMin, vMax, vSteps) {
    const uArray = buildParamArray(uMin, uMax, uSteps);
    const vArray = buildParamArray(vMin, vMax, vSteps);
    var uvArray = [];
    for(var i = 0; i < uArray.length; i++) {
        for (var j = 0; j < vArray.length; j++) {
            uvArray.push([uArray[i], vArray[j]]);
        }
    }
    return uvArray;
}

function buildNormal(uDerivative, vDerivative) {
    const ud = vec3.clone(uDerivative);
    const vd = vec3.clone(vDerivative);

    var normal = [];
    vec3.cross(normal, ud, vd);

    // Returning after converting to array
    return([normal[0], normal[1], normal[2]]);
}

function buildIndices(uSteps, vSteps) {
    var indices = [];
    for(var i = 0; i < (uSteps - 1); i++) {
        for(var j = 0; j < (vSteps - 1); j++) {
            const p1 = i * uSteps + j;
            const p2 = i * uSteps + j + 1;
            const p3 = (i + 1) * uSteps + j;
            const p4 = (i + 1) * uSteps + j + 1;

            indices = indices.concat([p2, p3, p1, p2, p3, p4]);
        }
    }
    return indices;
}

export function buildParametricPrimitive(canvasData, uMin, uMax, uSteps, vMin, vMax, vSteps,
    pointCalculator, uDerivative, vDerivative) {
    const uvArray = buildUVArray(uMin, uMax, uSteps, vMin, vMax, vSteps);

    var positions = [];
    var normals = [];
    var tangents = [];
    var texels = [];


    for(var [u, v] of uvArray) {
        const tangent = uDerivative(u, v);
        const normal = buildNormal(tangent, vDerivative(u, v));

        positions = positions.concat(pointCalculator(u, v));
        normals = normals.concat(normal);
        tangents = tangents.concat(tangent);
        texels = texels.concat([u, v]);
    }

    var indices = buildIndices(uSteps, vSteps);

    return new Primitive(canvasData, positions, indices, normals, tangents, texels);
}