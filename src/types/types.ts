export interface Props {
  title: string,
  items: City[]
}
export interface City extends Props {
  items: [],
  code: string,
  name: string
}
