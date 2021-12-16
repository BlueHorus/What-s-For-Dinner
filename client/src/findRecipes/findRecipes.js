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
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Recipe from '../shared/recipecard.js'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Search from './searchAnimation.js';




class FindRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: null,
      ingredients: [],
      ingredientForm: '',
      diet: '',
      intolerances: [],
      intolerancesForm: '',
      intoleranceFormValue: '',
      dietsFormValue: '',
      dietsForm: '',
      diets: []
    }

    this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleIngredientSearch = this.handleIngredientSearch.bind(this);
    this.handleIntoleranceSubmit = this.handleIntoleranceSubmit.bind(this);
    this.intoleranceChange = this.intoleranceChange.bind(this);
    this.dietChange = this.dietChange.bind(this);
    this.handleDietSubmit = this.handleDietSubmit.bind(this);
    this.renderUserIngredients = this.renderUserIngredients.bind(this);
    this.renderUserIntolerances = this.renderUserIntolerances.bind(this);
    this.renderUserDiet = this.renderUserDiet.bind(this);
  }

  renderUserDiet() {
    if (!this.props.user) {
      return null;
    }

    if (!this.props.user.diet) {
      return null;
  }
  return (<ListItem id={this.props.user.diet}
                  secondaryAction={
                    <IconButton edge='end' onClick={() => this.handleRemoveDiet(this.props.user.diet)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: 'rgb(230, 230, 230)',
                    borderRadius: '15px',
                    margin: '10px',
                    padding: '10px',
                    textDecoration: 'initial'
                  }}
                  >
                    <ListItemText primary={this.props.user.diet} required/>
                  </ListItem>)
  }

  renderUserIntolerances() {
    if (!this.props.user) {
      return null;
    }
    if (!this.props.user.intolerances) {
      return null;
    }
    let intolerances = this.props.user.intolerances.split(',')
     return intolerances.map((intolerance) => {
       return (
        <ListItem id={intolerance}
        secondaryAction={
          <IconButton edge='end' onClick={() => this.handleRemoveIntolerance(intolerance)}>
            <DeleteIcon />
          </IconButton>
        }
        style={{
          backgroundColor: 'rgb(230, 230, 230)',
          borderRadius: '15px',
          margin: '10px',
          padding: '10px',
          textDecoration: 'initial'
        }}
        >
          <ListItemText primary={intolerance} required/>
        </ListItem>
      )
     })
  }

  renderUserIngredients() {
    if (!this.props.user) {
      return null;
    }
    if (!this.props.user.ingredients) {
      return null;
    }
    let ingredients = this.props.user.ingredients.split(',')
    return ingredients.map((ingredient) => {
      return (
        <ListItem id={ingredient}
        secondaryAction={
          <IconButton edge='end' onClick={() => this.handleRemoveIngredient(ingredient)}>
            <DeleteIcon />
          </IconButton>
        }
        style={{
          backgroundColor: 'rgb(230, 230, 230)',
          borderRadius: '15px',
          margin: '10px',
          padding: '10px',
          textDecoration: 'initial'
        }}
        >
          <ListItemText primary={ingredient} required/>
        </ListItem>
      )
    })
  }

  onChange(event) {

    if (event.target.id === 'ingredient-form') {
      this.setState({
        ingredientForm: event.target.value
      })
    }
  }

  intoleranceChange(event) {
    this.setState({
      intoleranceFormValue: event.target.value,
      intolerancesForm: event.target.value
    })
  }

  dietChange(event) {
    this.setState({
      dietsFormValue: event.target.value,
      dietsForm: event.target.value
    })
  }


  handleIngredientSubmit() {
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
  handleIntoleranceSubmit() {
    if (this.state.intolerancesForm === '') {
      alert('form cannot be empty')
      return;
    }
    let tempArray = this.state.intolerances;
    tempArray.push(this.state.intolerancesForm);
    this.setState({
      intolerances: tempArray,
      intolerancesForm: '',
      intoleranceFormValue: ''
    })
  }

  handleDietSubmit() {
    if (this.state.dietsForm === '') {
      alert('form cannot be empty')
      return;
    }
    let tempArray = this.state.diets;
    tempArray.push(this.state.dietsForm);
    this.setState({
      diets: tempArray,
      dietsForm: '',
      dietsFormValue: '',
    })
  }

  handleIngredientSearch() {
    event.preventDefault();
    let ingredients = this.state.ingredients.toString();
    let diet = this.state.diets.toString();
    let intolerances = this.state.intolerances.toString();
    let config = {
       method: 'get',
       params: {
         ingredients: ingredients,
         intolerances: intolerances,
         diet: diet
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
  handleRemoveIntolerance(intolerance) {
    let element = document.getElementById(`${intolerance}`)
    element.remove();
  }
  handleRemoveDiet(diet) {
    let element = document.getElementById(`${diet}`)
    element.remove();
  }

  render() {
    return (
      <>
    <Card sx={{ width: '100%', maxWidth: 900, margin: '15px', display: 'flex', 'flex-direction': 'column', alignItems: 'center', backgroundColor: 'rgb(230, 230, 230)' }}>
      <div id='list-container' style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Card style={{width: '30%', margin: '15px', padding:'15px', backgroundColor: 'eggshell'}}>
          <CardContent>
            <List style={{
              fontSize: '30px',
              textDecoration: 'underline'
            }}>
              Ingredients:
            {this.renderUserIngredients()}
            {this.state.ingredients.map((ingredient) => {
              return (
                <ListItem id={ingredient}
                secondaryAction={
                  <IconButton edge='end' onClick={() => this.handleRemoveIngredient(ingredient)}>
                    <DeleteIcon />
                  </IconButton>
                }
                style={{
                  backgroundColor: 'rgb(230, 230, 230)',
                  borderRadius: '15px',
                  margin: '10px',
                  padding: '10px',
                  textDecoration: 'initial'
                }}
                >
                  <ListItemText primary={ingredient} required/>
                </ListItem>
              )
            })
          }
          </List>
          </CardContent>
        </Card>

        <Card style={{width: '30%', margin: '15px', padding:'15px', backgroundColor: 'eggshell'}}>
          <CardContent>
            <List style={{
              fontSize: '30px',
              textDecoration: 'underline'
            }}>
              Intolerances:
              { this.renderUserIntolerances()}
              {this.state.intolerances.map((intolerance) => {
                return (
                  <ListItem id={intolerance}
                  secondaryAction={
                    <IconButton edge='end' onClick={() => this.handleRemoveIntolerance(intolerance)}>
                      <DeleteIcon />
                    </IconButton>
                  }

                  style={{
                    backgroundColor: 'rgb(230, 230, 230)',
                    borderRadius: '15px',
                    margin: '10px',
                    padding: '10px',
                    textDecoration: 'initial'
                  }}
                  >
                    <ListItemText primary={intolerance} required/>
                  </ListItem>
                )
              })
            }
            </List>
          </CardContent>
        </Card>
        <Card style={{width: '30%', margin: '15px', padding:'15px', backgroundColor: 'eggshell'}}>
          <CardContent>
            <List style={{
              fontSize: '30px',
              textDecoration: 'underline'
            }}>
              Diet:
              { this.renderUserDiet() }
              {this.state.diets.map((diet) => {
                return (
                  <ListItem id={diet}
                  secondaryAction={
                    <IconButton edge='end' onClick={() => this.handleRemoveDiet(diet)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  style={{
                    backgroundColor: 'rgb(230, 230, 230)',
                    borderRadius: '15px',
                    margin: '10px',
                    padding: '10px',
                    textDecoration: 'initial'
                  }}
                  >
                    <ListItemText primary={diet} required/>
                  </ListItem>
                )
              })
            }
            </List>
        </CardContent>
      </Card>
      </div>
      <div id='add-on-container' style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
      }}>
        <FormControl sx={{m: 1, width: '33%', display:'flex', alignItems: 'center'}} variant="standard">
          <InputLabel htmlFor='ingredient-form'></InputLabel>
          <TextField style={{width:'100%', backgroundColor: 'white'}}autoComplete='on' spellCheck='true' onChange={this.onChange} id='ingredient-form' varient='filled' value={this.state.ingredientForm} label='Ingredients'/>
          <Button type='submit' id='signup' onClick={this.handleIngredientSubmit} varient='filled' style={{
            margin: '10px',
            backgroundColor: '#39d3bd'
          }} >Add Ingredient</Button>
        </FormControl>
        <FormControl sx={{m: 1, width: '33%', display:'flex', alignItems: 'center'}} variant="standard">
          <InputLabel htmlFor='intolerances-form'></InputLabel>
          <TextField style={{width:'100%', backgroundColor: 'white'}} select onChange={this.intoleranceChange} id='intolerances-form' label='Intolerances' varient='filled' value={this.state.intoleranceFormValue}>
            <MenuItem key='Sesame' value='Sesame'>Sesame</MenuItem>
            <MenuItem key='Seafood' value='Seafood'>Seafood</MenuItem>
            <MenuItem key='Peanut' value='Peanut'>Peanut</MenuItem>
            <MenuItem key='Grain' value='Grain'>Grain</MenuItem>
            <MenuItem key='Gluten' value='Gluten'>Gluten</MenuItem>
            <MenuItem key='Egg' value='Egg'>Egg</MenuItem>
            <MenuItem key='TreeNut' value='TreeNut'>TreeNut</MenuItem>
            <MenuItem key='Sulfite' value='Sulfite'>Sulfite</MenuItem>
            <MenuItem key='Soy' value='Soy'>Soy</MenuItem>
            <MenuItem key='Shellfish'value='Shellfish'>Shellfish</MenuItem>
          </TextField>
          <Button type='submit' id='signup' onClick={this.handleIntoleranceSubmit} varient='filled' style={{
            margin: '10px',
            backgroundColor: '#39d3bd'
          }}>Add Intolerance</Button>
        </FormControl>
        <FormControl sx={{m: 1, width: '33%', display:'flex', alignItems: 'center'}} variant="standard">
          <InputLabel htmlFor='diets-form'></InputLabel>
          <TextField select style={{width:'100%', backgroundColor: 'white'}} onChange={this.dietChange} id='diets-form' label='Diets' varient='filled' value={this.state.dietsFormValue}>
            <MenuItem key='Gluten Free' value='Gluten Free'>Gluten Free</MenuItem>
            <MenuItem key='Ketogenic' value='Ketogenic'>Ketogenic</MenuItem>
            <MenuItem key='Vegetarian' value='Vegetarian'>Vegetarian</MenuItem>
            <MenuItem key='Lacto-Vegetarian' value='Lacto-Vegetarian'>Lacto-Vegetarian</MenuItem>
            <MenuItem key='Ovo-Vegetarian' value='Ovo-Vegetarian'>Ovo-Vegetarian</MenuItem>
            <MenuItem key='Vegan' value='Vegan'>Vegan</MenuItem>
            <MenuItem key='Pescetarian' value='Pescetarian'>Pescetarian</MenuItem>
            <MenuItem key='Paleo' value='Paleo'>Paleo</MenuItem>
            <MenuItem key='Primal' value='Primal'>Primal</MenuItem>
            <MenuItem key='Low'value='Low'>Low</MenuItem>
          </TextField>
          <Button type='submit' style={{margin: '10px', marginRight: '0', backgroundColor: '#39d3bd'}} id='signup' onClick={this.handleDietSubmit} varient='filled'>Add Diet</Button>
        </FormControl>
      </div>
    </Card>
      <Button onClick={this.handleIngredientSearch} startIcon={<SearchIcon style={{
        fontSize: '2em'
      }}
      />} varient='filled' id='signup' style={{
        width: '300px',
        height: '150px',
        fontSize: '2em',
        margin: '10px',
        backgroundColor: '#39d3bd'
      }}> Search </Button>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width:'auto', height:'auto'}}>{
        this.state.recipes === null ? (<Search style={{maxWidth:'500px', height:'auto'}}/>) :
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