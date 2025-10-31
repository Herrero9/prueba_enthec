import { Component } from '@angular/core';
import { AppService } from './app-service';
import { Repository, User } from './users.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const PAGE_SIZE = 6;
const FIRST_PAGE = 1;
const MAGIC_NUMBER_N_0 = 0;


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AppService
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  protected readonly title ='prueba_enthec';

  private repos: Repository[] = [];

  public username: string = '';
  public user: User | null = null;
  public userRepos: Repository[] = [];
  public currentPageNumber: number = FIRST_PAGE;
  public totalPages: number = MAGIC_NUMBER_N_0;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.searchUserRepos();
  }

  public searchUserRepos(username?: string) {
    if(!username) {
      username = 'mojombo';
    }
    this.username = username;
    this.getUserData(username);
  }

  public nextPage() {
    if(this.currentPageNumber === this.totalPages) return;
    this.currentPageNumber++;
    this.setUserReposPage();
  }

  public previousPage() {
    if(this.currentPageNumber === FIRST_PAGE) return;
    this.currentPageNumber--;
    this.setUserReposPage();
  }

  private getUserData(username: string) {
    this.appService.getUserRepos(username).subscribe(repos => {
        this.repos = repos;
        this.user = this.repos[MAGIC_NUMBER_N_0]?.owner ?? null;
        this.currentPageNumber = FIRST_PAGE;
        this.setUserReposPage();
    });
  }

  private setUserReposPage() {
    const startIndex = (this.currentPageNumber - FIRST_PAGE) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    this.totalPages = Math.ceil(this.repos.length / PAGE_SIZE);
    this.userRepos = this.repos.slice(startIndex, endIndex);
  }

}
