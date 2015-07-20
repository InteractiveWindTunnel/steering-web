import {inject} from "aurelia-framework";
import Autobahn from "autobahn";
import d3 from "d3";

@inject(Autobahn)
export class App {
    data = [-1,0,1,2,1,0,-1,0,1,2,1,0,-1,0,1,2,1,0,-1];
    graph = null;
    line = null;
    connected = false;
    chart = null;
    constructor(autobahn) {
        this.connection = new autobahn.Connection({
            url: "ws://ita-crossbar.herokuapp.com/ws",
            realm: "realm1"
        });

        this.connection.onopen = (session, details) => {
            session.subscribe("com.windtunnel.data", ([value]) => this.addToChart(value));
            this.connected  = true;
        };

        this.connection.onclose = () => {
            this.conneted = false;
        }
        this.x = d3.scale.linear().domain([0, 100]).range([0, 900]);
        this.y = d3.scale.linear().domain([-2, 2]).range([0, 100]);
    }

    activate() {
        this.connection.open();
    }

    attached() {
        this.initChart();
    }

    addToChart(value) {
        console.log(value);
        this.data.push(value);
        graph.selectAll("path")
            .data([this.data])
            .attr("transform", "translate(" + this.x(1) + ")")
            .attr("d", this.line)
            .transition()
            .ease("linear")
            .duration(100)
            .attr("transform", "translate(" + this.x(0) + ")");
        if (this.data.length > 100) {
            this.data.shift();
        }
    }

    initChart() {
        this.graph = d3.select(this.chart).append("svg:svg").attr("width", "100%").attr("height", "100%");
        console.log(this.graph);
        this.line = d3.svg.line()
            .x(function(d, i) {
                return this.x(i);
            })
            .y(function(d, i) {
                return this.y(d);
            })
            .interpolate("basis");
        this.graph.append("svg:path").attr("d", this.line(this.data));
    }
}
