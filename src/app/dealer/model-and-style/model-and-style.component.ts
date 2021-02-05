import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_shared/services/api.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-model-and-style',
  templateUrl: './model-and-style.component.html',
  styleUrls: ['./model-and-style.component.scss']
})
export class ModelAndStyleComponent implements OnInit {
  @ViewChild('modelsEl', { static: false }) modelsEl!: any;
  @ViewChild('stylesEl', { static: false }) stylesEl!: any;

  year: any;
  make: any;

  models: any;
  styles: any;

  model: any;
  style: any;

  isLoadingModels = false;
  isLoadingStyles = false;
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService
  ) { }

  ngOnInit(): void {
    const { year, make } = JSON.parse(this.activatedRoute.snapshot.params["info"]);
    this.year = year;    
    this.make = make;    
    this.getModels();
  }

  
  // get available models by year and make
  getModels() {
    const { api, apiKey } = environment;
    this.isLoadingModels = true;
    this.apiService.getRequest(api + "/models/" + this.year + "/" + this.make + "?apiKey=" + apiKey).subscribe(
      (models: any) => {
        this.models = models?.map((model: any) => {
          return model.model;
        });
        this.isLoadingModels = false;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.isLoadingModels = false;
      }
    );
  }

  // get available styles by year and make
  getStyles() {
    const { api, apiKey } = environment;
    this.isLoadingStyles = true;
    this.apiService.getRequest(api + "/styles/" + this.year + "/" + this.make + "/" + this.model + "?apiKey=" + apiKey).subscribe(
      (styles: any) => {
        console.log('styles : ', styles);
        this.styles = styles;
        this.isLoadingStyles = false;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.isLoadingStyles = false;
      }
    );
  }
 
  // models list change event
  onModelChange() {
    this.model = this.modelsEl?.selectedOptions?.selected[0]?.value;
    this.getStyles();
    this.style = false;
    console.log('year changed', this.model);
  }

  // styles list change event
  onStyleChange() {
    this.style = this.stylesEl?.selectedOptions?.selected[0]?.value
    console.log('make changed', this.style);
    this.nextStep();
  }

  // "Start over" button event
  nextStep() {
    const info = { year: this.year, make: this.make, model: this.model, style: this.style };
    this.router.navigate(["/equipment", JSON.stringify(info)]);
  }

  // open about popup
  openAbout() {
    this.utilService.openAbout();
  }

  // goto first page to start again
  startOver() {
    this.router.navigateByUrl("/year-make");
  }
}
