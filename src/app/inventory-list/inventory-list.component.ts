import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AppCommonServiceService, InventoryData } from '../app-common-service.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModelDialogComponent } from '../common-model-dialog/common-model-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonAlertMessageComponent } from '../common-alert-message/common-alert-message.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit  {

  displayedColumns: string[] = ['ID', 'ItemName', 'ItemDesc', 'ItemQty', 'ItemPrice', 'ItemFile', 'Action'];
  dataSource!: InventoryData[];
  show = false;
  isDataLoading = true;
  inventoryItemImagePath! : string;

  constructor(
    private apiService: AppCommonServiceService, 
    public dialog: MatDialog, 
    private router: Router,
    private _snackBar: MatSnackBar) {   
  }

  ngOnInit(): void {
    this.show = true;
    this.inventoryItemImagePath = this.apiService.getInventoryItemUploadPath();
    this.loadInventoryList();
  }

  loadInventoryList() {
    this.apiService.getInventoryList().subscribe((data:any) => {
      this.dataSource = this.processInventoryImageData(data);
      this.isDataLoading = false;
    }, error => {
      this.isDataLoading = false;
    }); 
  }

  processInventoryImageData(data: any) {
    for (const itm of data) {
      let imgName = itm.ItemFile;
      if(imgName) {
        itm.ItemFile = this.apiService.getInventoryItemUploadPath() + imgName;
      } else {
        itm.ItemFile = this.apiService.getDefaultInventoryItemUploadPath();
      }
    }
    return data;
  }

  viewInventory(ID:string) {
    this.apiService.getInventoryItem(ID).subscribe((responseData:any) => {
      const dialogRef = this.dialog.open(CommonModelDialogComponent, {
        maxWidth: "300px",
        data: responseData
      });
    });
  }

  editInventory(ID:string) {
    this.router.navigate(['./inventoryMaster'], { queryParams: { itemID: ID}});
  }

  deleteInventory(ID:string) {
    const message = `Are you sure you want to delete this inventory item?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "300px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult) {
        this.apiService.deleteInventory(ID).subscribe((data:any) => {
          if(data.status == 200) {
            this._snackBar.openFromComponent(CommonAlertMessageComponent, {
              data: "Inventory Deleted Successfull.",
              duration: 5000
            });
            this.loadInventoryList();
          }
        });
      }
    });
  }
}
