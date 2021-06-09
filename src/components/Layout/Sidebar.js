import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import $ from "jquery";
import "./Sidebar.scss";

class sidebar extends Component {
  state = {
    Tab: "index",
    SubTab: "",
    MoreTab: "",
    country_menu: false,
    dashboard_menu: false,
    nature_menu: false,
    platform_menu: false,
    service_menu: false,
    technology_menu: false,
    task_menu: false,
    timesheet_menu: false,
    client_menu: false,
    project_menu: false,
    user_menu: false,
    currency_menu: false,
    status_menu: false,
    expense_menu: false,
  };

  stateKeys = Object.keys(this.state);

  menus = [
    {
      name: "user_menu",
      tab: "user",
      subMenus: [
        { routeName: "add-user", label: "Add New User" },
        { routeName: "viewuser", label: "View Users" },
      ],
    },
    {
      name: "timesheet_menu",
      tab: "timesheet",
      subMenus: [
        { routeName: "add-time", label: "New Time" },
        { routeName: "timesheet", label: "View Timesheet" },
      ],
    },
    {
      name: "country_menu",
      tab: "country",
      subMenus: [
        { routeName: "add-country", label: "New Country" },
        { routeName: "country", label: "View Country" },
      ],
    },
    {
      name: "nature_menu",
      tab: "nature",
      subMenus: [
        { routeName: "add-nature", label: "New Nature" },
        { routeName: "nature", label: "View Nature" },
      ],
    },
    {
      name: "platform_menu",
      tab: "platform",
      subMenus: [
        { routeName: "add-platform", label: "New Platform" },
        { routeName: "platform", label: "View Platforms" },
      ],
    },
    {
      name: "service_menu",
      tab: "service",
      subMenus: [
        { routeName: "add-service", label: "New Service" },
        { routeName: "service", label: "View Services" },
      ],
    },
    {
      name: "technology_menu",
      tab: "technology",
      subMenus: [
        { routeName: "add-technology", label: "New Technology" },
        { routeName: "technology", label: "View Technologys" },
      ],
    },
    {
      name: "task_menu",
      tab: "task",
      subMenus: [
        { routeName: "add-task", label: "New Tasks" },
        { routeName: "task", label: "View Tasks" },
        { routeName: "subtask", label: "View subtask" },
      ],
    },
    {
      name: "client_menu",
      tab: "client",
      subMenus: [
        { routeName: "addclient", label: "New Client" },
        { routeName: "viewclient", label: "View Clients" },
      ],
    },
    {
      name: "project_menu",
      tab: "project",
      subMenus: [
        { routeName: "addproject", label: "New Project" },
        { routeName: "viewproject", label: "View Projects" },
        { routeName: "projectreport", label: "Project Report" },
      ],
    },
    {
      name: "currency_menu",
      tab: "currency",
      subMenus: [
        { routeName: "addcurrency", label: "New Currency" },
        { routeName: "viewcurrency", label: "View Currency" },
      ],
    },
    {
      name: "status_menu",
      tab: "status",
      subMenus: [
        { routeName: "addstatus", label: "Add Status" },
        { routeName: "viewstatus", label: "View Status" },
      ],
    },
    {
      name: "expense_menu",
      tab: "expense",
      subMenus: [
        { routeName: "add-expense", label: "New Expense" },
        { routeName: "view-expense", label: "View Expense" },
      ],
    },
    {
      name: "machine_menu",
      tab: "Machine",
      subMenus: [
        { routeName: "add-machine", label: "Add New Machine" },
        { routeName: "view-machine", label: "View Machine Details" },
      ],
    },
    {
      name: "accessory_menu",
      tab: "Accessory",
      subMenus: [
        { routeName: "add-accessory", label: "Add New Accessory" },
        { routeName: "view-accessory", label: "View Accessory " },
      ],
    },
  ];

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  setActiveTab = (tab, subtab, moretab, toggleTab, e) => {
    this.setState({ Tab: tab, SubTab: subtab, MoreTab: moretab });
  };

