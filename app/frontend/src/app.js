import {inject} from "aurelia-framework";
import Autobahn from "autobahn";
import d3 from "d3";

@inject(Autobahn)
export class App {
    data = [];
    graph = null;
    line = null;
    connected = false;
    chart = null;
    constructor(autobahn) {
        for (let i = 0; i < 100; i++) {
            this.data.push(0);
        }
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
        this.data.push(value);
        this.graph.selectAll("path")
            .attr("d", this.line(this.data))
            .attr("transform", null)
            .transition()
            .attr("transform", "translate(" + this.x(-1) + ")");
        if (this.data.length > 100) {
            this.data.shift();
        }
    }

    initChart() {
        this.graph = d3.select(this.chart).append("svg:svg").attr("width", "100%").attr("height", "100%");
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
