const nodes = [];
for (let i = 0; i < 500; i++) {
    nodes.push({ x: Math.random() * 800, y: Math.random() * 600 });
}

function runBaseline() {
    let lines = 0;
    const start = performance.now();
    for (let k = 0; k < 1000; k++) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x,
                      dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 130) {
                    lines++;
                }
            }
        }
    }
    const end = performance.now();
    return end - start;
}

function runOptimized() {
    let lines = 0;
    const start = performance.now();
    for (let k = 0; k < 1000; k++) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x,
                      dy = nodes[i].y - nodes[j].y;
                const dSq = dx * dx + dy * dy;
                if (dSq < 16900) { // 130 * 130
                    const d = Math.sqrt(dSq);
                    lines++;
                }
            }
        }
    }
    const end = performance.now();
    return end - start;
}

const t1 = runBaseline();
const t2 = runOptimized();

console.log(`Baseline: ${t1.toFixed(2)} ms`);
console.log(`Optimized: ${t2.toFixed(2)} ms`);
console.log(`Improvement: ${((t1 - t2) / t1 * 100).toFixed(2)}%`);
