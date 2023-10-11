export interface CartDetails {
  numOfCartItems:string,
  data:Data
}

interface Data{
  totalCartPrice:number,
  _id:string,
  products:Product[]
}

interface Product{
  count:number,
  price:number,
  product:innerProduct
}

interface innerProduct{
  title:string,
  imageCover:string,
  id:string,
  category:Category
}

interface Category{
  name:string
}

