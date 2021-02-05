import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_shared/services/api.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-year-and-make',
  templateUrl: './year-and-make.component.html',
  styleUrls: ['./year-and-make.component.scss']
})
export class YearAndMakeComponent implements OnInit {
  @ViewChild('yearsEl', { static: false }) yearsEl!: any;
  @ViewChild('makesEl', { static: false }) makesEl!: any;

  years: any;
  makes: any;

  year: any;
  make: any;

  isLoadingYears: any = false;
  isLoadingMakes: any = false;
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private utilService: UtilsService
  ) { }

  ngOnInit(): void {
    this.getYears();
  }

  // get all available years
  getYears() {
    const { api, apiKey } = environment;
    this.isLoadingYears = true;
    this.apiService.getRequest(api + "/years?apiKey=" + apiKey).subscribe(
      (years: any) => {
        this.years = years?.filter((year: any) => Number(year?.year) >= 2000)?.map((year: any) => {
          return year.year;
        });
        this.isLoadingYears = false;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.isLoadingYears = false;
      }
    );
  }

  // get all available makes and makes for the specific year
  getMakes(year: any) {
    const { api, apiKey } = environment;
    let url = api + "/makes?apiKey=" + apiKey;
    if (year) {
      url = api + "/makes" + "/byYear/" + year + "?apiKey=" + apiKey;
    }
    this.isLoadingMakes = true;
    this.apiService.getRequest(url).subscribe(
      (makes: any) => {
        this.makes = makes?.map((make: any) => {
          return make.make;
        });
        this.isLoadingMakes = false;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.isLoadingMakes = false;
      }
    );
  }
 
  // years list change event
  onYearChange() {
    this.year = this.yearsEl?.selectedOptions?.selected[0]?.value;
    this.getMakes(this.year);
    this.make = false;
    console.log('year changed', this.year);
  }

  // makes list change event
  onMakeChange() {
    this.make = this.makesEl?.selectedOptions?.selected[0]?.value
    console.log('make changed', this.make);
    this.nextStep();
  }

  // "Start over" button event
  nextStep() {
    console.log('next step');
    this.router.navigate(["/model-style", JSON.stringify({ year: this.year, make: this.make }) ]);
  }

  // open about popup
  openAbout() {
    this.utilService.openAbout();
  }
}
