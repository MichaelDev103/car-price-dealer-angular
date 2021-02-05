import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_shared/services/api.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  info: any;
  isGetingMileageAdjustment = false;
  adjustment = 0;
  trade = 0;
  market = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.info = JSON.parse(this.activatedRoute.snapshot.params["info"]);
    console.log('step 4 info ===> ', this.info);
    
    this.getMileageAdjustment();
  }

  // open about popup
  openAbout() {
    this.utilService.openAbout();
  }

  // print details
  print(): void {
    window.print();
  }

  // goto first page to start again
  startOver() {
    this.router.navigateByUrl("/year-make");
  }

  // get adjustment by mileage
  getMileageAdjustment() {
    console.log('getMileageAdjustment!');
    if (this.info?.mileages) {
      this.isGetingMileageAdjustment = true;
      const { api, apiKey } = environment;
      this.apiService.getRequest(api + "/vehicle/" + this.info?.gid + "/mileage/" + this.info.mileages + "?apiKey=" + apiKey).subscribe(
        (res: any) => {
          this.adjustment = res?.adjustment;
          console.log('adjustment ===> ', this.adjustment);
          
          this.adjustPrices();
        }, (error: HttpErrorResponse) => {
          console.error(error);
          this.isGetingMileageAdjustment = false;
        }
      );
    }
  }

  // adjust the trade and market price
  adjustPrices() {
    this.trade = this.info?.trade + this.adjustment;
    this.market = this.info?.market + this.adjustment;
    console.log(this.trade);
    console.log(this.market);
    
    this.info?.equipments?.map((equipment: any) => {
      this.trade += equipment?.amt;
      this.market += equipment?.amt;
    });

    if (this.info?.trade === 0 && this.info?.trade === 0) {
      this.trade = 0;
      this.market = 0;
    } else {
      if (this.trade < 100) this.trade = 100;
      if (this.market < 100) this.market = 100;
    }
    
    this.isGetingMileageAdjustment = false;
  }
}
