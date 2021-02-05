import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';
import { ApiService } from 'src/app/_shared/services/api.service';
import { UtilsService } from 'src/app/_shared/services/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipementComponent implements OnInit {
  info: any;
  isLoadingEquipments = false;
  isGetingMileageAdjustment = false;
  vehicle: any;
  mileages: any;
  adjustment = 0
  equipments = [];
  trade = 0;
  market = 0;

  @ViewChild('equipmentsEl', { static: false }) equipmentsEl!: any;

  constructor(
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.info = JSON.parse(this.activatedRoute.snapshot.params["info"]);
    this.getVehicles();
    console.log('info: ', this.info);
  }

  // open about popup
  openAbout() {
    this.utilService.openAbout();
  }

  // get vehicles by gid and vin
  getVehicles() {
    const { api, apiKey } = environment;
    this.isLoadingEquipments = true;
    this.apiService.getRequest(api + "/vehicle/" + this.info?.style?.gid + "/" + this.info?.style?.generatedVin + "?apiKey=" + apiKey).subscribe(
      (vehicle: any) => {
        console.log('vehicle: ', vehicle);
        this.isLoadingEquipments = false;
        this.vehicle = vehicle;
        this.vehicle.vacs = this.initVacsSelected(this.vehicle?.vacs);
      }, (error: HttpErrorResponse) => {
        console.error(error);
        this.isLoadingEquipments = false;
      }
    );
  }

  // equipment change event
  onEquipmentSelect(e: any) {
    console.log('event ===> ', encodeURI);
    const eventItem = e?.option?.value;
    const eventId = eventItem?.id;
    
    this.vehicle.vacs[eventId].selected = !this.vehicle?.vacs[eventId]?.selected;
    eventItem?.mutex?.map((item: any) => {
      this.vehicle.vacs[item].selected = false;
    });

    // this.equipments = this.equipmentsEl?.selectedOptions?.selected?.map((equipment: any) => {
    //   return equipment.value;
    // });

    this.equipments = this.vehicle?.vacs?.filter((equipment: any) => equipment?.selected === true);

    console.log("equipments: ", this.equipments);
  }

  // add selected field to vehicle vacs array
  initVacsSelected(vacs: any) {
    return vacs?.map((equipment: any) => {
      return {
        ...equipment,
        selected: false
      }
    });
  }

  nextStep() {
    if (!this.mileages) {
      this.showAlertModal();
    } else {
      console.log("mileages: ", this.mileages);
      const info = {
        year: this.vehicle?.year,
        make: this.vehicle?.make,
        model: this.vehicle?.model,
        style: this.vehicle?.style,
        gid: this.info?.style?.gid,
        includes: this.vehicle?.includes,
        mileage: this.mileages,
        add_deducts: this.vehicle?.book,
        equipments: this.equipments,
        trade: this.vehicle?.trade,
        market: this.vehicle?.market,
        mileages: this.mileages
      };
      this.router.navigate(["/show-details", JSON.stringify(info)]);
    }
  }

  // show the modal for the mileage required
  showAlertModal() {
    this.matDialog.open(
      ShowMessageComponent,
      {
        data: {
          buttons: [
            {
              type: "ok",
              text: "OK",
              color: "primary"
            }
          ]
        }
      }
    );
  }

  // goto first page to start again
  startOver() {
    this.router.navigateByUrl("/year-make");
  }

  blur(event: any) {
    event.target.blur();
  }
}
