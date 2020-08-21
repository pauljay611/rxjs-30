function createWinnerTable() {
	const list = []

	for (let i = 1, j = 1; i < 4; i++, j += 3) {
		const vertical = [i, i + 3, i + 6]
		const horizontal = [j, j + 1, j + 2]
		list.push(vertical.join(''))
		list.push(horizontal.join(''))
	}

	list.push('159', '357')

	const winTable = new Array(9)

	for (let i = 0; i < 9; i++) {
		winTable[i] = list
			.filter((item) => item.includes(String(i + 1)))
			.map((f) => f.split('').filter((w) => w !== String(i + 1)))
	}

	return winTable
}

export default function checkWinner(index, blockList, player) {
	const winnerList = createWinnerTable()
	for (let i = 0; i < winnerList[index].length; i++) {
		const hasLine = winnerList[index][i].every((n) => {
			return blockList[n - 1] === player
		})
		if (hasLine) return true
	}
	return false
}
