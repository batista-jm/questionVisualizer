import { Pie, PieChart, Tooltip, Cell } from "recharts";

const DIFFICULTY_COLORS: { [key: string]: string } = {
  easy: "#22c55e",
  medium: "#ffff13ff",
  hard: "#ef4444",
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7c7c",
  "#a4de6c",
  "#d0ed57",
  "#83a6ed",
  "#8dd1e1",
];

// Define the data shape used by the chart
export interface Category {
  name: string;
  value: number;
  label?: string;
  [key: string]: any;
}

// #endregion
export default function TwoLevelPieChart({
  isAnimationActive = true,
  data,
}: {
  isAnimationActive?: boolean;
  data: Category[];
}) {
  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        label={({ value }) => value}
        dataKey="count"
        cx="50%"
        cy="50%"
        outerRadius="75%"
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              DIFFICULTY_COLORS[entry.name] || COLORS[index % COLORS.length]
            }
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
