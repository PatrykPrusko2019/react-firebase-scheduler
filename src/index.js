import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop
} from "@syncfusion/ej2-react-schedule";

import { extend } from "@syncfusion/ej2-base";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { SampleBase } from "./sample-base";
import { PropertyPane } from "./property-pane";
import * as dataSource from "./datasource.json";
import { db } from "./config.js";
/**
 * Schedule Default sample
 */
export class Default extends SampleBase {
  constructor() {å
    super(...arguments);
    db.collection("Data")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.test = data;
        this.data = db.collection("Data");
        let length = this.test.length;
        for (let i = 0; i < length; i++) {
          let endTime = this.test[i].EndTime.seconds.toString() + "000";
          let srtTime = this.test[i].StartTime.seconds.toString() + "000";
          this.test[i].StartTime = new Date(parseInt(srtTime));
          this.test[i].EndTime = new Date(parseInt(endTime));
        }
        this.scheduleObj.eventSettings.dataSource = this.test;
      });
  }
  GuidFun() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  onActionBegin(args) {
    if (args.requestType == "eventChange") {
      this.data
        .doc(args.changedRecords[0].DocumentId)
        .update({ Subject: args.changedRecords[0].Subject });
      this.data
        .doc(args.changedRecords[0].DocumentId)
        .update({ EndTime: args.changedRecords[0].EndTime });
      this.data
        .doc(args.changedRecords[0].DocumentId)
        .update({ StartTime: args.changedRecords[0].StartTime });
      this.data
        .doc(args.changedRecords[0].DocumentId)
        .update({ Location: args.changedRecords[0].Location });
      this.data
        .doc(args.changedRecords[0].DocumentId)
        .update({ IsAllDay: args.changedRecords[0].IsAllDay });
      this.data
        .doc(args.changedRecords[0].DocumentId)
        .update({ RecurrenceRule: args.changedRecords[0].RecurrenceRule });
    } else if (args.requestType == "eventCreate") {
      let guid = (
        this.GuidFun() +
        this.GuidFun() +
        "-" +
        this.GuidFun() +
        "-4" +
        this.GuidFun().substr(0, 3) +
        "-" +
        this.GuidFun() +
        "-" +
        this.GuidFun() +
        this.GuidFun() +
        this.GuidFun()
      ).toLowerCase();
      args.data[0].DocumentId = guid.toString();
      this.data.doc(guid).set(args.data[0]);
    } else if (args.requestType == "eventRemove") {
      this.data.doc(args.deletedRecords[0].DocumentId).delete();
    }
  }
  render() {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-9 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              height="650px"
              ref={schedule => (this.scheduleObj = schedule)}
              currentView="Month"
              actionBegin={this.onActionBegin.bind(this)}
              selectedDate={new Date(2019, 8, 27)}
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

render(<Default />, document.getElementById("sample"));
