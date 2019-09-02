const sum = (A, B) => {
  let max = A.length > B.length ? A.length : B.length
  let arr = []
  const reverseA = A.split('').reverse()
  const reverseB = B.split('').reverse()
  let alpha = 0
  for (let i = 0; i < max; i++) {
    const aValue = i < reverseA.length ? reverseA[i] * 1 : 0
    const bValue = i < reverseB.length ? reverseB[i] * 1 : 0
    const value = (aValue + bValue + alpha) % 10
    arr.unshift(value)
    alpha = Math.floor((aValue + bValue + alpha) / 10)
  }
  if (alpha !== 0) arr.unshift(alpha)

  return arr.reduce((p, v) => p + v, '')
}

const convertLineKoreanToNum = (input) => {
  let arr = Array.apply(null, new Array(16)).map(Number.prototype.valueOf, 0)
  let obj = {
    i: 0,
    unit: 0,
    arr: arr
  }
  const reverseInput = input.split('').reverse()
  reverseInput.reduce((p, v) => {
    calCharacter[v].bind(obj)()
    return null
  }, '')
  return obj.arr.reduceRight((p, v) => p + v, '').replace(/(^0+)/, '')
}

const calCharacter = {
  '일': function () {
    this.arr[this.i + this.unit] = 1
  },
  '이': function () {
    this.arr[this.i + this.unit] = 2
  },
  '삼': function () {
    this.arr[this.i + this.unit] = 3
  },
  '사': function () {
    this.arr[this.i + this.unit] = 4
  },
  '오': function () {
    this.arr[this.i + this.unit] = 5
  },
  '육': function () {
    this.arr[this.i + this.unit] = 6
  },
  '칠': function () {
    this.arr[this.i + this.unit] = 7
  },
  '팔': function () {
    this.arr[this.i + this.unit] = 8
  },
  '구': function () {
    this.arr[this.i + this.unit] = 9
  },
  '십': function () {
    this.i = 1
  },
  '백': function () {
    this.i = 2
  },
  '천': function () {
    this.i = 3
  },
  '만': function () {
    this.unit = 4
    this.i = 0
  },
  '억': function () {
    this.unit = 8
    this.i = 0
  },
  '조': function () {
    this.unit = 12
    this.i = 0
  }
}

const rebuildKorean = (input) => {
  let inputArr = input.split('')
  let findUnitChar = ['만', '억', '조']
  let findNumChar = ['십', '백', '천']
  let findChar = [...findUnitChar, ...findNumChar]
  let result = inputArr.reduceRight((p, v, i) => {
    return (findChar.includes(p.substring(0, 1)) && findChar.includes(v)) && !(findUnitChar.includes(p.substring(0, 1)) && findNumChar.includes(v))
      ? v + '일' + p : v + p
  }, ' ')
  result = findChar.includes(result.substring(0, 1)) ? '일' + result : result
  return result.trim()
}

require('readline')
  .createInterface(process.stdin, process.stdout)
  .on('line', function (line) {
    const next = line.trim().split(' ')
    let first = convertLineKoreanToNum(rebuildKorean(next[0]))
    let second = convertLineKoreanToNum(rebuildKorean(next[1]))
    const result = sum(first, second)
    console.log(result)
  })
