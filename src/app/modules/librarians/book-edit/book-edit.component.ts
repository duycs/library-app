import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBookService } from '../../../core/services/books.service';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  id: number = null;
  isbn: string = '';
  title: string = '';
  author: string = '';
  coverImage: string = '';
  subject: string = '';
  ebook: string = '';
  ebookType: string = '';
  publisher: string = '';
  publicationDate: Date;
  language: string = '';
  pageNumber: string = '';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private api: ApiBookService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'id': [null],
      'isbn': [null, Validators.required],
      'title': [null, Validators.required],
      'author': [null],
      'coverImage': [null],
      'subject': [null],
      'ebook': [null],
      'ebookType': [null],
      'publisher': [null],
      'publicationDate': [null],
      'language': [null],
      'pageNumber': [null]
    });
  }

  getBook(id) {
    this.api.getBook(id).subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.bookForm.setValue({
        id: data.id,
        isbn: data.isbn,
        title: data.title,
        author: data.author,
        coverImage: data.coverImage,
        subject: data.subject,
        ebook: data.ebook,
        ebookType: data.ebookType,
        publisher: data.publisher,
        publicationDate: data.publicationDate,
        language: data.language,
        pageNumber: data.pageNumber
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateBook(this.id, form)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.router.navigate(['/librarians/findBooks']);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  bookDetails() {
    this.router.navigate(['/librarians/findBook', this.id]);
  }

  //emit event
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

}