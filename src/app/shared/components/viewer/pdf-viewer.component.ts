import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViwerComponent {
   // pdfSrc : string ='abc.pdf';
  @Input('pdfSrc') pdfSrc?: string;
  constructor(){}
}