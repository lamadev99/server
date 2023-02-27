
export const timeCount = (content)=>{
    let words = content?.trim().split(/\s+/).length
    const time = Math.ceil(words/156)
    return time;
}