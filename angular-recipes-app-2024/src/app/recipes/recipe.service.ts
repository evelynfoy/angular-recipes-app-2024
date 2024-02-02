import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'Tasty Schnitzel',
    //       'A super-tasty Schnitzel - just awesome!',
    //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //       [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French Fries', 20)
    //       ]),
    //     new Recipe('Big Fat Burger',
    //       'What else you need to say?',
    //       'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //       [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //       ])
    //   ];
      private recipes: Recipe[] = [];
      recipesChanged = new Subject<Recipe[]>();
      ingredientsChanged = new Subject<Recipe>();
        
      constructor(private slService: ShoppingListService) {}

      setRecipes(newRecipes: Recipe[]) {
        this.recipes = newRecipes; 
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipe(id: number) {
        return this.recipes[id];
      }

      getRecipes() {
        return this.recipes.slice();
      }

      addIngredients(ingredients: Ingredient[]) {
       
        // this.ingredients = [...this.ingredients, ...ingredients];
        this.slService.addIngredients(ingredients);
        // this.ingredients.push(...ingredients);
        // this.ingredientsChanged.emit(this.ingredients.slice());
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }

      // deleteIngredient(recipeIndex: number, ingIndex: number) {
      //   this.recipes[recipeIndex].ingredients.splice(ingIndex,1);
      //   this.ingredientsChanged.next(this.recipes[recipeIndex]);
      // }

}