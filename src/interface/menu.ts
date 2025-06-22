export interface Menu {
  id: number
  name: string
  menuItems: MenuItem[]
  companyId: number

}

export interface MenuItem {
  id: number,
  name: string,
  description: string,
  price: number
  active: boolean
}