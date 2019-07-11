const laterThan = (candidate, comparedTo) => {
    return Date.parse(candidate) >= comparedTo 
  }

const earlierThan = (candidate, comparedTo) => {
    return Date.parse(candidate) < comparedTo 
}

export default {
    laterThan,
    earlierThan
}
