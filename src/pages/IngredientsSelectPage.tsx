import { useEffect, useState } from "react";
import {
  Chip,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import "../styles/IngredSelectPage.scss";
import { fetchAllIngredients } from "../services/aiEngine";
import AyakaLogo from "../assets/AyakaLogo.svg";
import FuzzyIcon from "../assets/FuzzyIcon.svg";
import StrictIcon from "../assets/StrictIcon.svg";
import Vector2 from "../assets/vector2.svg";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    color: "#1F3F32",
    backgroundColor: "rgba(242, 242, 242, 0.16)",
  },
});

const supportingIngredientsList = ["Pepper", "Garlic", "Basil", "Rice", "Beef"];

type IngredientType = "main" | "supporting";

interface SelectedIngredient {
  name: string;
  type: IngredientType;
}

const IngredientSelectPage = () => {
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [searchMode, setSearchMode] = useState<"fuzzy" | "strict">("fuzzy");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shownIngredientsCount, setShownIngredientsCount] = useState(50);

  const navigate = useNavigate();


  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await fetchAllIngredients();
        const cleanedRecipes = (response|| []).filter(
            (ingred) => ingred.trim() !== ""
          );
        setAvailableIngredients(cleanedRecipes);
        // console.log("Fetched ingredients:", response);/
        
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    getIngredients();
  }, []);

  const allIngredients = [
    ...availableIngredients.map((name) => ({ name, type: "main" as IngredientType })),
    ...supportingIngredientsList.map((name) => ({ name, type: "supporting" as IngredientType })),
  ];

  const handleChipClick = (ingredient: { name: string; type: IngredientType }) => {
    setSelectedIngredients((prev) => {
      const isAlreadySelected = prev.some(
        (i) => i.name === ingredient.name && i.type === ingredient.type
      );
      if (isAlreadySelected) {
        return prev.filter(
          (i) => !(i.name === ingredient.name && i.type === ingredient.type)
        );
      } else {
        return [...prev, ingredient];
      }
    });
    setSearchQuery("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const match = allIngredients.find((ing) => {
      if (searchMode === "fuzzy") {
        return ing.name.toLowerCase().includes(searchQuery.toLowerCase());
      } else {
        return ing.name.toLowerCase() === searchQuery.toLowerCase();
      }
    });
    if (match) {
      handleChipClick(match);
    }
  };

  const filteredMainIngredients = availableIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSupportingIngredients = supportingIngredientsList.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase())
  );

const handleShowMoreClick = () => {
  setShownIngredientsCount((prev) => prev + 50);
};

const filteredIngredients = [...filteredMainIngredients, ...filteredSupportingIngredients].slice(0, shownIngredientsCount);

