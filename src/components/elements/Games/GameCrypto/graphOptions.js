import moment from "moment/moment";
import { createNumber } from "@/utils/createNumber";

function generateTooltip({ seriesIndex, dataPointIndex, w }) {
  let { y, x } = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

  let date = moment(x).format("YYYY MMM");
  let prev = y[0];
  let cur = y[3];

  let dif = createNumber(cur / prev)
    .changePrise()
    .round();

  const color = dif.number > 0 ? "green" : "red";
  let difStr = dif.getPercent();

  let prevStr = createNumber(prev)
    .round()
    .getPrice();
  let curStr = createNumber(cur)
    .round()
    .getPrice();

  return `
      <table style="background-color: #555555; padding: 3px">
        <tr>
          <td>Date:</td>
          <td>${date}</td>
        </tr>
        <tr>
          <td>Open:</td>
          <td>${prevStr}</td>
        </tr>
        <tr>
          <td>Close:</td>
          <td>${curStr}</td>
        </tr>
        <tr>
          <td style="padding-right: 5px">Grow/Loss:</td>
          <td align="center" style="background-color: ${color}">${difStr}</td>
        </tr>
      </table>
      `;
}

export const options = {
  chart: {
    type: "candlestick"
  },
  tooltip: {
    custom: generateTooltip
  },
  xaxis: {
    type: "datetime"
  },
  yaxis: {
    labels: {
      formatter(val) {
        return createNumber(val)
          .round(0)
          .getPrice();
      }
    },
    tooltip: {
      enabled: true
    }
  }
};
