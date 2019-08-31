import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: []
})
export class ImageListComponent implements OnInit {

  imageList: any[];
  rowIndexArray: any[];

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.propertyDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => item.payload.val());
        this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
      }
    );
  }

}
