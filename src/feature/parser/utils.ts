export const wait = ( response: unknown, sec: number = 3000,) => {
  return new Promise((res, _) => {
    setTimeout(() => {
      res(response)
    }, sec)
  })
}
