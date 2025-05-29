import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import AyakaLogo from "../assets/AyakaLogo.svg";
import "../styles/RecipesPage.scss";
import { Avatar } from "@mui/material";
import Vectors from "../assets/vector2.svg";
import Loader from "../components/Loader";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  description: string;
  image: string;
  diet_type: "Vegetarian" | "Non Vegeterian" | "any";
  prep_time: string;
};

type DietFilter = "Vegetarian" | "Non Vegeterian" | "any";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "100%",
    color: " #1F3F32",
    backgroundColor: "rgba(155, 167, 156, 0.83)",
  },
});

const RecipesPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // New loading state
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchMode, setSearchMode] = useState<"fuzzy" | "strict">(
    state.searchMode || "fuzzy"
  );
  const [dietFilter, setDietFilter] = useState<DietFilter>("any");

  useEffect(() => {
    if (!state || !state.ingredients || !Array.isArray(state.ingredients)) {
      console.error("No ingredients provided.");
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/find_recipes/",
          {
            ingredients: state.ingredients,
            search_mode: searchMode,
          }
        );
        setRecipes(response.data.recipes || []);
        setLoading(false); // Set loading to false after data is fetched
        console.log(
          "Fetched recipes:",
          response.data.recipes[0].image + ".jpg"
        );
        console.log("Fetched recipes:", response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [state.ingredients, searchMode]); // react to searchMode change

  const filteredRecipes = recipes.filter((rec) => {
    const recipeDiet = rec.diet_type.toLowerCase();

    if (dietFilter === "any") return true;

    if (dietFilter === "Vegetarian") {
      return recipeDiet.includes("vegetarian") && !recipeDiet.includes("non");
    }

    if (dietFilter === "Non Vegeterian") {
      return recipeDiet.includes("non");
    }

    return false;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="RecipesPage">
          <div className="RecipesPageContainer">
            <div className="RecipesPageHeader">
              <div className="RecipesBgVectorLeft">
                <img src={Vectors} alt="" />
              </div>
              <div className="RecipesBgVectorRight">
                <img src={Vectors} alt="" />
              </div>
              <div className="HeaderLogo">
                <img
                  src={AyakaLogo}
                  alt="Ayaka Logo"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="HeaderAvatar">
                <Avatar
                  alt="Ayaka Logo"
                  src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
                 onClick={()=> window.history.back()}/>
              </div>
            </div>

            <div className="RecipesPageBody">
              <div className="RecipesBodyContainer">
                <div className="RecipesBodyHeader">
                  <div className="RecipesBodyHeaderLeft">
                    <h1>Matching Ingredients Recipes</h1>
                    <p>Here are some recipes that match your ingredients</p>
                  </div>
                  <div className="RecipesBodyHeaderRight">
                    <div className="RecipesBodyHeaderRightTop">
                      <button
                        onClick={() => setSearchMode("fuzzy")}
                        className={
                          searchMode === "fuzzy" ? "active" : "SearchModeButton"
                        }
                        style={{
                          backgroundColor:
                            searchMode === "fuzzy" ? "#234336" : "",
                        }}
                      >
                        Fuzzy
                      </button>
                      <button
                        onClick={() => setSearchMode("strict")}
                        className={
                          searchMode === "strict"
                            ? "active"
                            : "SearchModeButton"
                        }
                        style={{
                          backgroundColor:
                            searchMode === "strict" ? "rgb(133, 60, 60)" : "",
                          boxShadow:
                            searchMode === "strict"
                              ? "0px 0px 10px rgb(133, 60, 60)"
                              : "",
                        }}
                      >
                        Strict
                      </button>
                    </div>
                    <div className="RecipesBodyHeaderRightBottom">
                      <button
                        onClick={() => setDietFilter("Vegetarian")}
                        className={
                          dietFilter === "Vegetarian"
                            ? "activeDiet"
                            : "DietButton"
                        }
                        style={{
                          backgroundColor:
                            dietFilter === "Vegetarian"
                              ? "rgba(11, 90, 7, 0.68)"
                              : "",
                          boxShadow:
                            dietFilter === "Vegetarian"
                              ? "0px 0px 10px rgba(11, 90, 7, 0.68)"
                              : "",
                          borderColor:
                            dietFilter === "Vegetarian"
                              ? "rgba(11, 90, 7, 0.68)"
                              : "",
                        }}
                      >
                        Veg
                      </button>
                      <button
                        onClick={() => setDietFilter("Non Vegeterian")}
                        className={
                          dietFilter === "Non Vegeterian"
                            ? "activeDiet"
                            : "DietButton"
                        }
                        style={{
                          backgroundColor:
                            dietFilter === "Non Vegeterian" ? "red" : "",
                          boxShadow:
                            dietFilter === "Non Vegeterian"
                              ? "0px 0px 10px red"
                              : "",
                          borderColor:
                            dietFilter === "Non Vegeterian" ? "red" : "",
                        }}
                      >
                        Non-Veg
                      </button>
                      <button
                        onClick={() => setDietFilter("any")}
                        className={
                          dietFilter === "any" ? "activeDiet" : "DietButton"
                        }
                      >
                        Any
                      </button>
                    </div>
                  </div>
                </div>

                <div className="RecipesCards">
                  {filteredRecipes.map((recipe) => (
                    <Link
                      to={`/recipe/${recipe.name}/${recipe.id}`}
                      key={recipe.id}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="RecipeCard" key={recipe.id}>
                        <div className="RecipeCardImage">
                          {/* {`../assets${recipe.image}.jpg`} */}
                          {/* <img key={recipe.id} src={new URL(`../assets/recipe_images/Spicy_Soya_Bhurji_Recipe_-_North_Indian_Soya_Matar_Bhurji.jpg`, import.meta.url).href} alt={`${recipe.name}-${recipe.id}`} /> */}
                          {(() => {
                            const imageFileName = recipe.image.split("/").pop(); // Get the last part
                            return (
                              <img
                                key={recipe.id}
                                src={
                                  new URL(
                                    `../assets/recipe_images/${imageFileName}.jpg`,
                                    import.meta.url
                                  ).href
                                }
                                alt={`${recipe.name}-${recipe.id}`}
                              />
                            );
                          })()}
                        </div>
                        <div className="RecipeCardDetails">
                          <CustomTooltip title={recipe.name} key={recipe.id}>
                            <h2>{recipe.name.trim().slice(0, 30) + "..."}</h2>
                          </CustomTooltip>
                          <p>{recipe.description.slice(0, 100)}...</p>
                          <span
                            className="diet"
                            style={{
                              borderColor:
                                recipe.diet_type === "Vegetarian"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            <span
                              className="diet-icon"
                              style={{
                                backgroundColor:
                                  recipe.diet_type === "Vegetarian"
                                    ? "green"
                                    : "red",
                              }}
                            ></span>
                          </span>
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: ".5rem",
                              color: "rgb(10, 129, 73)",
                            }}
                          >
                            <AccessTimeIcon />
                            {parseInt(recipe.prep_time)}&nbsp;minutes
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {filteredRecipes.length === 0 && (
                    <p style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
                      No recipes found for selected filter.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipesPage;
