import Link from 'next/link';

const Sidebar = () => {

  return (
    <>
      <aside className="left-side sidebar-offcanvas">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img src="/admin/img/avatar3.png" className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">
              <p>Hello, Jane</p>
              <Link href="/dashboard"> <i className="fa fa-circle text-success" /> Online</Link>
            </div>
          </div>
          {/* search form */}
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder="Search..."
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  name="seach"
                  id="search-btn"
                  className="btn btn-flat"
                >
                  <i className="fa fa-search" />
                </button>
              </span>
            </div>
          </form>
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu">
            <li className="active">
              <a href="index.html">
                <i className="fa fa-dashboard" /> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="pages/widgets.html">
                <i className="fa fa-th" /> <span>Widgets</span>{" "}
                <small className="badge pull-right bg-green">new</small>
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-bar-chart-o" />
                <span>Charts</span>
                <i className="fa fa-angle-left pull-right" />
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/charts/morris.html">
                    <i className="fa fa-angle-double-right" /> Morris
                  </a>
                </li>
                <li>
                  <a href="pages/charts/flot.html">
                    <i className="fa fa-angle-double-right" /> Flot
                  </a>
                </li>
                <li>
                  <a href="pages/charts/inline.html">
                    <i className="fa fa-angle-double-right" /> Inline charts
                  </a>
                </li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-laptop" />
                <span>UI Elements</span>
                <i className="fa fa-angle-left pull-right" />
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/UI/general.html">
                    <i className="fa fa-angle-double-right" /> General
                  </a>
                </li>
                <li>
                  <a href="pages/UI/icons.html">
                    <i className="fa fa-angle-double-right" /> Icons
                  </a>
                </li>
                <li>
                  <a href="pages/UI/buttons.html">
                    <i className="fa fa-angle-double-right" /> Buttons
                  </a>
                </li>
                <li>
                  <a href="pages/UI/sliders.html">
                    <i className="fa fa-angle-double-right" /> Sliders
                  </a>
                </li>
                <li>
                  <a href="pages/UI/timeline.html">
                    <i className="fa fa-angle-double-right" /> Timeline
                  </a>
                </li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-edit" /> <span>Forms</span>
                <i className="fa fa-angle-left pull-right" />
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/forms/general.html">
                    <i className="fa fa-angle-double-right" /> General Elements
                  </a>
                </li>
                <li>
                  <a href="pages/forms/advanced.html">
                    <i className="fa fa-angle-double-right" /> Advanced Elements
                  </a>
                </li>
                <li>
                  <a href="pages/forms/editors.html">
                    <i className="fa fa-angle-double-right" /> Editors
                  </a>
                </li>
              </ul>
            </li>

            <li className="treeview">
              <a href="#">
                <i className="fa fa-table" /> <span>Attributes</span>
                <i className="fa fa-angle-left pull-right" />
              </a>
              <ul className="treeview-menu">
                <li>
                  <Link href="/admin/attributes">
                    <i className="fa fa-angle-double-right" /> List
                  </Link>
                </li>
                <li>
                  <Link href="/admin/attributes/create">
                    <i className="fa fa-angle-double-right" /> Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a href="pages/calendar.html">
                <i className="fa fa-calendar" /> <span>Calendar</span>
                <small className="badge pull-right bg-red">3</small>
              </a>
            </li>
            <li>
              <a href="pages/mailbox.html">
                <i className="fa fa-envelope" /> <span>Mailbox</span>
                <small className="badge pull-right bg-yellow">12</small>
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-folder" /> <span>Examples</span>
                <i className="fa fa-angle-left pull-right" />
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="pages/examples/invoice.html">
                    <i className="fa fa-angle-double-right" /> Invoice
                  </a>
                </li>
                <li>
                  <a href="pages/examples/login.html">
                    <i className="fa fa-angle-double-right" /> Login
                  </a>
                </li>
                <li>
                  <a href="pages/examples/register.html">
                    <i className="fa fa-angle-double-right" /> Register
                  </a>
                </li>
                <li>
                  <a href="pages/examples/lockscreen.html">
                    <i className="fa fa-angle-double-right" /> Lockscreen
                  </a>
                </li>
                <li>
                  <a href="pages/examples/404.html">
                    <i className="fa fa-angle-double-right" /> 404 Error
                  </a>
                </li>
                <li>
                  <a href="pages/examples/500.html">
                    <i className="fa fa-angle-double-right" /> 500 Error
                  </a>
                </li>
                <li>
                  <a href="pages/examples/blank.html">
                    <i className="fa fa-angle-double-right" /> Blank Page
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>

    </>
  );
};

export default Sidebar;