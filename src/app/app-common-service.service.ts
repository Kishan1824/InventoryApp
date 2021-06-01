import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface InventoryData {
  ID: number;
  ItemName: string;
  ItemDesc: string;
  ItemQty: number;
  ItemPrice: number;
  ItemFile: string;
  Action: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppCommonServiceService {

  private inventoryAPI = "https://localhost:44345/api/inventoryApp/";
  private inventoryAPIUpload = "https://localhost:44345/InventoryItemUpload/";
  private defaultInventoryUpload = this.inventoryAPIUpload + "defaultUpload.png";

  constructor(private httpClient: HttpClient) { }

    public getInventoryItemUploadPath() {
      return this.inventoryAPIUpload;
    }

    public getDefaultInventoryItemUploadPath() {
      return this.defaultInventoryUpload;
    }

    public getInventoryList() {
      return this.httpClient.get<InventoryData>(this.inventoryAPI + 'GetInventoryItems').pipe(catchError(this.handleExceptions));
    }

    public getInventoryItem(itemID: string) {
      return this.httpClient.get<InventoryData>(this.inventoryAPI + 'GetInventoryItemById?ID=' + itemID).pipe(catchError(this.handleExceptions));
    }

    public addInventory(formData: FormData): Observable<any> {     
      return this.httpClient.post(this.inventoryAPI + 'SaveInventoryItem', formData, {observe: 'response'}).pipe(catchError(this.handleExceptions));
    }

    public updateInventory(formData: FormData): Observable<any> {
      return this.httpClient.post(this.inventoryAPI + 'UpdateInventoryItem', formData, {observe: 'response'}).pipe(catchError(this.handleExceptions));
    }

    public deleteInventory(itemID: string): Observable<any> {
      const headers = { 'content-type': 'application/json'} 
      return this.httpClient.delete(this.inventoryAPI + 'DeleteInventoryItem?ID=' + itemID, {'headers':headers , observe: 'response'}).pipe(catchError(this.handleExceptions));
    }

    handleExceptions(error: HttpErrorResponse) {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = 'Error: ${error.error.message}';
      } else {
        errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMsg);
      return throwError(errorMsg);
    }
}
