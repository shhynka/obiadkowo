import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  constructor() { }

  @Output()
  fileDrop: EventEmitter<Blob> = new EventEmitter();

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();

    const file = evt.dataTransfer.files[0];
    this.fileDrop.emit(file);
  }
}
