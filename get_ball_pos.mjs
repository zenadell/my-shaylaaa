import fs from 'fs';
const data = fs.readFileSync('./public/Model/House.glb');
const chunkLength = data.readUInt32LE(12);
const jsonChunk = data.slice(20, 20 + chunkLength);
const gltf = JSON.parse(jsonChunk.toString('utf-8'));

const ballNodes = gltf.nodes.filter(n => n.name && n.name.toLowerCase().includes('ball'));
if (ballNodes.length === 0) {
    // If not named ball, let's just log every node with translation
    gltf.nodes.forEach((n, i) => {
        if (n.name && (n.name.includes('Cube') || n.name.includes('Sphere') || n.name.toLowerCase().includes('foot'))) {
            // console.log(`Node ${i}: ${n.name}`, n.translation);
        }
    });
} else {
    ballNodes.forEach(n => console.log("Found:", n.name, n.translation));
}
// Actually, earlier logs showed football were merged into RoofMerge? 
// Let's print all node names to find the football.
gltf.nodes.forEach(n => {
    if(n.name && n.name.toLowerCase().includes('ball')) console.log(n.name, n.translation);
})

