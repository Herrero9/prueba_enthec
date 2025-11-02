import { ChangeDetectionStrategy, Component, EventEmitter, Output, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-filters',
  imports: [
    FormsModule
  ],
  templateUrl: './order-filters.html',
  styleUrl: './order-filters.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFilters implements OnInit {
  @Output() nameOrderChange = new EventEmitter<string>();
  @Output() starsOrderChange = new EventEmitter<string>();

  public nameOrder: string = '';
  public starsOrder: string = '';



  ngOnInit(): void { }

  public onNameOrderChange() {
    this.nameOrderChange.emit(this.nameOrder);
  }

  public onStarsOrderChange() {
    this.starsOrderChange.emit(this.starsOrder);
  }

  public resetOrders() {
    this.nameOrder = '';
    this.starsOrder = '';
    this.onNameOrderChange();
    this.onStarsOrderChange();
  }

}
