import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/AiGeneratedRecipe.scss";
import AyakaLogo from "../assets/AyakaLogo.svg";
import Vector2 from "../assets/vector2.svg";

const AiGeneratedRecipe = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!state || !state.ingredients || !Array.isArray(state.ingredients)) {
      navigate("/cook_with_ai");
      return;
    }

    const fetchRecipe = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/cook_with_ai",
          {
            ingredients: state.ingredients,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [navigate, state]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="AiRecipesPage">
          {recipe ? (
            <div className="QuickIngredPage">
              <div className="QuickIngredContainer">
                <div className="BgVector1">
                  <img src={Vector2} alt="" />
                </div>
                <div className="BgVector2">
                  <img src={Vector2} alt="" />
                </div>
                <div className="BgVector3">
                  <img src={Vector2} alt="" />
                </div>

                <div className="QuickIngredContent">
                  <div className="QuickIngredNav">
                    <span className="AyakaLogo">
                      <img src={AyakaLogo} alt="logo" onClick={() => navigate("/")} />
                    </span>
                  </div>

                  <div className="QuickIngredBody AiGeneratedRecipe">
                    {recipe.title && (
                      <div className="section">
                        <h3 className="sectionHead">Title</h3>
                        <p className="sectionBody">{recipe.title}</p>
                      </div>
                    )}

                    {recipe.author && (
                      <div className="section">
                        <h3 className="sectionHead">Author</h3>
                        <p className="sectionBody">{recipe.author}</p>
                      </div>
                    )}

                    {recipe.ingredients?.length > 0 && (
                      <div className="section">
                        <h3 className="sectionHead">Ingredients</h3>
                        <ul className="sectionBody">
                          {recipe.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recipe.directions?.length > 0 && (
                      <div className="section">
                        <h3 className="sectionHead">Directions</h3>
                        <ol className="sectionBody">
                          {recipe.directions.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {recipe.instructions?.length > 0 && (
                      <div className="section">
                        <h3 className="sectionHead">Instructions</h3>
                        <ol className="sectionBody">
                          {recipe.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {recipe.methods?.length > 0 && (
                      <div className="section">
                        <h3 className="sectionHead">Methods</h3>
                        <ul className="sectionBody">
                          {recipe.methods.map((method, index) => (
                            <li key={index}>{method}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recipe.preparations?.length > 0 && (
                      <div className="section">
                        <h3 className="sectionHead">Preparations</h3>
                        <ul className="sectionBody">
                          {recipe.preparations.map((prep, index) => (
                            <li key={index}>{prep}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recipe.source && (
                      <div className="section">
                        <h3 className="sectionHead">Source</h3>
                        <p className="sectionBody">{recipe.source}</p>
                      </div>
                    )}
                  </div>
                </div>
              <div className="CookButton" onClick={()=> navigate(0)}>Regenerate</div>
              </div>
            </div>
          ) : (
            <p>No recipe found. Try different ingredients.</p>
          )}

        </div>
      )}
    </>
  );
};

export default AiGeneratedRecipe;
