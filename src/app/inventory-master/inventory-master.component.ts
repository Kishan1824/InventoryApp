import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCommonServiceService, InventoryData } from '../app-common-service.service';
import { Router, ActivatedRoute  } from '@angular/router';
import {  } from 'rxjs/add/operator/filter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonAlertMessageComponent } from '../common-alert-message/common-alert-message.component';

@Component({
  selector: 'app-inventory-master',
  templateUrl: './inventory-master.component.html',
  styleUrls: ['./inventory-master.component.css']
})
export class InventoryMasterComponent implements OnInit {

  inventoryMaster!: FormGroup;
  itemId!: string;
  formTitle!: string;
  fileAttr = 'Choose File';
  itemImageSrc!: string;
  itemFile: any = null;
  
  constructor(
    private apiService: AppCommonServiceService, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {
      this.itemId = "";
    }

  ngOnInit(): void {
    this.initalizeForm();
    this.activeRoute.queryParams.subscribe(params => {
      if (params['itemID']) {
        this.itemId = params.itemID;    
      }
    });
    if (typeof this.itemId != undefined && this.itemId != "") {
      this.bindFormOnEdit(this.itemId);
      this.formTitle = "Update Inventory Item";
    } else { 
      this.formTitle = "Add Inventory Item";
    }
  }

  initalizeForm() {
    this.inventoryMaster = new FormGroup({
      ID: new FormControl(0),
      ItemName: new FormControl('', [Validators.required]),
      ItemDesc: new FormControl(),
      ItemQty: new FormControl('', [Validators.required]),
      ItemPrice: new FormControl('', [Validators.required]),
      ItemFile: new FormControl()
    });
  }

  bindFormOnEdit(ID: string) {
    this.apiService.getInventoryItem(ID).subscribe((responseData:any) => {
      this.inventoryMaster.setValue(responseData);
      if (responseData.ItemFile) {
        this.itemImageSrc = this.apiService.getInventoryItemUploadPath() + responseData.ItemFile;
      } else {
        this.itemImageSrc = this.apiService.getDefaultInventoryItemUploadPath();
      }
      this.fileAttr = responseData.ItemFile;
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.itemFile = null;

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.fileAttr = file.name;

      reader.onload = () => {
    
        this.itemImageSrc = reader.result as string;
        this.itemFile = file;

        this.inventoryMaster.patchValue({
          ItemFile: file.name
        });
        
      };    
    }
  }

  /* Handle form errors */
  public errorHandling = (control: string, error: string) => {
    return this.inventoryMaster.controls[control].hasError(error);
  }

  addUpdateInventory(form: FormGroup) {
    const postData = JSON.stringify(form.value);
    const formData = new FormData();
    formData.append('data', postData);

    if(this.itemFile != null) {
      formData.append('file', this.itemFile, this.itemFile.name);
    }

    if (form.value.ID == 0) {
      this.apiService.addInventory(formData).subscribe((data:any) => {
        if (data.status == 200) {
          this._snackBar.openFromComponent(CommonAlertMessageComponent, {
            data: "Inventory Saved Successfull.",
            duration: 5000
          });
          this.router.navigate(['./inventoryList']);
        }
      });
    } else {
      this.apiService.updateInventory(formData).subscribe((data:any) => {
        if (data.status == 200) {
          this._snackBar.openFromComponent(CommonAlertMessageComponent, {
            data: "Inventory Updated Successfull.",
            duration: 5000
          });
          this.router.navigate(['./inventoryList']);
        }
      });
    }
  }
}

