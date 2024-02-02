import { Component, OnInit } from '@angular/core';

import  {Recipe} from '../recipe.model'
// import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  // paramsSubscription: Subscription;
  recipe: Recipe ;
  // constructor( private shoppingListService: ShoppingListService) { }
  constructor( private recipeService: RecipeService,
               private router: Router,
               private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.params
    .subscribe( 
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
    }
    );
  }

  // onToShoppingList() {
  //   this.shoppingListService.addIngredients(this.recipe.ingredients) 
  // }
  onToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
