import React from 'react';
import FilterModal from '../../components/Modal/FilterModal';
import { BsFilter } from 'react-icons/bs';

const BannerThings = ({
  resetFilter,
  applyFilter,
  showFilterModal,
  setShowFilterModal,
  isLoading,
  setIsLoading,
  selectedFilters,
  setSelectedFilters,
  ratingsComp,
}) => {
  return (
    <>
      <section className="Banner-things">
          <div className="d-flex flex-lg-row flex-column justify-content-between ">
            {/* <ul className="bannerThingsFilter d-flex flex-lg-row col-lg-10 list-unstyled ">
              <li className="d-flex align-items-center">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Price
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" href="#">
                      Action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </div>
                </li>
              </li>

              <li className="d-flex align-items-center">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Languages
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" href="#">
                      Action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </div>
                </li>
              </li>

              <li className="d-flex align-items-center">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Duration
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" href="#">
                      Action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </div>
                </li>
              </li>
              <li className="d-flex align-items-center">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Time
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" href="#">
                      Action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </div>
                </li>
              </li>
            </ul> */}

            <div className="justify-content-end ">
              {/* <span className="d-flex align-items-center mt-4 filterBtn ">
                <BsFilter /> Filter
              </span> */}
              <ul className="bannerThingsFilter d-flex flex-lg-row col-lg-10 list-unstyled ">
                <li
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => {
                    setShowFilterModal(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <span>Filter</span> <BsFilter />
                </li>
              </ul>
            </div>
          </div>
      </section>
      {showFilterModal && (
        <FilterModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          closeModal={setShowFilterModal}
          applyFilter={applyFilter}
          resetFilter={resetFilter}
          ratingsComp={ratingsComp}
        />
      )}
    </>
  );
};

export default BannerThings;
