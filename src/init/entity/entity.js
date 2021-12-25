import * as mat4 from "../../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";
import { Entity } from "../../entity/entity.js";
import { materials } from "../../component/material.js";


export function initEntities(canvasData) {
    let renderers = canvasData.renderers;
    let primitives = canvasData.primitives;
    let entities = {};
    canvasData.entities = entities;

    var sphereMatrix = mat4.create();
    mat4.rotate(sphereMatrix, sphereMatrix, Math.PI / 2, [1, 0, 0])
    entities.sphere =  new Entity(sphereMatrix, primitives.sphere, materials.gray, renderers.translucent, null, []);
    entities.sphere2 =  new Entity(sphereMatrix, primitives.sphere2, materials.whitish, renderers.lines, null, []);

    // Axes start here.
    var yAxisMatrix = mat4.create();
    mat4.scale(yAxisMatrix, yAxisMatrix, [0.05, 2.0, 0.05]);
    entities.yAxis = new Entity(yAxisMatrix, primitives.cube, materials.pinkish, renderers.lighting, null, []);

    var xAxisMatrix = mat4.create();
    mat4.scale(xAxisMatrix, xAxisMatrix, [2.0, 0.05, 0.05]);
    entities.xAxis = new Entity(xAxisMatrix, primitives.cube, materials.bluish, renderers.lighting, null, []);

    var zAxisMatrix = mat4.create();
    mat4.scale(zAxisMatrix, zAxisMatrix, [0.05, 0.05, 2.0]);
    entities.zAxis = new Entity(zAxisMatrix, primitives.cube, materials.greenish, renderers.lighting, null, []);

    var cylinderMatrix = mat4.create();
    entities.cylinder = new Entity(cylinderMatrix, primitives.cylinder, materials.grayish, renderers.lighting, null, []);

    entities.root = new Entity(mat4.create(), primitives.empty, materials.empty, renderers.lighting, null, [entities.sphere2, entities.yAxis, entities.xAxis, entities.zAxis]);
}