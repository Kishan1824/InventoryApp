import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppCommonServiceService } from '../app-common-service.service';

@Component({
  selector: 'app-common-model-dialog',
  templateUrl: './common-model-dialog.component.html',
  styleUrls: ['./common-model-dialog.component.css']
})
export class CommonModelDialogComponent implements OnInit {

  modelData: any;
  itemImage!: string;

  constructor(
    private apiService: AppCommonServiceService, 
    public dialogRef: MatDialogRef<CommonModelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.modelData = data;
      this.itemImage = this.apiService.getInventoryItemUploadPath() + this.modelData.ItemFile;
    }

  ngOnInit(): void {
  }

}
