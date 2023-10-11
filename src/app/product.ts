export interface Product {
  imageCover:string,
  images:string[],
  title:string,
  ratingsAverage:number,
  price:number,
  id:string,
  description?:string,
  category:Category
}


interface Category{
  name:string
}
