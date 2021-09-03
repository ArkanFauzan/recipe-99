// capitalize first letter
const ucFirst = (text)=>{
    if(text==='') return '';
    let textLower = text.toLowerCase();
    let newText = textLower[0].toUpperCase()+ textLower.substring(1, textLower.length);

    return newText;
}

// capitalize word
const ucWords = (text)=>{
    if(text==='') return '';
    return text.split(' ').map(value=>{
                const textLower = value.toLowerCase();
                const text0 = value[0].toUpperCase();
                return `${text0}${textLower.substring(1, textLower.length)}`
            }).join(' ')
}

// make url slug
const slug = (text)=>{
    if(text==='') return '';
    return text.toLowerCase().replace(/\s/g,'-')
}

module.exports = {
    ucFirst, ucWords, slug
}