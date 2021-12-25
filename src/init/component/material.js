import { Material, materials } from "../../component/material.js";

export function initMaterials() {
    materials.gray = new Material([0.05, 0.05, 0.05], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], 20.0);
    materials.pinkish = new Material([0.4825, 0.206, 0.2765], [0.945, 0.129, 0.341], [1.0, 1.0, 1.0], 20.0);
    materials.bluish = new Material([0.206, 0.2765, 0.4825], [0.129, 0.341, 0.945], [1.0, 1.0, 1.0], 20.0);
    materials.greenish = new Material([0.2765, 0.4825, 0.206], [0.341, 0.945, 0.129], [1.0, 1.0, 1.0], 20.0);
    materials.yellowish = new Material([0.918, 0.694, 0.059], [0.918, 0.694, 0.059], [1.0, 1.0, 1.0], 20.0);
    materials.whitish = new Material([0.969, 0.969, 0.969], [0.969, 0.969, 0.969], [1.0, 1.0, 1.0], 20.0);
    materials.grayish = new Material([0.35, 0.35, 0.35], [0.35, 0.35, 0.35], [1.0, 1.0, 1.0], 20.0);
    materials.empty = new Material([0, 0, 0], [0, 0, 0], [0, 0, 0], 0);
}