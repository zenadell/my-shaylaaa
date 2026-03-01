import fs from 'fs';
const buffer = fs.readFileSync('./public/Model/House.glb');
let offset = 12;
let jsonChunkLength = buffer.readUInt32LE(offset);
offset += 8;
const jsonStr = buffer.toString('utf8', offset, offset + jsonChunkLength);
const gltf = JSON.parse(jsonStr);
offset += jsonChunkLength;
let binChunkLength = buffer.readUInt32LE(offset);
offset += 8;
const binBuffer = buffer.slice(offset, offset + binChunkLength);

function inspectMesh(nodeName) {
    const node = gltf.nodes.find(n => n.name === nodeName);
    if (!node || node.mesh === undefined) return;
    const mesh = gltf.meshes[node.mesh];
    const primitive = mesh.primitives[0];
    const accessorIndex = primitive.attributes.POSITION;
    if (accessorIndex === undefined) return;
    const posAccessor = gltf.accessors[accessorIndex];
    if (posAccessor.bufferView === undefined) return;
    const bufferView = gltf.bufferViews[posAccessor.bufferView];
    const byteOffset = (posAccessor.byteOffset || 0) + (bufferView.byteOffset || 0);
    
    // We expect the football ball to be roughly spherical. We can look for clusters of vertices.
    // Let's just print the absolute bounds of the mesh.
    if(posAccessor.min) console.log(nodeName, "Bounds:", posAccessor.min, posAccessor.max);
}

// Inspect all nodes
gltf.nodes.forEach(n => {
    if (n.mesh !== undefined) {
        inspectMesh(n.name);
    }
});
