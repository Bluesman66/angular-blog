import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { PostsService } from '../../shared/posts.service';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
	posts: Post[] = [];
	pSub: Subscription;
	searchStr = '';

	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		this.pSub = this.postsService.getAll().subscribe((posts) => {
			this.posts = posts;
		});
	}

	ngOnDestroy(): void {
		if (this.pSub) {
			this.pSub.unsubscribe();
		}
	}

	remove(id: string) {}
}
