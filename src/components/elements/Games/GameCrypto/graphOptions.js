import moment from "moment/moment";
import {
  $mChain,
  $mChangePrise,
  $mGetPercent,
  $mGetPrice
} from "@utils/mathjs";

function generateTooltip({ seriesIndex, dataPointIndex, w }) {
  let { y, x } = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

  let date = moment(x).format("YYYY MMM");
  let prev = y[0];
  let cur = y[3];

  let dif = $mChangePrise(cur, prev);
  const color = dif > 0 ? "green" : "red";
  const difStr = $mGetPercent(dif);

  let prevStr = $mGetPrice($mChain(prev).round(2));

  let curStr = $mGetPrice($mChain(cur).round(2));

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
        return $mGetPrice($mChain(val).round(2));
      }
    },
    tooltip: {
      enabled: true
    }
  }
};
