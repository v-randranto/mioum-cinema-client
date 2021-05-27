const pattern = /^(a\s|à\sla\s|aux\s|ce\s|ces\s|cet\s|cette\s|de\s|des\s|du\s|de la\s|l'|la\s|le\s|les\s|the\s|this\s|that\s|these\s|un\s|une\s)/i

const articleExtract = (str) => {
  let newStr = str.toLowerCase()
  const matchArray = newStr.match(pattern)  
  if (matchArray) {
   newStr = newStr.replace(matchArray[0], '')
  }
  return newStr
}

export const toTitleCase = (value) =>{
    return value.toLowerCase().replace(/(?:^|\s|\/|-)\w/g, (match) => {
      return match.toUpperCase()
    })
  }

export const shortenTitle = (value) => {
  value = articleExtract(value)
  if (value.length > 15) {
    value = value.substring(0, Math.min(value.length, 15)) + '...'
  }
  return toTitleCase(value);
}











