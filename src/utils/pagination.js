export function pagesGenerate(current, total) {
    const delta = 2
    const currentPage = Number(current) || 1
    const range = []
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(total - 1, currentPage + delta); i++) {
        range.push(i)
    }
    if (range[0] > 2) range.unshift('...')
    if (range[range.length - 1] < total - 1) range.push('...')
    range.unshift(1)
    if (total > 1) range.push(total)
    return range
}
