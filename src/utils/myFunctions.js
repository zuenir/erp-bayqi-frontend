import moment from "moment/dist/moment";
import "moment/dist/locale/pt-br";

export const formDataColors = [
  "#DAF7A6",
  "#E9967A",
  "#A9A9A9",
  "#FFC300",
  "#00008B",
  "#FF8C00",
  "#FF0000",
  "#800000",
  "#DE3163",
  "#FF7F50",
  "#FFBF00",
  "#FFFF00",
  "#808000",
  "#00FF00",
  "#008000",
  "#9FE2BF",
  "#40E0D0",
  "#CCCCFF",
  "#6495ED",
  "#00FFFF",
  "#008080",
  "#0000FF",
  "#000080",
  "#FF00FF",
  "#800080",
  "#4B0082",
  "#1E90FF",
  "#2F4F4F",
  "#0000FF",
  "#DAA520",
  "#FF69B4",
  "#DDA0DD",
  "#C71585",
  "#8A2BE2",
  "#663399",
  "#8B0000",
  "#D2691E",
  "#FFA07A",
  "#FFFACD",
  "#F0E68C",
  "#800000",
];

export function* uniqIter(a) {
  let seen = new Set();

  for (let x of a) {
    if (!seen.has(x)) {
      seen.add(x);
      yield x;
    }
  }
}

export const getDateFull = (valor) => {
  if (valor !== "") {
    return moment(valor).format("DD/MM/YYYY");
  } else {
    let result = "";
    return result;
  }
};

export const getDateDay = (day, valor) => {
  if (valor !== "") {
    let newValor = moment(valor).format("DD/MM/YYYY");
    let result = newValor.split("/").map((res) => res.trim());
    return `${day}/${result[1]}/${result[2]}`;
  } else {
    let result = "";
    return result;
  }
};

export const getDateMonthYear = (date) => {
  if (date !== "") {
    let newValor = moment(date).format("DD/MM/YYYY");
    let result = newValor.split("/").map((res) => res.trim());
    return `${result[1]}/${result[2]}`;
  } else {
    let result = "";
    return result;
  }
};
