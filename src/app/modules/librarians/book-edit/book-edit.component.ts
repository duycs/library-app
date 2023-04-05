import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { TagService } from 'src/app/core/services/tags.service';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { Chip } from 'src/app/shared/models/chip';
import { Tag } from 'src/app/shared/models/tag';
import { AuthorService } from 'src/app/core/services/authors.service';
import { SubjectService } from 'src/app/core/services/subjects.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm!: FormGroup;

  id!: number;
  isbn: string = '';
  title: string = '';
  coverImage: string = '';
  ebook: string = '';
  ebookType: string = '';
  publisher: string = '';
  publicationDate!: Date;
  language: string = '';
  pageNumber: string = '';

  authors!: string;
  subjects!: string;
  tags!: string;

  authorChips!: Chip[];
  subjectChips!: Chip[];
  tagChips!: Chip[];

  isLoadingResults = false;
  labelAuthor = 'Authors Selection';
  labelSubject = 'Subjects Selection';
  labelTag = 'Tags Selection';
  matcher = new ErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute,
    private librarianService: LibrarianService,
    private tagService: TagService,
    private authorService: AuthorService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    let bookId = this.route.snapshot.params['id'];
    this.getBook(bookId);
    this.getTagsByBookId(bookId);
    this.getAuthorsByBookId(bookId);
    this.getSubjectsByBookId(bookId);

    this.bookForm = this.formBuilder.group({
      'id': [null],
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
      'tags': [null],
      'subjects': [null]
    });
  }

  //submit
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.librarianService.updateBook(form)
      .subscribe(res => {
        this.alertService.showToastSuccess();
        this.router.navigate(['/librarians/findBooks']);
      }, (err) => {
        this.alertService.showToastError();
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  //click book detail
  bookDetails() {
    this.router.navigate(['/librarians/findBook', this.id]);
  }

  //get info
  getBook(id: any) {
    this.librarianService.findBook(id).subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.bookForm.setValue({
        id: data.id,
        isbn: data.isbn,
        title: data.title,
        coverImage: data.coverImage,
        ebook: data.ebook,
        ebookType: data.ebookType,
        publisher: data.publisher,
        publicationDate: data.publicationDate,
        language: data.language,
        pageNumber: data.pageNumber,

        authors: data.authors,
        subjects: data.subjects,
        tags: data.tags
      });
    });
  }

  getTagsByBookId(id: any) {
    this.tagService.getTagsByBookId(id).subscribe(data => {
      if (data)
        this.tagChips = data;
      else
        this.tagChips = [];
      console.log(this.tagChips);
    });
  }

  getAuthorsByBookId(id: any) {
    this.authorService.getAuthorsByBookId(id).subscribe(data => {
      if (data)
        this.authorChips = data;
      else
        this.authorChips = [];
      console.log(this.authorChips);
    });
  }

  getSubjectsByBookId(id: any) {
    this.subjectService.getSubjectsByBookId(id).subscribe(data => {
      if (data)
        this.subjectChips = data;
      else
        this.subjectChips = [];
      console.log(this.subjectChips);
    });
  }

  //emit change from childs
  setCoverImageData(file: any): void {
    console.log('Cover image Data: ', file);
    this.coverImage = file.url;
    this.bookForm.get('coverImage')?.setValue(this.coverImage);
  }

  setEbookData(file: any): void {
    console.log('ebook Data: ', file);
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