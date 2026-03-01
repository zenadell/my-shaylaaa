import fs from 'fs';

const buf = fs.readFileSync('./public/Model/RobotExpressive.glb');
// Extremely basic glb parser to find node names in the json chunk
const header = buf.readUInt32LE(0);
const version = buf.readUInt32LE(4);
const length = buf.readUInt32LE(8);
const chunkLength = buf.readUInt32LE(12);
const chunkType = buf.readUInt32LE(16);
const chunkData = buf.slice(20, 20 + chunkLength);
const json = JSON.parse(chunkData.toString('utf-8'));

console.log("Nodes:");
json.nodes.forEach(n => console.log(n.name));
console.log("Meshes:");
json.meshes.forEach(m => {
    console.log("Mesh:", m.name);
    if (m.extras && m.extras.targetNames) console.log("Targets:", m.extras.targetNames);
});
