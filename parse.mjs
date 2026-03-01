import fs from 'fs';

// simple script to read glb and find accessors
const glbFile = './public/Model/House.glb';
const buffer = fs.readFileSync(glbFile);

// GLB has a 12 byte header
// 4 bytes magic "glTF"
// 4 bytes version
// 4 bytes length
const magic = buffer.toString('utf8', 0, 4);
if (magic !== 'glTF') {
    console.error("Not a valid GLB");
    process.exit(1);
}

// Read chunks
let offset = 12;
let jsonChunkLength = buffer.readUInt32LE(offset);
let jsonChunkType = buffer.toString('utf8', offset + 4, offset + 8);
offset += 8;

const jsonStr = buffer.toString('utf8', offset, offset + jsonChunkLength);
const gltf = JSON.parse(jsonStr);

offset += jsonChunkLength;

// The objects we care about:
const names = ["ReactMug", "ThreeJSMug", "SymfonyMug", "BlenderMug", "CssSoap", "HtmlSoap", "JavascriptSoap", "PythonSoap"];

names.forEach(name => {
    const node = gltf.nodes.find(n => n.name === name);
    if (!node) { console.log(name, "not found"); return; }

    // node might have translation, but if not, check the mesh
    const mesh = gltf.meshes[node.mesh];
    const primitive = mesh.primitives[0];
    const accessorId = primitive.attributes.POSITION;
    const accessor = gltf.accessors[accessorId];

    // accessor has min and max which are the bounding box!
    const min = accessor.min;
    const max = accessor.max;
    const center = [
        (min[0] + max[0]) / 2,
        (min[1] + max[1]) / 2,
        (min[2] + max[2]) / 2
    ];

    console.log(`-- ${name} --`);
    console.log(`Node translation:`, node.translation || [0, 0, 0]);
    console.log(`Accessor min:`, min);
    console.log(`Accessor max:`, max);
    console.log(`Center:`, center);
});
