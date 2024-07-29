import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrl: './panel-info.component.css'
})
export class PanelInfoComponent {

  @Input() imageUrl: string = '/../../logo1.png';  

  @Input() liveJobs: number = 100;
  @Input() companies: number = 100;
  @Input() candidates: number = 999;
  @Input() newJobs: number = 100;
}