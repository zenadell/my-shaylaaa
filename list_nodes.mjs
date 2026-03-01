import fs from 'fs';
const glbFile = './public/Model/House.glb';
const buffer = fs.readFileSync(glbFile);
let offset = 12;
let jsonChunkLength = buffer.readUInt32LE(offset);
offset += 8;
const jsonStr = buffer.toString('utf8', offset, offset + jsonChunkLength);
const gltf = JSON.parse(jsonStr);

console.log("Looking for football or ball nodes:");
gltf.nodes.forEach(n => {
    if (n.name && n.name.toLowerCase().includes('ball')) {
        console.log("Found:", n.name);
        if (n.mesh !== undefined) {
            const mesh = gltf.meshes[n.mesh];
            const primitive = mesh.primitives[0];
            const accessorId = primitive.attributes.POSITION;
            const accessor = gltf.accessors[accessorId];

            const min = accessor.min;
            const max = accessor.max;
            const center = [
                (min[0] + max[0]) / 2,
                (min[1] + max[1]) / 2,
                (min[2] + max[2]) / 2
            ];
            console.log("Center:", center);
        }
    }
});
