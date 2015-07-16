import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-framework";
import Autobahn from "autobahn";

@inject(EventAggregator, Autobahn)
export class App {
    messages = [];
    constructor(eventAggregator, autobahn) {
        this.eventAggregator = eventAggregator;
        this.autobahn = autobahn;
        this._session = null;
        this._connection = null;
        this.messages = [];
    }

    activate() {
        this._connection = new this.autobahn.Connection({
            url: 'ws://ita-crossbar.herokuapp.com/ws',
            realm: 'realm1',
            use_es6_promises: true,
        });
        this._connection.onopen = this.onopen.bind(this);
        this._connection.open();
    }

    onopen (session, details) {
        this._session = session;
        session.subscribe('com.example.oncounter', ([arg1]) => this.messages.push(arg1));
        this.eventAggregator.publish('app.session.open', {session: session, details: details});
    }
}
