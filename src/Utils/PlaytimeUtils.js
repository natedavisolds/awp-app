export const findPlaytimeIn = (playtimes=[], id) => {
  return Object.values(playtimes).find(playtime => playtime.id === id)
}

export const filterPlaytimes = (playtimes, associatedWith={}) => {
  return Object.values(associatedWith).map((associate) => {
    return associate["playtimeId"]
  }).map((id) => {
    return (id !== undefined ? findPlaytimeIn(playtimes,id) : undefined)
  }).filter(playtime => (playtime !== undefined))
}
