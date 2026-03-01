import fs from 'fs';

const glbFile = './public/Model/House.glb';
const buffer = fs.readFileSync(glbFile);

let offset = 12;
let jsonChunkLength = buffer.readUInt32LE(offset);
offset += 8;

const jsonStr = buffer.toString('utf8', offset, offset + jsonChunkLength);
const gltf = JSON.parse(jsonStr);

let output = [];
gltf.nodes.forEach((n, i) => {
    output.push(`${i}: ${n.name || 'UNNAMED'}`);
});
fs.writeFileSync('all_nodes.txt', output.join('\n'));
