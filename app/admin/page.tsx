import Image from 'next/image';

export default function Admin() {
  return (
    <>

      <section className="content-header">
        <h1>
          Dashboard
          <small>Control panel</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <a href="#">
              <i className="fa fa-dashboard" /> Home
            </a>
          </li>
          <li className="active">Dashboard</li>
        </ol>
      </section>
      {/* Main content */}
      <section className="content">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-aqua">
              <div className="inner">
                <h3>150</h3>
                <p>New Orders</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fa fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-green">
              <div className="inner">
                <h3>
                  53<sup style={{ fontSize: 20 }}>%</sup>
                </h3>
                <p>Bounce Rate</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fa fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-yellow">
              <div className="inner">
                <h3>44</h3>
                <p>User Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fa fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box bg-red">
              <div className="inner">
                <h3>65</h3>
                <p>Unique Visitors</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fa fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
        </div>
        {/* /.row */}
        {/* top row */}
        <div className="row">
          <div className="col-xs-12 connectedSortable"></div>
          {/* /.col */}
        </div>
        {/* /.row */}
        {/* Main row */}
        <div className="row">
          {/* Left col */}
          <section className="col-lg-6 connectedSortable">
            {/* Box (with bar chart) */}
            <div className="box box-danger" id="loading-example">
              <div className="box-header">
                {/* tools box */}
                <div className="pull-right box-tools">
                  <button
                    className="btn btn-danger btn-sm refresh-btn"
                    data-toggle="tooltip"
                    title="Reload"
                  >
                    <i className="fa fa-refresh" />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    data-widget="collapse"
                    data-toggle="tooltip"
                    title="Collapse"
                  >
                    <i className="fa fa-minus" />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    data-widget="remove"
                    data-toggle="tooltip"
                    title="Remove"
                  >
                    <i className="fa fa-times" />
                  </button>
                </div>
                {/* /. tools */}
                <i className="fa fa-cloud" />
                <h3 className="box-title">Server Load</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body no-padding">
                <div className="row">
                  <div className="col-sm-7">
                    {/* bar chart */}
                    <div
                      className="chart"
                      id="bar-chart"
                      style={{ height: 250 }}
                    />
                  </div>
                  <div className="col-sm-5">
                    <div className="pad">
                      {/* Progress bars */}
                      <div className="clearfix">
                        <span className="pull-left">Bandwidth</span>
                        <small className="pull-right">10/200 GB</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-green"
                          style={{ width: "70%" }}
                        />
                      </div>
                      <div className="clearfix">
                        <span className="pull-left">Transfered</span>
                        <small className="pull-right">10 GB</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-red"
                          style={{ width: "70%" }}
                        />
                      </div>
                      <div className="clearfix">
                        <span className="pull-left">Activity</span>
                        <small className="pull-right">73%</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-light-blue"
                          style={{ width: "70%" }}
                        />
                      </div>
                      <div className="clearfix">
                        <span className="pull-left">FTP</span>
                        <small className="pull-right">30 GB</small>
                      </div>
                      <div className="progress xs">
                        <div
                          className="progress-bar progress-bar-aqua"
                          style={{ width: "70%" }}
                        />
                      </div>
                      {/* Buttons */}
                      <p>
                        <button className="btn btn-default btn-sm">
                          <i className="fa fa-cloud-download" /> Generate PDF
                        </button>
                      </p>
                    </div>
                    {/* /.pad */}
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row - inside box */}
              </div>
              {/* /.box-body */}
              <div className="box-footer">
                <div className="row">
                  <div
                    className="col-xs-4 text-center"
                    style={{ borderRight: "1px solid #f4f4f4" }}
                  >
                    <input
                      type="text"
                      className="knob"
                      data-readonly="true"
                      defaultValue={80}
                      data-width={60}
                      data-height={60}
                      data-fgcolor="#f56954"
                    />
                    <div className="knob-label">CPU</div>
                  </div>
                  {/* ./col */}
                  <div
                    className="col-xs-4 text-center"
                    style={{ borderRight: "1px solid #f4f4f4" }}
                  >
                    <input
                      type="text"
                      className="knob"
                      data-readonly="true"
                      defaultValue={50}
                      data-width={60}
                      data-height={60}
                      data-fgcolor="#00a65a"
                    />
                    <div className="knob-label">Disk</div>
                  </div>
                  {/* ./col */}
                  <div className="col-xs-4 text-center">
                    <input
                      type="text"
                      className="knob"
                      data-readonly="true"
                      defaultValue={30}
                      data-width={60}
                      data-height={60}
                      data-fgcolor="#3c8dbc"
                    />
                    <div className="knob-label">RAM</div>
                  </div>
                  {/* ./col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.box-footer */}
            </div>
            {/* /.box */}
            {/* Custom tabs (Charts with tabs)*/}
            <div className="nav-tabs-custom">
              {/* Tabs within a box */}
              <ul className="nav nav-tabs pull-right">
                <li className="active">
                  <a href="#revenue-chart" data-toggle="tab">
                    Area
                  </a>
                </li>
                <li>
                  <a href="#sales-chart" data-toggle="tab">
                    Donut
                  </a>
                </li>
                <li className="pull-left header">
                  <i className="fa fa-inbox" /> Sales
                </li>
              </ul>
              <div className="tab-content no-padding">
                {/* Morris chart - Sales */}
                <div
                  className="chart tab-pane active"
                  id="revenue-chart"
                  style={{ position: "relative", height: 300 }}
                />
                <div
                  className="chart tab-pane"
                  id="sales-chart"
                  style={{ position: "relative", height: 300 }}
                />
              </div>
            </div>
            {/* /.nav-tabs-custom */}
            {/* Calendar */}
            <div className="box box-warning">
              <div className="box-header">
                <i className="fa fa-calendar" />
                <div className="box-title">Calendar</div>
                {/* tools box */}
                <div className="pull-right box-tools">
                  {/* button with a dropdown */}
                  <div className="btn-group">
                    <button
                      className="btn btn-warning btn-sm dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-bars" />
                    </button>
                    <ul className="dropdown-menu pull-right" role="menu">
                      <li>
                        <a href="#">Add new event</a>
                      </li>
                      <li>
                        <a href="#">Clear events</a>
                      </li>
                      <li className="divider" />
                      <li>
                        <a href="#">View calendar</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /. tools */}
              </div>
              {/* /.box-header */}
              <div className="box-body no-padding">
                {/*The calendar */}
                <div id="calendar" />
              </div>
              {/* /.box-body */}
            </div>
            {/* /.box */}
            {/* quick email widget */}
            <div className="box box-info">
              <div className="box-header">
                <i className="fa fa-envelope" />
                <h3 className="box-title">Quick Email</h3>
                {/* tools box */}
                <div className="pull-right box-tools">
                  <button
                    className="btn btn-info btn-sm"
                    data-widget="remove"
                    data-toggle="tooltip"
                    title="Remove"
                  >
                    <i className="fa fa-times" />
                  </button>
                </div>
                {/* /. tools */}
              </div>
              <div className="box-body">
                <form action="#" method="post">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="emailto"
                      placeholder="Email to:"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <textarea
                      className="textarea"
                      placeholder="Message"
                      style={{
                        width: "100%",
                        height: 125,
                        fontSize: 14,
                        lineHeight: 18,
                        border: "1px solid #dddddd",
                        padding: 10
                      }}
                      defaultValue={""}
                    />
                  </div>
                </form>
              </div>
              <div className="box-footer clearfix">
                <button className="pull-right btn btn-default" id="sendEmail">
                  Send <i className="fa fa-arrow-circle-right" />
                </button>
              </div>
            </div>
          </section>
          {/* /.Left col */}
          {/* right col (We are only adding the ID to make the widgets sortable)*/}
          <section className="col-lg-6 connectedSortable">
            {/* Map box */}
            <div className="box box-primary">
              <div className="box-header">
                {/* tools box */}
                <div className="pull-right box-tools">
                  <button
                    className="btn btn-primary btn-sm daterange pull-right"
                    data-toggle="tooltip"
                    title="Date range"
                  >
                    <i className="fa fa-calendar" />
                  </button>
                  <button
                    className="btn btn-primary btn-sm pull-right"
                    data-widget="collapse"
                    data-toggle="tooltip"
                    title="Collapse"
                    style={{ marginRight: 5 }}
                  >
                    <i className="fa fa-minus" />
                  </button>
                </div>
                {/* /. tools */}
                <i className="fa fa-map-marker" />
                <h3 className="box-title">Visitors</h3>
              </div>
              <div className="box-body no-padding">
                <div id="world-map" style={{ height: 300 }} />
                <div className="table-responsive">
                  {/* .table - Uses sparkline charts*/}
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>Country</th>
                        <th>Visitors</th>
                        <th>Online</th>
                        <th>Page Views</th>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">USA</a>
                        </td>
                        <td>
                          <div id="sparkline-1" />
                        </td>
                        <td>209</td>
                        <td>239</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">India</a>
                        </td>
                        <td>
                          <div id="sparkline-2" />
                        </td>
                        <td>131</td>
                        <td>958</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Britain</a>
                        </td>
                        <td>
                          <div id="sparkline-3" />
                        </td>
                        <td>19</td>
                        <td>417</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Brazil</a>
                        </td>
                        <td>
                          <div id="sparkline-4" />
                        </td>
                        <td>109</td>
                        <td>476</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">China</a>
                        </td>
                        <td>
                          <div id="sparkline-5" />
                        </td>
                        <td>192</td>
                        <td>437</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Australia</a>
                        </td>
                        <td>
                          <div id="sparkline-6" />
                        </td>
                        <td>1709</td>
                        <td>947</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* /.table */}
                </div>
              </div>
              {/* /.box-body*/}
              <div className="box-footer">
                <button className="btn btn-info">
                  <i className="fa fa-download" /> Generate PDF
                </button>
                <button className="btn btn-warning">
                  <i className="fa fa-bug" /> Report Bug
                </button>
              </div>
            </div>
            {/* /.box */}
            {/* Chat box */}
            <div className="box box-success">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-comments-o" /> Chat
                </h3>
                <div
                  className="box-tools pull-right"
                  data-toggle="tooltip"
                  title="Status"
                >
                  <div className="btn-group" data-toggle="btn-toggle">
                    <button
                      type="button"
                      className="btn btn-default btn-sm active"
                    >
                      <i className="fa fa-square text-green" />
                    </button>
                    <button type="button" className="btn btn-default btn-sm">
                      <i className="fa fa-square text-red" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="box-body chat" id="chat-box">
                {/* chat item */}
                <div className="item">
                  <img src="/admin/img/avatar.png" alt="user image" className="online" />
                  <p className="message">
                    <a href="#" className="name">
                      <small className="text-muted pull-right">
                        <i className="fa fa-clock-o" /> 2:15
                      </small>
                      Mike Doe
                    </a>
                    I would like to meet you to discuss the latest news about the
                    arrival of the new theme. They say it is going to be one the
                    best themes on the market
                  </p>
                  <div className="attachment">
                    <h4>Attachments:</h4>
                    <p className="filename">Theme-thumbnail-image.jpg</p>
                    <div className="pull-right">
                      <button className="btn btn-primary btn-sm btn-flat">
                        Open
                      </button>
                    </div>
                  </div>
                  {/* /.attachment */}
                </div>
                {/* /.item */}
                {/* chat item */}
                <div className="item">
                  <img
                    src="/admin/img/avatar2.png"
                    alt="user image"
                    className="offline"
                  />
                  <p className="message">
                    <a href="#" className="name">
                      <small className="text-muted pull-right">
                        <i className="fa fa-clock-o" /> 5:15
                      </small>
                      Jane Doe
                    </a>
                    I would like to meet you to discuss the latest news about the
                    arrival of the new theme. They say it is going to be one the
                    best themes on the market
                  </p>
                </div>
                {/* /.item */}
                {/* chat item */}
                <div className="item">
                  <img
                    src="/admin/img/avatar3.png"
                    alt="user image"
                    className="offline"
                  />
                  <p className="message">
                    <a href="#" className="name">
                      <small className="text-muted pull-right">
                        <i className="fa fa-clock-o" /> 5:30
                      </small>
                      Susan Doe
                    </a>
                    I would like to meet you to discuss the latest news about the
                    arrival of the new theme. They say it is going to be one the
                    best themes on the market
                  </p>
                </div>
                {/* /.item */}
              </div>
              {/* /.chat */}
              <div className="box-footer">
                <div className="input-group">
                  <input className="form-control" placeholder="Type message..." />
                  <div className="input-group-btn">
                    <button className="btn btn-success">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /.box (chat box) */}
            {/* TO DO List */}
            <div className="box box-primary">
              <div className="box-header">
                <i className="ion ion-clipboard" />
                <h3 className="box-title">To Do List</h3>
                <div className="box-tools pull-right">
                  <ul className="pagination pagination-sm inline">
                    <li>
                      <a href="#">«</a>
                    </li>
                    <li>
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">»</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                <ul className="todo-list">
                  <li>
                    {/* drag handle */}
                    <span className="handle">
                      <i className="fa fa-ellipsis-v" />
                      <i className="fa fa-ellipsis-v" />
                    </span>
                    {/* checkbox */}
                    <input type="checkbox" defaultValue="" name="" />
                    {/* todo text */}
                    <span className="text">Design a nice theme</span>
                    {/* Emphasis label */}
                    <small className="label label-danger">
                      <i className="fa fa-clock-o" /> 2 mins
                    </small>
                    {/* General tools such as edit or delete*/}
                    <div className="tools">
                      <i className="fa fa-edit" />
                      <i className="fa fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v" />
                      <i className="fa fa-ellipsis-v" />
                    </span>
                    <input type="checkbox" defaultValue="" name="" />
                    <span className="text">Make the theme responsive</span>
                    <small className="label label-info">
                      <i className="fa fa-clock-o" /> 4 hours
                    </small>
                    <div className="tools">
                      <i className="fa fa-edit" />
                      <i className="fa fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v" />
                      <i className="fa fa-ellipsis-v" />
                    </span>
                    <input type="checkbox" defaultValue="" name="" />
                    <span className="text">Let theme shine like a star</span>
                    <small className="label label-warning">
                      <i className="fa fa-clock-o" /> 1 day
                    </small>
                    <div className="tools">
                      <i className="fa fa-edit" />
                      <i className="fa fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v" />
                      <i className="fa fa-ellipsis-v" />
                    </span>
                    <input type="checkbox" defaultValue="" name="" />
                    <span className="text">Let theme shine like a star</span>
                    <small className="label label-success">
                      <i className="fa fa-clock-o" /> 3 days
                    </small>
                    <div className="tools">
                      <i className="fa fa-edit" />
                      <i className="fa fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v" />
                      <i className="fa fa-ellipsis-v" />
                    </span>
                    <input type="checkbox" defaultValue="" name="" />
                    <span className="text">
                      Check your messages and notifications
                    </span>
                    <small className="label label-primary">
                      <i className="fa fa-clock-o" /> 1 week
                    </small>
                    <div className="tools">
                      <i className="fa fa-edit" />
                      <i className="fa fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fa fa-ellipsis-v" />
                      <i className="fa fa-ellipsis-v" />
                    </span>
                    <input type="checkbox" defaultValue="" name="" />
                    <span className="text">Let theme shine like a star</span>
                    <small className="label label-default">
                      <i className="fa fa-clock-o" /> 1 month
                    </small>
                    <div className="tools">
                      <i className="fa fa-edit" />
                      <i className="fa fa-trash-o" />
                    </div>
                  </li>
                </ul>
              </div>
              {/* /.box-body */}
              <div className="box-footer clearfix no-border">
                <button className="btn btn-default pull-right">
                  <i className="fa fa-plus" /> Add item
                </button>
              </div>
            </div>
            {/* /.box */}
          </section>
          {/* right col */}
        </div>
        {/* /.row (main row) */}
      </section>
    </>
  );
}
