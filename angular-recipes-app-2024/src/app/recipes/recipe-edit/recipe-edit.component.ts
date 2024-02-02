import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  sub: Subscription;
  ingChgSub : Subscription;
  param:string;
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route:ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = this.id != null && !isNaN(this.id);
        this.initForm();
      }
    );
    this.ingChgSub = this.recipeService.ingredientsChanged.subscribe(
      (recipe: Recipe) => {
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeimagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeimagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup( {
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] )
            })
          );
        }
      }
    } 
    
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeimagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
    
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['ingredients']
    //   );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      // this.router.navigate(['recipes', this.id]);
      
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      // this.router.navigate(['recipes']);
    }
    this.onCancel();

  }

  onCancel() {
    // ActivatedRoute.
    this.router.navigate(['../'], {relativeTo:this.route});
    // this.router.navigate(['recipes', this.id]);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.controls.ingredients).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [
          Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index:number) {
    // this.recipeService.deleteIngredient(this.id, index);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
