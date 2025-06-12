import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export const Chart = ({ type = "line", height = 350, series, categories }) => {
  const chartRef = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    const options = {
      series,
      chart: {
        type,
        height,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        position: "top",
        style: {
          colors: ["#333"],
        },
      },
      stroke: {
        show: true,
        width: [...series.map(() => 1)],
      },
      xaxis: {
        categories,
      },
      yaxis: [
        {
          title: {
            text: "점수",
          },
        },
        {
          opposite: true,
          title: {
            text: "수강생 평균",
          },
        },
      ],
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val}점`;
          },
        },
      },
      legend: {
        show: true,
        position: "right",
      },
    };

    if (!chart.current) {
      chart.current = new ApexCharts(chartRef.current, options);
      chart.current.render();
    }
  }, [height, type, categories, series]);

  return (
    <div>
      <div ref={chartRef}></div>
    </div>
  );
};
