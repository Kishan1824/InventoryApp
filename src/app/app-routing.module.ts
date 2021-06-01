import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryMasterComponent } from './inventory-master/inventory-master.component';

const routes: Routes = [
  { path: '', redirectTo: 'inventoryList', pathMatch: 'full'},
  { path: 'inventoryList', component: InventoryListComponent },
  { path: 'inventoryMaster', component: InventoryMasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
