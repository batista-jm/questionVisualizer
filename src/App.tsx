import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PieChart from "./components/PieChart";

const API_URL = "https://opentdb.com/api.php?amount=50";

function App() {
  interface Category {
    name: string;
    count: number;
    [key: string]: any;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  //we can reuse interface
  const [difficulties, setDifficulties] = useState<Category[]>([]);

  const [categoryFilter, setCategoryFilter] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState(false);
  const [specificCategory, setSpecificCategory] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_URL);
      const data = await response.json();
      setQuestions(data.results);
      console.log(data);
      console.log(data.results);
      //now we have the data, we retrieve categories and their counts
      const cat = [...new Set(data.results.map((q: any) => q.category))].map(
        (category: any) => ({
          name: category,
          count: data.results.filter((q: any) => q.category === category)
            .length,
        })
      );
      setCategories(cat);
      //we repeat for difficulties
      const diff = [...new Set(data.results.map((q: any) => q.difficulty))].map(
        (difficulty: any) => ({
          name: difficulty,
          count: data.results.filter((q: any) => q.difficulty === difficulty)
            .length,
        })
      );
      setDifficulties(diff);
    }
    getData();
  }, []);

  return (
    <>
      <div>
        <div className="title">
          <h1 className="h1 text-center">Question Visualizer</h1>
        </div>
        <div className="flex m-8">
          <div
            id="categoriesSideBar"
            className="w-[451px] h-[781px] p-12 ml-8 mt-8 border-2 rounded-lg"
          >
            <div className="flex mb-5">
              <a href="#" className="h3 mr-20 w-50">
                Categories
              </a>
              <a href="#" className="h3 mr-20 w-50">
                Questions
              </a>{" "}
            </div>

            <ul className="overflow-y-scroll max-h-[600px]">
              {/* for each cateogory, enter a new row */}
              {categories.map((categories) => (
                <div>
                  <div className="flex items-center">
                    <li className="w-50">{categories.name}</li>
                    <li className=" text-center">{categories.count}</li>
                  </div>
                  -
                </div>
              ))}
            </ul>
          </div>
          <div className="flex-col h-781 w-340">
            <div className="w-340 h-[104] flex">
              <Button
                title="category"
                isActive={categoryFilter}
                onClick={() => {
                  setCategoryFilter(!categoryFilter);
                  setSpecificCategory(false);
                  setDifficultyFilter(false);
                }}
              />
              <Button
                title="difficulty"
                isActive={difficultyFilter}
                onClick={() => {
                  setDifficultyFilter(!difficultyFilter);
                  setCategoryFilter(false);
                }}
              />
              <Button
                title="specific category"
                isActive={specificCategory}
                onClick={() => {
                  setSpecificCategory(!specificCategory);
                  setCategoryFilter(false);
                  setDifficultyFilter(true);
                }}
              />
            </div>
            <div className="w-auto h-[678px] p-12 ml-12 align-center border-2 rounded-lg">
              {difficultyFilter && <PieChart data={difficulties} />}
              {categoryFilter && <PieChart data={categories} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
