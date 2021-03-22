// 지형이동
//
// 문제 설명
//     N x N 크기인 정사각 격자 형태의 지형이 있습니다. 각 격자 칸은 1 x 1 크기이며, 숫자가 하나씩 적혀있습니다. 격자 칸에 적힌 숫자는 그 칸의 높이를 나타냅니다.
//     이 지형의 아무 칸에서나 출발해 모든 칸을 방문하는 탐험을 떠나려 합니다. 칸을 이동할 때는 상, 하, 좌, 우로 한 칸씩 이동할 수 있는데, 현재 칸과 이동하려는 칸의 높이 차가 height 이하여야 합니다. 높이 차가 height 보다 많이 나는 경우에는 사다리를 설치해서 이동할 수 있습니다. 이때, 사다리를 설치하는데 두 격자 칸의 높이차만큼 비용이 듭니다. 따라서, 최대한 적은 비용이 들도록 사다리를 설치해서 모든 칸으로 이동 가능하도록 해야 합니다. 설치할 수 있는 사다리 개수에 제한은 없으며, 설치한 사다리는 철거하지 않습니다.
//     각 격자칸의 높이가 담긴 2차원 배열 land와 이동 가능한 최대 높이차 height가 매개변수로 주어질 때, 모든 칸을 방문하기 위해 필요한 사다리 설치 비용의 최솟값을 return 하도록 solution 함수를 완성해주세요.
//
// 제한사항
//     land는 N x N크기인 2차원 배열입니다.
//     land의 최소 크기는 4 x 4, 최대 크기는 300 x 300입니다.
//     land의 원소는 각 격자 칸의 높이를 나타냅니다.
//     격자 칸의 높이는 1 이상 10,000 이하인 자연수입니다.
//     height는 1 이상 10,000 이하인 자연수입니다.

// 입출력 예
//  land	                                                                height	result
//  [[1, 4, 8, 10], [5, 5, 5, 5], [10, 10, 10, 10], [10, 10, 10, 20]]	    3	    15
//  [[10, 11, 10, 11], [2, 21, 20, 10], [1, 20, 21, 11], [2, 1, 2, 1]]	    1	    18


function solution(land, height) {
    let answer  = 0
    let size    = land.length
    let total    = size * size
    let section = Array.from(Array(size), () => Array(size).fill(-1))
    let my      = [1, -1, 0, 0]
    let mx      = [0, 0, 1, -1]
    let divide  = []
    let ladders = {}

    let sectionNum = 0
    for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
            if (section[col][row] < 0) {
                section[col][row] = sectionNum

                let queue = [[col, row]]
                let queueIndex = 0

                while(queueIndex < queue.length) {
                    let [y, x] = queue[queueIndex]
                    let value = land[y][x]

                    for (let i = 0; i < 4; i++) {
                        let ny = (y + my[i])
                        let nx = (x + mx[i])

                        if (locationCheck(nx, ny, size-1) || section[ny][nx] >= 0) continue

                        let nv = land[ny][nx]
                        let diff = Math.abs(value - nv)

                        if (diff <= height) {
                            queue.push([ny, nx])
                            section[ny][nx] = sectionNum
                        }
                    }
                    queueIndex++
                }
                divide.push(queue)
                sectionNum++
            }
        }
    }


    divide.forEach((area, idx) => {
        ladders[idx] = {}
        area.forEach(([y, x], index) => {
            for (let i = 0; i < 4; i++) {
                let ny = y + my[i]
                let nx = x + mx[i]

                if (locationCheck(nx, ny, size-1)) continue
                if (section[ny][nx] === idx) continue

                let cost = Math.abs(land[y][x] - land[ny][nx])
                let from = idx < section[ny][nx] ? idx : section[ny][nx]
                let to = idx > section[ny][nx] ? idx : section[ny][nx]

                if (!ladders[from][to] || cost < ladders[from][to]) {
                    ladders[from][to] = cost
                }
            }
        })
    })

    let ladderList = []
    for (let from in ladders) {
        for (let to in ladders[from]) {
            ladderList.push([parseInt(from), parseInt(to), ladders[from][to]])
        }
    }

    ladderList.sort((a, b) => a[2] - b[2])

    let kruskal = []
    let bridge = []
    for (let i = 0; i <= ladderList.length; i++) {
        kruskal[i] = i
    }

    let find = (n) => {
        if (kruskal[n] === n) return n

        return kruskal[n] = find(kruskal[n])
    }

    let merge = (a, b) => {
        kruskal[find(a)] = kruskal[b]
    }

    ladderList.forEach(([f, t, v], index) => {
        if (find(f) === find(t)) return true

        answer += v
        merge(f, t)
    })

    return answer
}

function locationCheck(x, y, boundary) {
    return x < 0 || y < 0 || x > boundary || y > boundary
}


let tkx1 = [[1, 4, 8, 10], [5, 5, 5, 5], [10, 10, 10, 10], [10, 10, 10, 20]]
let tky1 = 3
let tkx2 = [[10, 11, 10, 11], [2, 21, 20, 10], [1, 20, 21, 11], [2, 1, 2, 1]]
let tky2 = 1

console.log(solution(tkx1, tky1))
// console.log(solution(tkx2, tky2))
