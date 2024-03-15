import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createWishlistFolder } from '../../API_HELPERS/apiHelpers';
import MainLoader from '../../components/Loaders/MainLoader';
import { useGlobalDataCtx } from '../../Context/GlobalDataProvider';
import { useAuth } from '../../Context/AuthContextProvider';

function CreateFolderModal({ createFolderModal, setCreateFolderModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [folderName, setFolderName] = useState('');
  const { fetchWishListFolders } = useGlobalDataCtx();
  const { loginStatus, setShowLoginModal } = useAuth();

  const createFolder = async e => {
    e.preventDefault();
    if (folderName === '') return toast.error('Folder Name Is Required');
    if (!loginStatus) {
      // setCreateFolderModal(false);
      setShowLoginModal(true);
      return;
    }
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

  return (
    <>
      {!isLoading ? (
        <>
          <section className="newWishListModalSection">
            {/* show all lists modal */}

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
      ) : (
        <MainLoader isLoading={isLoading} />
      )}
    </>
  );
}

export default CreateFolderModal;
