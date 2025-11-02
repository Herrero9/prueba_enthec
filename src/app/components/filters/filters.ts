import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [
    FormsModule
  ],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filters implements OnInit {
  @Input() public reposLanguajes: string[] = [];
  @Output() public languageFilterChange = new EventEmitter<string>();
  @Output() public repoNameChange = new EventEmitter<string>();

  public repoName: string = '';
  public selectedLanguage: string = '';

  ngOnInit(): void { }

  public onLanguageChange(language: string) {
    this.selectedLanguage = language;
    this.languageFilterChange.emit(language);
  }

  public onRepoNameChange() {
    this.repoNameChange.emit(this.repoName);
  }

}
