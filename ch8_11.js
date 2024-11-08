class MultiplicatorUnitFailure extends Error { }

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk")
    }
}

function reliableMultiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b)
        } catch (error) {
            if (!(error instanceof MultiplicatorUnitFailure)) {
                throw error;
            }
        }
    }
}

console.log(reliableMultiply(8, 8))

const box = new class {
    locked = true;
    #content = [];

    unlock() { this.locked = false; }
    lock() { this.locked = true; }
    get content() {
        if (this.locked) throw new Error("Locked!")
        return this.#content;
    }
};

function withBoxUnlocked(body) {
    let wasLocked = box.locked;

    if (wasLocked) {
        box.unlock()
    }

    try {
        body()
    } finally {
        if (wasLocked) {
            box.lock()
        }
    }
}

withBoxUnlocked(() => {
    box.content.push("gold piece")
})

try {
    withBoxUnlocked(() => {
        throw new Error("Pirates on the horizon! Abort!")
    })
} catch (e) {
    console.log("Error raised: " + e)
}

console.log(box.locked)


import { buildGraph } from "./robot.js";
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

console.log(buildGraph(roads))


import fs from 'fs'

async function textFile(filename) {
    try {
        return await fs.promises.readFile(filename, 'utf-8')
    } catch (error) {
        console.error(`Error reading file ${filename}:`, error)
        throw error
    }
}

async function activityTable(day) {
    let logFileListContent = await textFile("camera_logs.txt")
    let logFiles = logFileListContent.trim().split("\n")

    let hourlyCounts = new Array(24).fill(0)

    for (let logFile of logFiles) {
        try {
            let logContent = await textFile(logFile)
            let timestamps = logContent.trim().split("\n")

            for (let timestamp of timestamps) {
                let time = new Date(Number(timestamp))

                console.log(`Timestamp: ${timestamp}, Day: ${time.getDay()}, Hour: ${time.getHours()}`)

                if (time.getDay() === day) {
                    let hour = time.getHours()
                    hourlyCounts[hour] += 1
                    console.log(`Updated hourlyCounts: ${hourlyCounts}`)
                }
            }
        } catch (err) {
            console.error(`Error reading log file ${logFile}:`, err)
        }
    }

    return hourlyCounts;
}


function activityGraph(table) {
    return table.map((count, hour) => `${hour}: ${count}`).join("\n")
}

activityTable(2).then(table => console.log(activityGraph(table)))

function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let results = []
        let completed = 0

        if (promises.length === 0) {
            return resolve(results)
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;
                    if (completed === promises.length) {
                        resolve(results)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    })
}


Promise_all([]).then(array => {
    console.log("This should be []:", array)
})

function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500)
    })
}

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log("This should be [1, 2, 3]:", array)
})

Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then(array => {
        console.log("We should not get here")
    })
    .catch(error => {
        if (error !== "X") {
            console.log("Unexpected failure:", error)
        }
    })
