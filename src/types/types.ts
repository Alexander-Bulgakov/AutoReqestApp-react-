
export interface Props {
  title: string,
  items: City[]
}

export interface City {
  code: string,
  name: string
}

export interface Request {
  id: string,
  items: City[]
}
export interface Auto {
  id: number,
  name: string
}
export interface AutoDict {
  "LADA": Auto[],
  "VOLKSWAGEN": Auto[],
  "KIA": Auto[]
}
export interface AutoItems {
  key: string 
}
export interface AutoReq {
  id: "DICT_AUTO",
  items: AutoItems[]
}

