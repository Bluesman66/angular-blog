import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostsService } from '../../shared/posts.service';

@Component({
	selector: 'app-create-page',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit, OnDestroy {
	form: FormGroup;
	cSub: Subscription;

	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			title: new FormControl(null, Validators.required),
			text: new FormControl(null, Validators.required),
			author: new FormControl(null, Validators.required),
		});
	}

	ngOnDestroy(): void {
		if (this.cSub) {
			this.cSub.unsubscribe();
		}
	}

	submit() {
		if (this.form.invalid) {
			return;
		}

		const post: Post = {
			title: this.form.value.title,
			text: this.form.value.text,
			author: this.form.value.author,
			date: new Date(),
		};

		this.cSub = this.postsService.create(post).subscribe(() => {
			this.form.reset();
		});
	}
}
