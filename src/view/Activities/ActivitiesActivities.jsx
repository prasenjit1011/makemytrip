import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

const ActivitiesActivities = ({ activities = [] }) => {
  return (
    <div>
      <section className="Activities mb-3">
          {/* <div className="active">
            <div className="active-text">
              <p>11.activities</p>
            </div>
            <div className="active-btn">
              <div className="btn-group">
                <div className="btn-list">
                  <span className="mr-3">Sort by:</span>
                  <button
                    type="button"
                    className="btn dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Recommended
                  </button>
                </div>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </div>
            </div>
          </div> */}
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start">
            <div className="activitiesText">{activities?.length}. Activities</div>
            {/* <div className="d-flex align-items-center">
              <div className="sortBy mr-3">Sort By:</div>
              <div className="recomText d-flex mr-2 align-items-center">
                <li className="nav-item dropdown list-unstyled">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Recommended
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li>
              </div>
            </div> */}


          </div>
       
      </section>
    </div>
  );
};

export default ActivitiesActivities;
