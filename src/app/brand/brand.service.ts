import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Brand} from "../model/brand";
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private brandUrl = environment.API_URL + '/api/brand';
  private brandsSubject: ReplaySubject<Brand[]> = new ReplaySubject<Brand[]>(1);
  selectedBrandSubject: ReplaySubject<Brand> = new ReplaySubject<Brand>(1);

  brands: Brand[];


  constructor(
    private http: HttpClient
  ) {
    this.init();
  }

  private init() {
    this.http.get<Brand[]>(this.brandUrl)
      .subscribe(brand => {
        this.brands = brand;
        this.brandsSubject.next(this.brands);
      });
  }

  setSelectedBrand(selectedBrand: Brand){
    this.selectedBrandSubject.next(selectedBrand);
  }

  getBrandsSubject(){
    return this.brandsSubject;
  }
}
