import fs from 'fs';

const url = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb';

try {
    console.log("Fetching...", url);
    const result = await fetch(url);
    if (!result.ok) throw new Error("HTTP error " + result.status);
    const buf = await result.arrayBuffer();
    fs.writeFileSync('./public/Model/RobotExpressive.glb', Buffer.from(buf));
    console.log("Downloaded successfully, size:", buf.byteLength);
} catch (e) {
    console.error("Fetch failed", e);
}
