import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Recipe from '../shared/recipecard.js'


class FindRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: null,
      ingredients: [],
      ingredientForm: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleIngredientSearch = this.handleIngredientSearch.bind(this);
  }

  onChange() {
    this.setState({
      ingredientForm: event.target.value
    })
  }

  handleSubmit() {

    if (this.state.ingredientForm === '') {
      alert('Form cannot be empty');
      return;
    }

    let tempArray = this.state.ingredients;
    tempArray.push(this.state.ingredientForm);
    this.setState({
      ingredients: tempArray,
      ingredientForm: ''
    })
  }

  handleIngredientSearch() {
    event.preventDefault();
    let ingredients = this.state.ingredients.toString();

    let config = {
       method: 'get',
       params: {
         ingredients: ingredients
       },
       url: '/getRecipesFromIngredients'
     }

     axios(config)
     .then((data) => {
       console.log(data);
       this.setState({
         recipes: data.data.results
       })
     })
     .catch((err) => console.log(err))
  }

  handleRemoveIngredient(ingredient) {
    let element = document.getElementById(`${ingredient}`)
    element.remove();

  }

  render() {
    return (
      <>
      <List>
        {this.state.ingredients.map((ingredient) => {
          return (
            <ListItem id={ingredient}
            secondaryAction={
              <IconButton edge='end' onClick={() => this.handleRemoveIngredient(ingredient)}>
                <DeleteIcon />
              </IconButton>
            }
            >
              <ListItemText primary={ingredient} required/>
            </ListItem>
          )
        })
      }
      </List>
      <FormControl sx={{m: 1}} variant="standard">
        <InputLabel htmlFor='ingredient-form'></InputLabel>
        <TextField autoComplete='on' spellCheck='true' onChange={this.onChange} id='ingredient-form' label='Ingredient' varient='filled' value={this.state.ingredientForm} />
        <Button type='submit' onClick={this.handleSubmit} varient='filled'>Add Ingredient</Button>
      </FormControl>
      <Button onClick={this.handleIngredientSearch} startIcon={<SearchIcon />} varient='filled'> Search </Button>
      <div>{
        this.state.recipes === null ? (<img src='data:image/png;base64,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'/>) :
        this.state.recipes.map((recipe) => {
         return <Recipe recipe={recipe} user={this.props.user} handleButtonPress={this.props.handleButtonPress} />
        })
        }
       </div>
        </>
    )
  }
}

export default FindRecipes