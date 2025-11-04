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

  const [categoryFilter, setCategoryFilter] = useState(true);
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
      <div className=" p-8 min-h-screen bg-[url('/public/background.svg')]">
        <div>
          <h1 className="h1 text-center">Question Visualizer</h1>
        </div>
        <div className="gap-8 flex max-w-screen-2xl mx-auto my-8 flex-col lg:flex-row items-stretch">
          <div
            id="categoriesSideBar"
            className="w-full lg:w-1/3 flex-none flex max-h-[calc(100vh-12rem)] flex-col p-6 shadow-[0_50px_100px_-20px_rgba(255,255,255,0.2)] rounded-lg lg:sticky lg:top-8"
          >
            <div className="flex p-5">
              <a href="#" className="h4 mr-20 w-1/2 ">
                Questions per Categories
              </a>
              <a href="#" className="text-right h4 mr-20 w-1/2">
                Questions
              </a>{" "}
            </div>

            <ul className="flex-1 overflow-y-auto">
              {/* for each category, enter a new row */}
              {categories.map((categories) => (
                <div
                  key={categories.name}
                  className="flex items-center py-2 border-b last:border-b-0 border-gray-200"
                >
                  <li className="flex-1 break-words whitespace-normal pr-3 body">
                    {categories.name}
                  </li>
                  <li className="text-right tabular-nums w-8 body">
                    {categories.count}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex min-w-0 flex-col flex-1 ">
            <div className="flex mb-4 mt-8  ">
              <Button
                title="category"
                isActive={categoryFilter}
                onClick={() => {
                  setCategoryFilter(!categoryFilter);
                  setSpecificCategory(false);
                  setDifficultyFilter(categoryFilter);
                }}
              />
              <Button
                title="difficulty"
                isActive={difficultyFilter}
                onClick={() => {
                  setDifficultyFilter(!difficultyFilter);
                  setCategoryFilter(difficultyFilter);
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
            <div className="w-auto flex-[5] flex-col p-4  h-auto  shadow-[0_50px_100px_-20px_rgba(255,255,255,0.2)] flex items-center justify-center rounded-lg">
              <div className="h3">
                <h2>{categoryFilter && "Distribution by categories"}</h2>
                <h2>
                  {difficultyFilter && "Distribution by difficulty level"}
                </h2>
              </div>
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
