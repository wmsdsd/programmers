function solution(numbers) {
	var answer = [];
	var save = -1

	numbers.sort((a, b) => a - b)

	while(numbers.length > 1) {
		let num = numbers.shift()

		if (num !== save ) {
			save = num

			for (let i = 0; i < numbers.length; i++) {
				answer.push(num + numbers[i])
			}
		}
	}

	return [...new Set(answer)].sort((a, b) => a-b);
}