export const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t
export const randomArbitrary = (min, max) => Math.random() * (max - min) + min
export const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
