import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../../../../services/github.service';

@Component({
  selector: 'sw-github-login',
  templateUrl: './github-login.component.html',
  styleUrls: ['./github-login.component.scss']
})
export class GithubLoginComponent implements OnInit {

  constructor(private githubService: GithubService) { }

  loginGithub(): void {
    this.githubService.getGithubKey().subscribe(
      res => {
        const { clientId } = res.data;
        location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
      }
    );
  }

  ngOnInit(): void {
  }

}