  componentDidMount() {
    var now_route = "";
    var pageUrl = window.location.pathname.split(/[?#]/)[0];
    now_route = pageUrl.substr(1).replace(/_/g, " ");
    $("#now_routing").empty();
    if (now_route == "") {
      now_route = "Dashboard1";
    } else {
    }
    $("#now_routing").append(now_route);

    $(".toggle-search").on("click", function() {
      var targetId = $(this).data("target");
      var $searchBar;
      if (targetId) {
        $searchBar = $(targetId);
        $searchBar.toggleClass("open");
      }
    });

    $(".button-menu-mobile").on("click", function(event) {
      event.preventDefault();
      $("body").toggleClass("enlarged");
    });

    $("li.has_sub li").on("click", function(event) {
      $("body").toggleClass("enlarged");
    });
  }
  componentDidUpdate() {
    var now_route = "";
    var pageUrl = window.location.pathname.split(/[?#]/)[0];
    now_route = pageUrl.substr(1).replace("_", " ");
    $("#now_routing").empty();
    if (now_route == "") {
      now_route = "Dashboard1";
    } else {
    }
    $("#now_routing").append(now_route);
  }

  render() {
    return (
      // <div className="sidebar">
      <div className="left side-menu sidebar">
        <div className="topbar-left ">
          <div className="sidebar-options ">
            <Link to="/" className="logo">
              <img src="assets/images/ftr-logo.png" height="36" alt="logo" />
            </Link>
          </div>
        </div>

        <div className="sidebar-inner slimscrollleft ">
          <PerfectScrollbar>
            <div id="sidebar-menu" className="options">
              <ul>
                <li className="menu-title leftbar">Main</li>
                <li
                  className={
                    this.state.dashboard_menu
                      ? "has_sub active-menu nav-active"
                      : "has_sub"
                  }
                >
                  <Link
                    to="#"
                    onClick={() =>
                      this.setState({
                        dashboard_menu: !this.state.dashboard_menu,
                        form_menu: false,
                        country_menu: false,
                      })
                    }
                    className={
                      this.state.Tab === "index"
                        ? "waves-effect active-menu"
                        : "waves-effect"
                    }
                  >
                    <i className="mdi mdi-view-dashboard" />{" "}
                    <span>
                      {" "}
                      Dashboard{" "}
                      <span className="badge badge-pill badge-primary pull-right">
                        20+
                      </span>
                    </span>{" "}
                  </Link>
                  <ul
                    className="list-unstyled"
                    style={{
                      display: this.state.dashboard_menu ? "block" : "none",
                    }}
                  >
                    <li>
                      <Link
                        className={
                          this.state.SubTab === "dashboard1"
                            ? "active-menu"
                            : ""
                        }
                        onClick={this.setActiveTab.bind(
                          this,
                          "index",
                          "dashboard1",
                          ""
                        )}
                        to="/"
                      >
                        Dashboard One
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          this.state.SubTab === "dashboard2"
                            ? "active-menu"
                            : ""
                        }
                        onClick={this.setActiveTab.bind(
                          this,
                          "index",
                          "dashboard2",
                          ""
                        )}
                        to="dashboard2"
                      >
                        Dashboard Two
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="menu-title">Components</li>

                {this.menus.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        this.state[item.name]
                          ? "has_sub active-menu nav-active"
                          : "has_sub"
                      }
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          this.stateKeys.map((toClose) =>
                            item.name != toClose &&
                            toClose != "Tab" &&
                            toClose != "SubTab" &&
                            toClose != "MoreTab"
                              ? this.setState({ [toClose]: false })
                              : this.setState({
                                  [item.name]: !this.state[item.name],
                                })
                          );
                        }}
                        className={
                          this.state.Tab === `${item.tab}`
                            ? "waves-effect active"
                            : "waves-effect"
                        }
                      >
                        <i className="mdi mdi-clipboard-outline" />
                        <span>
                          {" "}
                          {this.capitalize(item.tab)}{" "}
                          <span className="pull-right">
                            <i className="mdi mdi-chevron-right" />
                          </span>
                        </span>
                      </Link>
                      <ul
                        className="list-unstyled"
                        style={{
                          display: this.state[item.name] ? "block" : "none",
                        }}
                      >
                        {item.subMenus.map((subMenu, index) => {
                          return (
                            <>
                              <li key={index}>
                                <Link
                                  className={
                                    this.state.SubTab === `${subMenu.routeName}`
                                      ? "active-menu"
                                      : ""
                                  }
                                  onClick={this.setActiveTab.bind(
                                    this,
                                    `${item.tab}`,
                                    `${subMenu.routeName}`,
                                    ""
                                  )}
                                  to={subMenu.routeName}
                                >
                                  {subMenu.label}
                                </Link>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="clearfix" />
          </PerfectScrollbar>
        </div>
      </div>
      // </div>
    );
  }
}

export default withRouter(sidebar);
