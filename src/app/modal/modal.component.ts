import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { BrandService } from '../brand.service';
import { Brand } from '../brand';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  brandID:string="";
  data:Brand= {} as Brand ;

  ngOnInit(): void {
    // this._brandService.brandId.subscribe({
    //   next:(data)=>{
    //     this.brandID=data;
    //   }app
    // })

    this.brandID=this._brandService.brandId;
    this.getSpecificBrand(this.brandID);
  }

  constructor(private _brandService:BrandService) {}

  getSpecificBrand(id:string){
    this._brandService.getSpecificBrand(id).subscribe({

      next: (res)=>{
        console.log(res);
        this.data=res.data;
      }

    })


  }

}
