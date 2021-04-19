export default function removeCommaEnding(str) {
    const lastIndex = str.length - 1
    if (str[lastIndex] === `,`) {
        return str.slice(0, lastIndex)
    } 
    return str
}