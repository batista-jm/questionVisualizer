import { Pie, PieChart, Tooltip } from "recharts";

// #region Sample data

// Define the data shape used by the chart
export interface Category {
  name: string;
  value: number;
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
        dataKey="count"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      />
      <Tooltip />
    </PieChart>
  );
}
