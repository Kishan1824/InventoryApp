import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-common-alert-message',
  templateUrl: './common-alert-message.component.html',
  styleUrls: ['./common-alert-message.component.css']
})
export class CommonAlertMessageComponent implements OnInit {

  alertMsg!: string;

  constructor(
    public snackRef: MatSnackBarRef<CommonAlertMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { 
      this.alertMsg = data;
    }

  ngOnInit(): void {
  }

}
