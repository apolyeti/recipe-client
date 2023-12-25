import [useState] from 'react'; 
import { Recipe } from '@/utils/types';

interface RecipeProps {
    Recipe : Recipe;
}

export default function Recipe(props: RecipeProps) {
    return (
        <div className="Recipe">
            <h1>Recipe</h1>
        </div>
    )
}