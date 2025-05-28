import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import "../styles/RecipeDetailPage.scss";
import { Avatar } from "@mui/material";
import Vectors from "../assets/vector2.svg";
import AyakaLogo from "../assets/AyakaLogo.svg";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  description: string;
  image: string;
  diet_type: string;
  prep_time: string;
};

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/recipe/${id}`); // 👈 You need this API
        setRecipe(response.data);
        console.log(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchRecipe();
  }, [id]);

  const cleanedIngredients = recipe?.ingredients.map((item) => {
    // Remove unwanted characters
    const cleaned = item.replace(/^\[?'?|']?$/g, "").trim();

    // Convert to sentence case
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  });

  const cleanedDetailedIngredients = recipe?.detailed_ingredients
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const steps = recipe?.instructions
    .split(".")
    .map((step) => step.trim())
    .filter((step) => step.length > 0);

  return (
    <div>
      {loading ? (
        <Loader /> // Show Loader while fetching data
      ) : (
        recipe && (
          <div className="RecipesPage">
            <div className="RecipesDetailPageContainer">
              <div className="RecipesPageHeader">
                <div className="RecipesBgVectorLeft">
                  <img src={Vectors} alt="" />
                </div>
                <div className="RecipesBgVectorRight">
                  <img src={Vectors} alt="" />
                </div>
                <div className="HeaderLogo">
                  <img src={AyakaLogo} alt="Ayaka Logo" />
                </div>
                <div className="HeaderAvatar">
                  <Avatar
                    alt="Ayaka Logo"
                    src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90"
                  />
                </div>
              </div>

              <div className="RecipesPageBody">
                <div className="RecipesBodyContainer">
                  <div
                    className="RecipesDetailBodyHeader"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070")`,
                    }}
                  >
                    <h1>{recipe.name}</h1>
                    <p>{recipe.description}</p>
                  </div>

                  <div className="RecipesDetailBodyContent">
                    <div className="RecipeContentBox">
                      <div className="BoxCol">
                        <div className="BoxRow">
                          <h1>Preparation Time</h1>
                          <p>{parseInt(recipe.prep_time)}&nbsp;minutes</p>
                        </div>
                        <div className="BoxRow">
                          <h1>Servings</h1>
                          <p>{parseInt(recipe.serving)}</p>
                        </div>
                      </div>
                      <div className="BoxCol">
                        <div className="BoxRow">
                          <h1>Course</h1>
                          <p>{recipe.course}</p>
                        </div>
                        <div className="BoxRow">
                          <h1>Cuisine</h1>
                          <p>{recipe.cuisine}</p>
                        </div>
                      </div>
                      <div className="BoxCol">
                        <div className="BoxRow">
                          <h1>Diet Type</h1>
                          <p>{recipe.diet_type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="RecipeContentBox">
                      <div className="BoxCol">
                        <div className="BoxRow">
                          <h1>Ingredients</h1>
                          <ul>
                            {cleanedIngredients.map((ingredient, index) => (
                              <p>
                                <li key={index}>{ingredient}</li>
                              </p>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="BoxCol">
                        <div className="BoxRow">
                          <h1>Detailed Ingredients</h1>
                          <ul>
                            {cleanedDetailedIngredients.map(
                              (ingredient, index) => (
                                <p>
                                  <li key={index}>{ingredient}</li>
                                </p>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="RecipeDetailBodyContent">
                    <div className="RecipeContentBox">
                      <div className="BoxCol">
                        <div className="BoxRow">
                          <h1>Steps</h1>
                          <ul>
                            {steps.map((step, index) => (
                              <div
                                key={index}
                                className="step-item"
                              >
                                <span className="step-number">
                                  Step {index + 1}:
                                </span>
                                <p>{step}</p>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RecipeDetailPage;
