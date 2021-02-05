import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipementComponent } from './dealer/equipement/equipment.component';
import { ModelAndStyleComponent } from './dealer/model-and-style/model-and-style.component';
import { ShowDetailsComponent } from './dealer/show-details/show-details.component';
import { YearAndMakeComponent } from './dealer/year-and-make/year-and-make.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "year-make"
  },
  {
    path: "year-make",
    component: YearAndMakeComponent
  },
  {
    path: "model-style/:info",
    component: ModelAndStyleComponent
  },
  {
    path: "equipment/:info",
    component: EquipementComponent
  },
  {
    path: "show-details/:info",
    component: ShowDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
