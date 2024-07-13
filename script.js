function knightsTravails() {

    return {

        isValid: function (x, y) {
            return x >= 0 && x < 8 && y >= 0 && y < 8;
        },
        knightMoves: function (start, target) {
            const moves = [ [2,1], [2,-1], [-2,1], [-2,-1], [1,2], [1,-2], [-1,2], [-1,-2] ]

            const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
            const predecessor = Array.from({ length: 8 }, () => Array(8).fill(null));//to track visited paths
            const queue = []

            const [startX, startY] = start;
            const [targetX, targetY] = target;

            queue.push(start);
            visited[startX][startY] = true;

            while (queue.length > 0) {
                const [x, y] = queue.shift();

                if (x === targetX && y === targetY) {//this section will return path
                    const path = [];
                    let pos = [x, y];

                    while (pos) {
                        path.push(pos);
                        pos = predecessor[pos[0]][pos[1]];
                    }

                    return path.reverse();

                }

                for (const [dx, dy] of moves) {
                    const newX = x + dx;
                    const newY = y + dy;

                    if (this.isValid(newX, newY) && !visited[newX][newY]) {
                        queue.push([newX, newY]);
                        visited[newX][newY] = true;
                        predecessor[newX][newY] = [x, y];
                    }
                }

                
            }
        }
    };
}

// Test function to run scenarios for knightsTravails
function testKnightsTravails() {
    const kt = knightsTravails();

    const tests = [
        { start: [0, 0], target: [7, 7] }, // Start: top-left, Target: bottom-right
        { start: [0, 0], target: [1, 2] }, // Start: top-left, Target: (1, 2)
        { start: [0, 0], target: [3, 3] }, // Start: top-left, Target: (3, 3)
        { start: [4, 4], target: [7, 7] }, // Start: middle, Target: bottom-right
        { start: [2, 3], target: [4, 4] }, // Start: (2, 3), Target: (4, 4)
        { start: [0, 0], target: [0, 0] }, // Start: top-left, Target: itself
        { start: [0, 0], target: [7, 0] }  // Start: top-left, Target: bottom-right up
    ];

    tests.forEach((test, index) => {
        const { start, target } = test;
        console.log(`Test ${index + 1}: Start ${start}, Target ${target}`);

        const path = kt.knightMoves(start, target);
        console.log("Path:", path.length > 0 ? path.map(pos => `[${pos.join(', ')}]`).join(' -> ') : "No path found");
        console.log("---------------------------------------");
    });
}

// Run the test function
testKnightsTravails();