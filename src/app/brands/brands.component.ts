
import { Brand } from './../brand';
import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands:Brand[]=[];

  constructor(private _brandService:BrandService , public dialog: MatDialog){}

  ngOnInit(): void {
    // ~ Call getBrands() Function ~ //
    this.getBrands();
  }


  // ^ Declare getBrands() Function === Get All Brands -> A P I ^ //
  getBrands(){
    this._brandService.getBrands().subscribe({
      next: (res)=>{
        console.log(res);
        this.brands=res.data;

      }
    })
  }

  openDialog(id:string) {
    const dialogRef = this.dialog.open(ModalComponent);
    this._brandService.brandId=id;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
