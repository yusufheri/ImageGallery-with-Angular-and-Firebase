import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  propertyDetailList: AngularFireList<Property>;

  constructor(private firebase: AngularFireDatabase) { }

  getProperties() {
    this.propertyDetailList = this.firebase.list('properties');
  }

  insertPropertyDetail(property: Property) {
    this.propertyDetailList.push(property);
  }
}
