import { initMaterials } from "./component/material.js";
import { initPrimitives } from "./component/primitive.js";
import { initRenderers } from "./component/renderer.js";
import { initCamera } from "./system/camera.js";
import { initLight } from "./system/light.js";
import { initEntities } from "./entity/entity.js";

export function initializeScene(canvasData) {
    // init components
    initMaterials();
    initRenderers(canvasData);
    initPrimitives(canvasData);

    // init systems
    initCamera(canvasData);
    initLight(canvasData);

    // init entities
    initEntities(canvasData);
}