import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CampaignsChart({ active, completed }) {
  const data = [
    { name: "Active", value: active },
    { name: "Completed", value: completed },
  ];

  const COLORS = ["#3b82f6", "#10b981"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
