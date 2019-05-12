// ..... CLEANING THE DATA .....
var data = [];
const wrapper = d3.select("#passports-container");
console.log(wrapper);

d3.csv("data/colors.csv", function(d, i) {
  data.push({
    country: d.Country,
    r: toRgb(d.R),
    g: toRgb(d.G),
    b: toRgb(d.B)
  });

  let item = wrapper.append("div");
  //item.append("h2").text(data[i].country);
  item
    .append("svg")
    .attr("class", "icon")
    .style(
      "color",
      "rgb(" + data[i].r + "," + data[i].g + "," + data[i].b + ")"
    )
    .append("use")
    .attr("xlink:href", "#passport");
});

function toRgb(val) {
  // convert strings to valid RGB values
  return parseInt(parseFloat(val) * 255);
}

console.log(data);

// ..... BINDING DATA .....
// append each item to svg

// add rgb color as bg
// add country name to svg
