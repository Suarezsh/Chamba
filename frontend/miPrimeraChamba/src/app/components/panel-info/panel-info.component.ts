import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrl: './panel-info.component.css'
})
export class PanelInfoComponent {

  @Input() imageUrl: string = '/../../logo1.png';  

  @Input() liveJobs: number = 0;
  @Input() companies: number = 0;
  @Input() candidates: number = 0;
  @Input() newJobs: number = 0;
}
