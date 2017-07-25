/**
 * Created by julieanderson on 7/24/17.
 */

var margin = {top: 20, right: 10, bottom: 40, left: 30};
//Width and height
var w = 500;
var h = 400;

var x = d3.scaleBand()
    .range([0,w])
    .padding(0.2);

var y = d3.scaleLinear()
    .range([h,0]);

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
d3.csv("data.csv", function(error, data) {
    if (error) throw error;
    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    x.domain(data.map(function (d) {
        return d.salesperson;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.sales;
    })]);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return h - y(d.sales);
        })
        .attr("x", function (d) {
            return x(d.salesperson);
        })
        .attr("y", function (d) {
            return y(d.sales)
        })
        .attr("fill", "#f39212");

    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
});

