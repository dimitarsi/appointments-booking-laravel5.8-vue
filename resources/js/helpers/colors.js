export function toHex(num, res = []) {
  const vals = { 10:'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f' };
  if(num == 0 && !res.length) return '00';
  if(num == 0) return res.map(n => {
    return vals[n] ? vals[n] : n
  });
  return toHex(Math.floor(num / 16), [num % 16, ...res]);
}

window.toHex = toHex;

export function hexToDec(num) {
    const base = 16;
    const vals = { a:10, b:11, c:12, d:13, e:14, f:15 };
    const totalLeng = num.length;
    return num.split('').reduce((memo, num, ind) => {
        const val = vals[num.toLowerCase()] ? vals[num.toLowerCase()] : parseFloat(num);
        return memo + val * Math.pow(base, totalLeng - ind - 1);
    }, 0);
}

export function hexToRgb(hex) {
    const x = hex.slice(1);
    // const xx = x.length == 3 ? `${x[0]}${x[0]}${x[1]}${x[1]}${x[2]}${x[2]}` : x;
    // console.log(xx, xx.split(/(..)/))
    const xx = x.length == 3 ? [`${x[0]}${x[0]}`, `${x[1]}${x[1]}`, `${x[2]}${x[2]}` ] :
                               [`${x[0]}${x[1]}`, `${x[2]}${x[3]}`, `${x[4]}${x[5]}` ]
    return xx.map(hexToDec);
}