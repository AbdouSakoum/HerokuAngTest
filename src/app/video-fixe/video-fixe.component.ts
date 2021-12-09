import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-fixe',
  templateUrl: './video-fixe.component.html',
  styleUrls: ['./video-fixe.component.css']
})
export class VideoFixeComponent implements OnInit {

  videoItems = [
    {
      name: 'video explicative',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4'
    }
  ];

  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;

  constructor() { }

  ngOnInit(): void {
  }

  videoPlayerInit(data: any) {
    this.data = data;

    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.activeIndex++;

    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }

    this.currentVideo = this.videoItems[this.activeIndex];
  }

  initVdo() {
    this.data.play();
  }

}
