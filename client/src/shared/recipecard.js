
/**
 * "As a user, i want to see featured recipes:
1. I want to see maximum three recipes
2. i want to see the featured recipe as the most upvoted recipe"

Title
Hyperlink to recipe
Thumbnail
Show ingredients that you have in your ‘pantry’ in green
Maybe eventually show ingredients you don’t have in red?
Tags (breakfast, lunch, dinner, etc.)

Recipe

 */

import  * as React from 'react';
import axios from 'axios';
import FavoriteButton from './favoriteRecipeButton.js';
import UpVoteButton from './upVoteButton.js';
import DownVoteButton from './downVoteButton.js'
import { PieChart } from 'react-minimal-pie-chart';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Recipe (props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const recipe = props.recipe
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));


  return (
    <Card sx={{ maxWidth: 900, margin: '15px', display: 'flex', 'flex-direction': 'row' }}>
    <CardMedia
      component="img"
      height="194"
      image={recipe.image}
      alt="Paella dish"
    />
    <CardContent>
        <CardHeader
        title={recipe.title}
        />
        <Typography variant='body2' color='black'>
        {recipe.summary.replace(/<[^>]+>/g, '').slice(0,240)}
        </Typography>
        <Typography className="recipelink"><a href={recipe.spoonacularSourceUrl}>Full recipe</a></Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Typography paragraph>
                Tags:
                {recipe.dishTypes.map(type => <li>{type}</li>)}
            </Typography>
            <Typography paragraph>
                Diets:
                {recipe.diets.map(type => <li>{type}</li>)}
            </Typography>
            {recipe.usedIngredients && recipe.missedIngredients ? <Typography>
              Ingredients:
                {recipe.usedIngredients.map(ing => <li className="foundingredients">{ing.name}</li>)}
                {recipe.missedIngredients.map(ing => <li className="missingingredients">{ing.name}</li>)}
            </Typography> :
            null}
          </div>
          <div>
                Calorie % by type:
                <PieChart style={{
                    marginTop: '10px'
                }}
                                data={[
                                    { title: "Protein", value: recipe.nutrition.caloricBreakdown.percentProtein, color: '#8f4fba' },
                                    { title: "Fat", value: recipe.nutrition.caloricBreakdown.percentFat, color: '#4fbaba' },
                                    { title: "Carbs", value: recipe.nutrition.caloricBreakdown.percentCarbs, color: '#4fba7a' },
                                ]}
                                viewBoxSize={[120, 120]}
                                label={(data) => data.dataEntry.title}
                                labelPosition={65}
                                labelStyle={{
                                    fontSize: "10px",
                                    fontColor: "FFFFFA",
                                    fontWeight: "800",
                                }}
                                />
            </div>
        </CardContent>
      </Collapse>

    </CardContent>
    <CardContent>
      <div>
        <FavoriteButton recipe={recipe} user={props.user} handleButtonPress={props.handleButtonPress}/>
        <UpVoteButton recipe={recipe} user={props.user} handleButtonPress={props.handleButtonPress}/>
        <DownVoteButton recipe={recipe} user={props.user} handleButtonPress={props.handleButtonPress}/>
      </div>
    </CardContent>
    <CardActions disableSpacing>
        <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
        </ExpandMore>
    </CardActions>
    </Card>
  )
}




export default Recipe;
