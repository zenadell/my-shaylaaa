import fs from 'fs';
const buffer = fs.readFileSync('./public/Model/House.glb');
let offset = 12;
let jsonChunkLength = buffer.readUInt32LE(offset);
offset += 8;
const jsonStr = buffer.toString('utf8', offset, offset + jsonChunkLength);
const gltf = JSON.parse(jsonStr);

// Look for anything in the GLTF JSON that looks like a ball
console.log("Searching materials...");
if (gltf.materials) {
    gltf.materials.forEach((m, i) => {
        if (m.name && (m.name.toLowerCase().includes('ball') || m.name.toLowerCase().includes('foot'))) {
            console.log("Material:", i, m.name);
        }
    });
}
console.log("Searching nodes...");
if (gltf.nodes) {
    gltf.nodes.forEach((n, i) => {
        if (n.name && (n.name.toLowerCase().includes('ball') || n.name.toLowerCase().includes('foot') || n.name.toLowerCase().includes('sphere'))) {
            console.log("Node:", i, n.name);
        }
    });
}
console.log("Searching meshes...");
if (gltf.meshes) {
    gltf.meshes.forEach((m, i) => {
        if (m.name && (m.name.toLowerCase().includes('ball') || m.name.toLowerCase().includes('foot') || m.name.toLowerCase().includes('sphere'))) {
            console.log("Mesh:", i, m.name);
        }
    });
}
console.log("Search complete.");
