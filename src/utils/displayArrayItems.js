export default function displayArrayItems(myArray = []) {
    if (myArray.length === 0) {
        return ''
    } 
    const indexMax = myArray.length - 1
    if (indexMax === 0) {
        return myArray[0]
    }

    let result = ''
    
    myArray.forEach((item, index) => {
        if (index === 0) {
            result += item
        }
        if (index !== 0 && index !== indexMax) {
            result += `, ${item}`
        }
        if (index === indexMax) {
            result += ` et ${item}`
        }
    })
    return result
}
