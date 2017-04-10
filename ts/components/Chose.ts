import { Component, Input, ViewChild, ElementRef} from "@angular/core";
import {Chose} from "@NoyauFonctionnel/nf";

const htmlTemplate = `
	<div class="view">
		<input 	class			= "toggle" 
				type			= "checkbox" 
				name			= "fait"
				[ngModel]       = "nf.fait" 
			    (ngModelChange) = "nf.Fait(inputFait.checked)"
			    #inputFait 
			    />
		<label 	class="texte"
				(dblclick)="Edit()">{{nf.texte}}</label>
		<button class="destroy" (click)="dispose()"></button>
	</div>
	<form *ngIf="editing" (submit)="setText(newText.value)">
		<input 	class		= "edit"
				[ngModel]   = "nf.texte"
				(blur)      = "setText(newText.value)"
				name        = "textField"
				#newText/>
	</form>
`;

@Component({
  selector		: "item-chose",
  template		: htmlTemplate
})
export class ItemChose {
    @Input ("nf" ) nf   : Chose;
	@ViewChild("newText") newTextInput : ElementRef;
	editing			    : boolean = false;

	dispose() {
	    this.nf.dispose();
    }
    Edit() {
	    this.editing = true;//passage en mode édition qd on dbclick sur label
        requestAnimationFrame( () => {
            this.newTextInput.nativeElement.focus();
        });
    }
    setText(str:string) {
	    this.editing = false;
	    this.nf.Texte(str);
    }

}
