import { Product } from './product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // this will return all products includes a searchKey
  transform(products: Product[], searchKey:string): Product[] {
    return products.filter((element)=>element.title.toLowerCase().includes(searchKey.toLowerCase()));
}

}
