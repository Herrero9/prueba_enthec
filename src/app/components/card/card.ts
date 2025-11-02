import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { Repository } from '../../interfaces/app.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card implements OnInit {
  @Input() repo: Repository = {} as Repository;

  ngOnInit(): void { }

}
