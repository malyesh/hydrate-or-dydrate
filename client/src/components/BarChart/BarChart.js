import { Bar } from "react-chartjs-2";

export default function BarChart({ waterLvl, coffeeLvl }) {
  const chartData = {
    labels: ["", ""],
    datasets: [
      {
        label: "hydration",
        data: [coffeeLvl, waterLvl],
        backgroundColor: ["#563635", "#80a4ED"],
      },
    ],
  };
  return (
    <section className="chart">
      <h1 className="chart__title">HYDRATION LEVELS</h1>
      <div className="chart__container">
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                display: false,
              },
              y: {
                ticks: {
                  font: {
                    size: 11,
                    family: '"Poppins", Arial, Helvetica, sans-serif',
                  },
                },
              },
            },
            plugins: {
              title: {
                display: false,
                text: "Hydration",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </section>
  );
}
