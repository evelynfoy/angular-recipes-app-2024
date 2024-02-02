import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  igSubscription: Subscription;

  constructor(private shoppingListService:ShoppingListService, private loggingService: LoggingService ) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igSubscription = this.shoppingListService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index:number) {
    this.shoppingListService.editingStarted.next(index);
  }

  ngOnDestroy(): void {
    this.igSubscription.unsubscribe();
  }


}
