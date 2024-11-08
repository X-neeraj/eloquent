for (let i = 0; i <= 6; i++) {
    let str = "";
    for (let j = 0; j <= i; j++) {
        str += "#"
    }
    console.log(str)
}

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz" )
    } else if (i % 3 === 0) {
        console.log("Fizz" )
    } else if (i % 5 === 0) {
        console.log("Buzz" )
    } else {
        console.log(i )
    }
}

function createChessboard(size) {
    let chessboard = "";
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if ((x + y) % 2 === 0) {
                chessboard += " ";
            } else {
                chessboard += "#";
            }
        }
        chessboard += "\n";
    }
    console.log(chessboard )
}
createChessboard(8 )

function min(a, b) {
    if (a < b) {
        return a
    } else {
        return b
    }
}

function isEven(n) {
    if (n === 0) {
        return true; ''
    } else if (n === 1) {
        return false;
    } else if (n < 0) {
        return isEven(-n )
    } else {
        return isEven(n - 2 )
    }
}

console.log(isEven(50) )
console.log(isEven(75) )
console.log(isEven(-1) )

function countChar(string, char) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === char) {
            count++;
        }
    }
    return count;
}

function countBs(string) {
    return countChar(string, "B" )
}


console.log(countBs("BBC") )
console.log(countChar("kakkerlak", "k") )

function range(start, end, step = 1) {
    let result = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            result.push(i )
        }
    } else {
        for (let i = start; i >= end; i += step) {
            result.push(i )
        }
    }
    return result;
}

function sum(numbers) {
    let total = 0;
    for (let number of numbers) {
        total += number;
    }
    return total;
}

console.log(sum(range(1, 10)))
console.log(range(1, 10, 2))
console.log(range(5, 2, -1))

function reverseArray(array) {
    let reversed = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversed.push(array[i] )
    }
    return reversed;
}

function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2 ); i++) {
        let temp = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = temp;
    }
}

let array = [1, 2, 3, 4, 5]
console.log(reverseArray(array))
console.log(array)

reverseArrayInPlace(array )
console.log(array)

function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = { value: array[i], rest: list };
    }
    return list;
}

function listToArray(list) {
    let array = [];
    while (list !== null) {
        array.push(list.value )
        list = list.rest;
    }
    return array;
}

function prepend(value, list) {
    return { value, rest: list };
}

function nth(list, position) {
    let index = 0;
    while (list !== null) {
        if (index === position) return list.value;
        list = list.rest;
        index++;
    }
    return undefined;
}

let list = arrayToList([1, 2, 3])
console.log(list)
console.log(listToArray(arrayToList([1, 2, 3])))
console.log(prepend(1, prepend(2, null)))
console.log(nth(arrayToList([10, 20, 30]), 1))

function deepEqual(a, b) {
    if (typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
        let keysA = Object.keys(a)
        let keysB = Object.keys(b)
        if (keysA.length !== keysB.length) return false
        for (let key of keysA) {
            if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
                return false
            }
        }
        return true
    }
    return false
}

let obj = { here: { is: "an" }, object: 2 }
console.log(deepEqual(obj, obj))
console.log(deepEqual(obj, { here: 1, object: 2 }))
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }))

function flatten(arrays) {
    return arrays.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray)
    }, [] )
}


let arrays = [[1, 2, 3], [4, 5], [6, 7]]
console.log(flatten(arrays))

function loop(value, test, update, body) {
    for (let v = value; test(v ); v = update(v)) {
        body(v )
    }
}

loop(3, n => n > 0, n => n - 1, console.log)

const characterScript = (char) => {
    const scripts = [
        { name: "Latin", direction: "ltr", ranges: [[65, 90], [97, 122]] },
        { name: "Arabic", direction: "rtl", ranges: [[1536, 1791]] },
        { name: "Han", direction: "ttb", ranges: [[19968, 40959]] }
    ];

    const code = char.codePointAt(0)

    for (let script of scripts) {
        for (let [from, to] of script.ranges) {
            if (code >= from && code <= to) {
                return { name: script.name, direction: script.direction }
            }
        }
    }
    return null
};

function dominantDirection(text) {
    let directions = Array.from(text)
        .map(char => {
            const script = characterScript(char)
            return script
        })
        .filter(script => script !== null)
        .map(script => script.direction)

    let counts = { ltr: 0, rtl: 0, ttb: 0 }

    for (let direction of directions) {
        if (counts[direction] !== undefined) {
            counts[direction]++
        }
    }

    if (counts.rtl > counts.ltr && counts.rtl > counts.ttb) {
        return 'rtl'
    } else if (counts.ttb > counts.ltr && counts.ttb > counts.rtl) {
        return 'ttb'
    } else {
        return 'ltr'
    }
}

console.log(dominantDirection("Hello"))
console.log(dominantDirection("Hey, مساء الخير"))


class Vec {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y)
    }

    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)))
console.log(new Vec(1, 2).minus(new Vec(2, 3)))
console.log(new Vec(3, 4).length)


class Group {
    constructor() {
        this.members = [];
    }

    add(value) {
        if (!this.has(value)) {
            this.members.push(value )
        }
    }

    delete(value) {
        const index = this.members.indexOf(value )
        if (index !== -1) {
            this.members.splice(index, 1 )
        }
    }

    has(value) {
        return this.members.indexOf(value) !== -1;
    }

    static from(iterable) {
        let group = new Group( )
        for (let value of iterable) {
            group.add(value )
        }
        return group;
    }
    [Symbol.iterator]() {
        let index = 0;
        let members = this.members;

        return {
            next() {
                if (index < members.length) {
                    return { value: members[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

let group = Group.from([10, 20] )
console.log(group.has(10) )
console.log(group.has(30) )

group.add(10 )
group.delete(10 )
console.log(group.has(10) )

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value )
}