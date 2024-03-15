import React, { useEffect, useState } from 'react';
import { createWishlistFolder, getUserWishlistFolders } from '../../API_HELPERS/apiHelpers';
import MainLoader from '../Loaders/MainLoader';
import { toast } from 'react-hot-toast';

function WishlistModal({ setShowWishlistModal, wishlistHandler }) {
  const [isLoading, setIsLoading] = useState(false);
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');

  const fetchWishListFolders = async () => {
    try {
      setIsLoading(true);
      const res = await getUserWishlistFolders();
      if (res && res?.status) {
        setFolders(res?.data);
      } else {
        console.log('Error fetching folders', res);
      }
    } catch (error) {
      console.log('Error fetching folders', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishListFolders();
  }, []);

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
      } else {
        toast.error(res?.message || 'Error creating folder');
      }
    } catch (error) {
      toast.error(error?.message || 'Error creating folder');
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* <section className="popup-background">
        <MainLoader isLoading={isLoading} />
        <div className="popup">
          <div className="title">
            <i className="fa-solid fa-xmark" onClick={() => setShowWishlistModal(false)} style={{ cursor: 'pointer' }} />

            <p>Select a Wishlist Folder</p>
          </div>
          <div className="main-sec">
            <form className="wishListForm" onSubmit={createFolder}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: '#000' }}>
                  Create Wishlist Folder
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required={true}
                  placeholder="Folder Name..."
                  value={folderName}
                  onChange={e => {
                    setFolderName(e.target.value);
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
            <div className="sub-title" style={{ width: '100%' }}>
              <p>My Whishlist Folders</p>

              {folders?.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => wishlistHandler(item?._id)}
                    style={{
                      background: '#e9ecef',
                      width: '70%',
                      cursor: 'pointer',
                      padding: '5px',
                      margin: '10px',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <h5 className="text-primary">{item?.folderName}</h5>
                  </div>
                );
              })}
              {folders?.length === 0 && (
                <p style={{ fontSize: '14px', color: '#495057' }}>*Add folders to wishlist activities</p>
              )}
            </div>
          </div>
        </div>
      </section> */}
      <MainLoader isLoading={isLoading} />
      <div id="backdrop">
        <div id="modal1">
          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>
            <i
              className="fa-solid fa-square-xmark"
              style={{ color: '#495057', cursor: 'pointer' }}
              onClick={() => setShowWishlistModal(false)}
            />
          </div>
          <label htmlFor="desc" style={{ fontSize: '20px', fontWeight: '600', color: '#343a40', margin: '4px' }}>
            Select Wishlist Folder
          </label>
          <br />
          {folders?.length > 0 ? (
            folders?.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => wishlistHandler(item?._id)}
                  className="mb-2 fade-in"
                  style={{
                    background: '#e9ecef',
                    width: '70%',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <h5 className="text-primary m-0 p-0">{item?.folderName?.toUpperCase()}</h5>
                </div>
              );
            })
          ) : (
            <label
              className="fade-in"
              style={{
                background: '#495057',
                color: 'white',
                width: '70%',
                padding: '5px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              htmlFor="exampleInputEmail1"
            >
              Folders Not Found, Create One.
            </label>
          )}
          <div className="input-group mb-3 fade-in" style={{ width: '70%' }}>
            <input
              id="exampleInputEmail1"
              type="text"
              className="form-control"
              placeholder="Folder Name"
              required={true}
              // aria-label="Recipient's username"
              // aria-describedby="button-addon2"
              value={folderName}
              onChange={e => {
                setFolderName(e.target.value);
              }}
            />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={createFolder}>
              CREATE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistModal;
