import axios from "axios";

//fetch ingredients 
export const fetchAllIngredients = async (): Promise<string[]> => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/ingredients");

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data;  // ✅ directly return the array now
    } else {
      console.error("Invalid response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};


export type SearchMode = "fuzzy" | "strict";
export type DietFilter = "vegan" | "keto" | "Vegetarian" | "Non Vegetarian" | "any";

export interface Recipe {
    id?: string;
    name: string;
    description: string;
    ingredients: string[];
    steps: string[];
    // difficulty: string;
    diet_type: DietFilter;
    image: string;
    prep_time: string;
}

export interface GetRecipesParams {
    ingredients: string[];
    // searchMode: SearchMode;
    // dietFilter: DietFilter;
}

export const getRecipes = async({ ingredients }: GetRecipesParams): Promise<Recipe[]> => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/find-recipes/", { ingredients });  

        if(response.status === 200 && Array.isArray(response.data)){
            return response.data;
        }else{
            console.warn("Invalid response format:", response.data);
            return [];
        }

    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};


