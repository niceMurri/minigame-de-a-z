export const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]

export const randomLetters = () => {
    const lettersArray = [];

    for (let i = 0; i < 6; i++) {
        lettersArray.push(letters[Math.floor(Math.random() * letters.length)].toUpperCase())
    }

    return lettersArray;
}