// 소수 찾기

// 문제 설명
// 한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.
//
//     각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.
//
//     제한사항
//      numbers는 길이 1 이상 7 이하인 문자열입니다.
//      numbers는 0~9까지 숫자만으로 이루어져 있습니다.
//      "013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.

//     입출력 예
//  numbers	return
//  "17"	3
//  "011"	2

function solution(numbers) {
    let answer = []
    let list = [...numbers]

    let permutation = (arr, i) => {
        let result = []

        if (i === 0) return arr

        arr.forEach((v,idx,arr) => {
            const fixer = v;
            const restArr = arr.filter((val, index)=> index !== idx);
            const permuArr = permutation(restArr, i-1);
            const combineFixer = permuArr.map((v)=> fixer + v);
            result.push(...combineFixer);
        })

        return result
    }

    let isPrime = (n) => {
        if (n <= 1) return false
        if (n === 2 || n === 3) return true
        if (n % 2 === 0) return false

        let divisor = 3;
        let limit = Math.sqrt(n);

        while (limit >= divisor) {
            if (n % divisor === 0) return false

            divisor += 2;
        }

        return true
    }

    list.forEach((e, i, num) => {
        permutation(num, i).forEach( v => {
            isPrime(parseInt(v)) ? answer.push(parseInt(v)) : answer
        })
    })

    return [...new Set(answer)].length
}