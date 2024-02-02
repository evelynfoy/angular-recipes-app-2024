import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],

})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('editForm') editForm:NgForm;
  subscription : Subscription;
  ingChgSub : Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem : Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editingStarted.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount});
      }
    );
    // this.ingChgSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.in
    //   }
    // ); 
  }

  onSubmit() {
    const ingName = this.editForm.value.name;
    const ingAmount = this.editForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.editForm.reset();
  }

  onClearForm() {
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // const ingName = this.editForm.value.name;
    // const ingAmount = this.editForm.value.amount;
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    // this.editForm.reset();
    // this.editMode = false;
    this.onClearForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
