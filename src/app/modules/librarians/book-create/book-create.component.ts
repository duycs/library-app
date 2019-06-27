import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})

export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;
  isbn: string = '';
  title: string = '';
  authors: any;
  coverImage: string = '';
  ebook: string = '';
  ebookType: string = '';
  subject: string = '';
  publisher: string = '';
  publicationDate: Date;
  language: string = '';
  pageNumber: string = '';
  tags: any;
  isLoadingResults = false;

  isCanSave = true;

  labelAuthor = 'Authors Selection';
  labelTag = 'Tags Selection';

  onNotify(message: string): void {
    alert(message);
  }

  constructor(private router: Router,
    private librarianService: LibrarianService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null],
      'title': [null, Validators.required],
      'authors': [],
      'coverImage': [null],
      'ebook': [null],
      'ebookType': [null],
      'subject': [null],
      'publisher': [null],
      'publicationDate': [null],
      'language': [null],
      'pageNumber': [null],
      'tags': []
    });
    this.authors = [];
    this.tags = [];
  }

  //get image form data from child app-preview-image
  setCoverImageData(file: any): void {
    console.log('Cover image Data: ', file);
    this.coverImage = file.url;
    this.bookForm.get('coverImage').setValue(this.coverImage);
  }

  setEbookData(file: any): void {
    console.log('ebook Data: ', file);
    this.bookForm.get('ebook').setValue(file.url);
    console.log(file.fileExtension);
    this.bookForm.get('ebookType').setValue(file.fileExtension);
  }

  setTagsData(tags: any): void {
    console.log('tags Data: ', tags);
    this.tags = tags;
    this.bookForm.get('tags').setValue(this.tags);
  }

  setAuthorsData(authors: any): void {
    console.log('authors Data: ', authors);
    this.authors = authors;
    this.bookForm.get('authors').setValue(this.authors);
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;

    //TODO: promise tasks upload then post new book
    // console.log('upload cover image');
    // this.uploadService.uploadImageToS3(this.coverImageformData)
    //   .subscribe(res => {
    //     this.image = res;
    //     console.log(this.image);
    //     this.bookForm.setValue({ 'coverImage': this.image.imageUrl });
    //   }, (err) => {
    //     this.alertService.showToastError();
    //     console.log('error upload cover image')
    //   });

    console.log('post form')
    console.log(form);

    this.librarianService.addBook(form)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.router.navigate(['/librarians/findBooks']);
      }, (err) => {
        this.alertService.showToastError();
        this.isLoadingResults = false;
      });
  }

}