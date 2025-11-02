import { Component, DestroyRef, inject } from '@angular/core';
import { Repository, User } from './interfaces/app.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppService } from './services/app-service';
import { Card } from './components/card/card';
import { Filters } from './components/filters/filters';
import { OrderFilters } from './components/order-filters/order-filters';

const PAGE_SIZE = 6;
const FIRST_PAGE = 1;
const MAGIC_NUMBER_N_0 = 0;


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    Card,
    Filters,
    OrderFilters
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
  private unfilteredRepos: Repository[] = [];

  private destroyRef = inject(DestroyRef);

  public username: string = '';
  public repoName: string = '';
  public user: User | null = null;
  public userRepos: Repository[] = [];
  public currentPageNumber: number = FIRST_PAGE;
  public totalPages: number = MAGIC_NUMBER_N_0;
  public reposLanguajes: string[] = [];
  public nameOrder: string = '';
  public starsOrder: string = '';

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
    this.setUserReposPage(this.repos);
  }

  public previousPage() {
    if(this.currentPageNumber === FIRST_PAGE) return;
    this.currentPageNumber--;
    this.setUserReposPage(this.repos);
  }

  public filterByName(event: string) {
    if(!event) {
      this.currentPageNumber = FIRST_PAGE;
      this.setUserReposPage(this.repos);
      return;
    }
    this.userRepos = this.repos.filter(repo => repo.name.toLowerCase().includes(event.toLowerCase()));
    this.currentPageNumber = FIRST_PAGE;
    this.setUserReposPage(this.userRepos);
  }


  public filterByLanguage(option: string) {
    if(option === 'all') {
      this.currentPageNumber = FIRST_PAGE;
      this.setUserReposPage(this.repos);
      return;
    }
    this.userRepos = this.repos.filter(repo => repo.language === option);
    this.currentPageNumber = FIRST_PAGE;
    this.setUserReposPage(this.userRepos);
  }

  public orderByName(order: string) {
    
    if(order === '') {
      this.resetFilters();
      return;
    }

    if(order === 'name-asc') {
      this.repos.sort((a, b) => a.name.localeCompare(b.name));
    } else if(order === 'name-desc') {
      this.repos.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.setUserReposPage(this.repos);
  }

  public orderByStars(order: string) {
    if(order === '') {
      this.resetFilters();
      return;
    }

    if(order === 'stars-asc') {
      this.repos.sort((a, b) => a.stargazers_count - b.stargazers_count);
    } else if(order === 'stars-desc') {
      this.repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
    this.setUserReposPage(this.repos);
  }

  public resetFilters() {
    this.repoName = '';
    this.nameOrder = '';
    this.starsOrder = '';
    this.currentPageNumber = FIRST_PAGE;
    this.repos = [...this.unfilteredRepos];
    this.setUserReposPage(this.repos);
  }

  private getUserData(username: string) {
    this.appService.getUserRepos(username)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(repos => {
        this.repos = repos;
        this.unfilteredRepos = [...repos];
        this.user = this.repos[MAGIC_NUMBER_N_0]?.owner ?? null;
        this.currentPageNumber = FIRST_PAGE;
        this.setUserReposPage(this.repos);
        this.setReposLanguageFilter();
    });
  }

  private setUserReposPage(repo: Repository[]) {
    const startIndex = (this.currentPageNumber - FIRST_PAGE) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    this.totalPages = Math.ceil(repo.length / PAGE_SIZE);
    this.userRepos = repo.slice(startIndex, endIndex);
  }

  private setReposLanguageFilter() {
    this.reposLanguajes = [];
      this.repos.forEach(repo => {
        if(repo.language && !this.reposLanguajes.includes(repo.language)) {
          this.reposLanguajes.push(repo.language);
        }
      });
  }
}
