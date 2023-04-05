import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { Chip } from 'src/app/shared/models/chip';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})

export class BookCreateComponent implements OnInit {
  bookForm!: FormGroup;

  //model
  isbn: string = '';
  title: string = '';
  coverImage: string = '';
  ebook: string = '';
  ebookType: string = '';
  publisher: string = '';
  publicationDate!: Date;
  language: string = '';
  pageNumber: string = '';
  //statistic
  authors!: string;
  subjects!: string;
  tags!: string;

  //chips form child
  labelAuthor = 'Authors Selection';
  labelSubject = 'Subjects Selection';
  labelTag = 'Tags Selection';
  authorChips!: Chip[];
  subjectChips!: Chip[];
  tagChips!: Chip[];

  //condition
  isLoadingResults = false;
  isCanSave = true;
  matcher = new ErrorStateMatcher();

  constructor(private router: Router,
    private librarianService: LibrarianService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  //init
  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null],
      'title': [null, Validators.required],
      'coverImage': [null],
      'ebook': [null],
      'ebookType': [null],
      'publisher': [null],
      'publicationDate': [null],
      'language': [null],
      'pageNumber': [null],

      'authors': [null],
      'subjects': [null],
      'tags': [null]
    });

    //default empty chips
    this.authorChips = [];
    this.subjectChips = [];
    this.tagChips = [];
  }

  //submit
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

  //emit change from childs
  setCoverImageData(file: any): void {
    console.log('Cover image Data: ', file);
    this.coverImage = file.url;
    this.bookForm.get('coverImage')?.setValue(this.coverImage);
  }

  setEbookData(file: any): void {
    console.log('ebook data: ', file);
    this.bookForm.get('ebook')?.setValue(file.url);
    console.log(file.fileExtension);
    this.bookForm.get('ebookType')?.setValue(file.fileExtension);
  }

  setTagsData(items: any): void {
    let tags = items.map((item: any) => item.name).toString();
    this.bookForm.get('tags')?.setValue(tags);
    console.log('tags data: ', tags);
  }

  setAuthorsData(items: any): void {
    let authors = items.map((item: any) => item.name).toString();
    this.bookForm.get('authors')?.setValue(authors);
    console.log('authors data: ', authors);
  }

  setSubjectsData(items: any): void {
    let subjects = items.map((item: any) => item.name).toString();
    this.bookForm.get('subjects')?.setValue(subjects);
    console.log('subjects data: ', subjects);
  }


}