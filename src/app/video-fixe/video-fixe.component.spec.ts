import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFixeComponent } from './video-fixe.component';

describe('VideoFixeComponent', () => {
  let component: VideoFixeComponent;
  let fixture: ComponentFixture<VideoFixeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFixeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFixeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
