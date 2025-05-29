import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  description: string;
  image: string;
  diet_type: "Vegetarian" | "Non Vegeterian" | "any";
  prep_time: string;
};

const AiGeneratedRecipe = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!state || !state.ingredients || !Array.isArray(state.ingredients)) {
      console.error("No ingredients provided.");
      navigate("/cook_with_ai"); // Redirect to home if no ingredients
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/cook_with_ai",
          {
            ingredients: state.ingredients, // Pass the ingredients array
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setRecipes(response.data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [state]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="RecipesPage">
          {recipes.length === 0 ? (
            <p>No recipes found. Try different ingredients.</p>
          ) : (
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt={recipe.name} />
                <p>{recipe.description}</p>
                <p>
                  <strong>Prep Time:</strong> {recipe.prep_time}
                </p>
                <p>
                  <strong>Diet Type:</strong> {recipe.diet_type}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default AiGeneratedRecipe;
