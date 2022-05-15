import { Component, OnInit } from '@angular/core';
import {BrandService} from "../brand.service";
import {Subscription} from "rxjs";
import {Brand} from "../../model/brand";
import {Router} from "@angular/router";


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brandSubscription : Subscription;
  brands: Brand[];

  constructor(
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandSubscription = this.brandService.getBrandsSubject()
      .subscribe(brands => {
        this.brands = brands;
        console.log(brands);
      })
  }

  onBrandSelect(brand : Brand){
    this.brandService.setSelectedBrand(brand);
    this.router.navigate(['/item']);
  }

  ngOnDestroy(){
    this.brandSubscription.unsubscribe();
  }
}
