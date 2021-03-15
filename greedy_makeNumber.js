function solution(n, k) {
    let stack = []

    for (let i = 0; i < n.length; i++) {
        let num = n[i]

        while (stack.length != 0 && stack[stack.length-1] < num && k-- > 0) {
            stack.pop()
        }

        stack.push(num)
    }

    return stack.slice(0, n.length - k).join('')
}

console.log(solution("1924", 2))