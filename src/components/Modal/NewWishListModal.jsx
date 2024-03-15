import React, { useEffect, useState } from 'react';
import emptyImg from '../../../src/assets/Images/emptyImg.png';
import { Link } from 'react-router-dom';
import { createWishlistFolder, getUserWishlistFolders } from '../../API_HELPERS/apiHelpers';
import { toast } from 'react-hot-toast';
import MainLoader from '../Loaders/MainLoader';
import { useGlobalDataCtx } from '../../Context/GlobalDataProvider';

function NewWishListModal({ setShowWishlistModal, wishlistHandler }) {
  const [isLoading, setIsLoading] = useState(false);
  // const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const { fetchWishListFolders, folders } = useGlobalDataCtx();

  // const fetchWishListFolders = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await getUserWishlistFolders();
  //     if (res && res?.status) {
  //       setFolders(res?.data);
  //     } else {
  //       console.log('Error fetching folders', res);
  //     }
  //   } catch (error) {
  //     console.log('Error fetching folders', error);
  //   }
  //   setIsLoading(false);
  // };

  const createFolder = async e => {
    e.preventDefault();
    if (folderName === '') return toast.error('Folder Name Is Required');
    try {
      setIsLoading(true);
      const res = await createWishlistFolder({ folderName });
      if (res && res?.status) {
        toast.success(res?.message || 'Folder created');
        fetchWishListFolders();
        setFolderName('');
        setCreateFolderModal(false);
      } else {
        toast.error(res?.message || 'Error creating folder');
      }
    } catch (error) {
      toast.error(error?.message || 'Error creating folder');
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   fetchWishListFolders();
  // }, []);

  return (
    <>
      {!isLoading && (
        <>
          <section className="newWishListModalSection">
            {/* show all lists modal */}
            {!createFolderModal && (
              <div className="newWishListModal">
                <div className="newWishHeadDiv">
                  <button
                    className="closeNewWish"
                    onClick={e => {
                      e.preventDefault();
                      setShowWishlistModal(false);
                    }}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                  <span className="selectPara">Select a list</span>
                  <button
                    className="newWishOpen"
                    onClick={e => {
                      e.preventDefault();
                      setCreateFolderModal(true);
                    }}
                  >
                    New list
                  </button>
                </div>
                <div className="newlistWishDiv">
                  <ul className="newWiishUL">
                    {folders?.length > 0 ? (
                      folders?.map((item, i) => {
                        return (
                          <li
                            className="newWiishLi"
                            onClick={() => {
                              wishlistHandler(item?._id);
                            }}
                            key={i}
                          >
                            <Link onClick={e => e.preventDefault()} className="newWishLiAN">
                              <div className="newWishLiDivAN">
                                <figure className="newWishModalFig">
                                  <img src={item?.image || emptyImg} alt="" />
                                </figure>
                                <div>
                                  <p className="thSilvPara">{item?.folderName?.toUpperCase()}</p>
                                  <p className="newWishActivity">
                                    {item?.totalActivity} {item?.totalActivity < 2 ? 'activity' : 'activities'}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <p>Create a list First</p>
                    )}
                  </ul>
                </div>
              </div>
            )}
            {/* create list modal */}
            {createFolderModal && (
              <div className="newCreateListModal">
                <div className="newCreateListHeadDiv">
                  <button
                    className="closeNewCreateWish"
                    onClick={e => {
                      e.preventDefault();
                      setCreateFolderModal(false);
                    }}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                  <span className="selectPara">Create a new list</span>
                </div>
                <div className="newListInputDiv">
                  <span className="listWishSpan">List name</span>
                  <input
                    type="text"
                    required={true}
                    value={folderName}
                    onChange={e => {
                      setFolderName(e.target.value);
                    }}
                  />
                </div>
                <div className="newWishBtnDiv">
                  <button className="newWishDoneBtn" onClick={createFolder}>
                    Done
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      )}
      <MainLoader isLoading={isLoading} />
    </>
  );
}

export default NewWishListModal;