const data = {
    ingredients: selectedIngredients.map((ing) => ing.name),
    searchMode: searchMode
}


  return (
    <div className="QuickIngredPage">
      <div className="QuickIngredContainer">
        {/* Background Vectors */}
        <div className="BgVector1">
          <img src={Vector2} alt="" />
        </div>
        <div className="BgVector2">
          <img src={Vector2} alt="" />
        </div>
        <div className="BgVector3">
          <img src={Vector2} alt="" />
        </div>

        {/* Content */}
        <div className="QuickIngredContent">
          {/* Navbar */}
          <div className="QuickIngredNav">
            <span className="AyakaLogo">
              <img src={AyakaLogo} alt="logo" />
            </span>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                label="Search Ingredients"
                autoComplete="off"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Type an ingredient..."
                InputLabelProps={{
                  style: { color: "#F8A92E" },
                }}
                InputProps={{
                  style: { color: "#F8A92E" },
                }}
                sx={{
                  width: "50vw",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#F8A92E",
                      borderRadius: "4rem",
                      backgroundColor: "rgba(51, 119, 78, 0.08)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#F8A92E",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F8A92E",
                      boxShadow: "0 0 200px rgba(248, 171, 46, 0.35)",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(248, 171, 46, 0.42)",
                    opacity: 1,
                  },
                }}
              />
            </form>
          </div>

          {/* Body */}
          <div className="QuickIngredBody">
            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div className="SelectedIngredients">
                <h2>Selected Ingredients</h2>
                {selectedIngredients.map((ingredient) => (
                  <Chip
                    key={`${ingredient.name.toLowerCase()}-${ingredient.type}`}
                    label={ingredient.name}
                    onDelete={() =>
                      setSelectedIngredients((prev) =>
                        prev.filter(
                          (i) => !(i.name === ingredient.name && i.type === ingredient.type)
                        )
                      )
                    }
                    style={{
                      margin: "5px",
                      backgroundColor:
                        ingredient.type === "main"
                          ? "rgba(50, 238, 56, 0.43)"
                          : "rgba(248, 21, 21, 0.43)",
                      color: "#e9e9e9",
                      fontSize: ".8rem",
                      border:
                        ingredient.type === "main"
                          ? "solid 1px rgb(50, 238, 56)"
                          : "solid 1px rgb(248, 21, 21)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Main Ingredients */}
            <div className="MainIngredients">
              <h2>Main Ingredients</h2>
              {filteredMainIngredients.length > 0 ? (
                filteredIngredients.map((ingredient) => (
                  <Chip
                    key={`main-${ingredient}`}
                    label={ingredient}
                    clickable
                    onClick={() =>
                      handleChipClick({ name: ingredient, type: "main" })
                    }
                    style={{
                      margin: "5px",
                      fontSize: ".8rem",
                      border: selectedIngredients.some(
                        (i) => i.name === ingredient && i.type === "main"
                      )
                        ? "solid 1px #00ff00"
                        : "solid 1px rgb(6, 127, 22)",
                      color: "rgba(233, 233, 233, 0.8)",
                      backgroundColor: selectedIngredients.some(
                        (i) => i.name === ingredient && i.type === "main"
                      )
                        ? "rgba(0, 255, 0, 0.3)"
                        : "rgba(12, 44, 19, 0.35)",
                    }}
                  />
                ))
              ) : (
                <p>No matching ingredients</p>
              )}
             <Chip
                label="Show More Ingredients...."
                clickable
                onClick= {handleShowMoreClick}
                style={{
                  margin: "5px",
                  fontSize: ".8rem",
                  border: "solid 1px rgba(255, 255, 255, 0.48)",
                  color: "rgba(233, 233, 233, 0.8)",
                  backgroundColor: "  rgba(20, 186, 125, 0.48)",
                }}
                />
            </div>

            {/* Supporting Ingredients */}
            <div className="SupportingIngredients">
              <h2>Supporting Ingredients</h2>
              {filteredSupportingIngredients.length > 0 ? (
                filteredSupportingIngredients.map((ingredient) => (
                  <Chip
                    key={`supporting-${ingredient}`}
                    label={ingredient}
                    clickable
                    onClick={() =>
                      handleChipClick({ name: ingredient, type: "supporting" })
                    }
                    style={{
                      margin: "5px",
                      fontSize: ".8rem",
                      border: selectedIngredients.some(
                        (i) => i.name === ingredient && i.type === "supporting"
                      )
                        ? "solid 1px red"
                        : "solid 1px rgba(255, 99, 71, 0.5)",
                      color: "rgba(233, 233, 233, 0.8)",
                      backgroundColor: selectedIngredients.some(
                        (i) => i.name === ingredient && i.type === "supporting"
                      )
                        ? "rgba(255, 0, 0, 0.48)"
                        : "rgba(52, 15, 9, 0.1)",
                    }}
                  />
                ))
              ) : (
                <p>No matching ingredients</p>
              )}
            </div>

            {/* Search Mode Buttons */}
            <div className="SearchMode">
              <div style={{ display: "flex", gap: "1rem" }}>
                <CustomTooltip title="Allowing approximate, flexible matching.">
                  <Button
                    variant={searchMode === "fuzzy" ? "contained" : "outlined"}
                    onClick={() => setSearchMode("fuzzy")}
                    sx={{
                      color: "#9C9C9C",
                      border: "solid 1px #9C9C9C",
                      width: "5rem",
                      "&.MuiButton-contained": {
                        backgroundColor: "#1F3F32",
                        color: "white",
                      },
                      "&:hover": {
                        backgroundColor: "rgb(59, 95, 80)",
                        border: "solid 1px #9C9C9C",
                      },
                    }}
                  >
                    <img src={FuzzyIcon} alt="" />
                    <p>Fuzzy</p>
                  </Button>
                </CustomTooltip>
                <CustomTooltip title="Requiring exact, precise matching only">
                  <Button
                    variant={searchMode === "strict" ? "contained" : "outlined"}
                    onClick={() => setSearchMode("strict")}
                    sx={{
                      color: "#1F3F32",
                      border: "solid 1px #9C9C9C",
                      width: "5rem",
                      "&.MuiButton-contained": {
                        backgroundColor: "#1F3F32",
                        color: "white",
                      },
                      "&:hover": {
                        backgroundColor: "rgb(59, 95, 80)",
                        border: "solid 1px #9C9C9C",
                      },
                    }}
                  >
                    <img src={StrictIcon} alt="" />
                    <p>Strict</p>
                  </Button>
                </CustomTooltip>
              </div>
            </div>

            {/* Cook Button */}
            <div className="CookButton" onClick={()=> navigate("/recipes",{state: data})}>Cook</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientSelectPage;
