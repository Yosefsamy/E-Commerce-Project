export interface WishList {
  count:number,
  data:Data[]
}

interface Data{
  title:string,
  price:number,
  imageCover:string,
  _id:string
}

