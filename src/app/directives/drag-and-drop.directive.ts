import { Directive, EventEmitter, HostBinding, HostListener, Output, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../models/fileHandle.model';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  constructor(private sanitizer: DomSanitizer) { }

  @Output()
  fileDrop: EventEmitter<FileHandle> = new EventEmitter();

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();

    const file = evt.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.fileDrop.emit({ file, url });
  }
}
