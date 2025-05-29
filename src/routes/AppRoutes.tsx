import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import  Dashboard  from "../pages/Dashboard";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Auth/Register";
import  Login  from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import IngredientSelectPage from "../pages/IngredientsSelectPage";
import RecipesPage from "../pages/Recipes";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import CookWithAiPage from "../pages/CookWithAiPage";
import AiGeneratedRecipe from "../pages/AiGeneratedRecipe";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ingredients" element= {<IngredientSelectPage /> } />
                <Route path="/cook_with_ai" element= {<CookWithAiPage /> } />
                <Route path="/recipes" element= {<RecipesPage />} />
                <Route path="/recipe/:name/:id" element={<RecipeDetailPage />} />\
                <Route path="/ai_generated_recipe" element={<AiGeneratedRecipe />} />\
                
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
               
            </Routes>
        </Router>
    )
}

export default AppRoutes