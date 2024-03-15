import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import giftAni from '../../assets/Images/giftboxAnim.gif';
import SendGiftModal from './SendGiftModal';
import ActivityService from '../../Service/ActivityService';
import MainLoader from '../../components/Loaders/MainLoader';
import { async } from 'q';
import { data } from 'autoprefixer';
import { toast } from 'react-hot-toast';


const SendGift = () => {
    const [openModal, setOpenModal] = useState(false);
    const params = useParams();
    const [giftData, setGiftData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [email, setEmail] = useState("");


    // console.log("selectedItem", selectedItem)

    const getParchasedGiftCard = async () => {
        setIsLoading(true);
        const res = await ActivityService.viewParchasedGiftCard(params.id);
        console.log("parchasedRes", res);
        if (res && res?.status) {
            setGiftData(res?.data);
            setIsLoading(false);
        }
    }

    // giftcart send
    const sendGiftcardMail = async () => {
        const sendData = {
            email: email,
            giftCode: selectedItem?.giftCode,
            amount: selectedItem?.amount,
            expirationDate: selectedItem?.expirationDate,
            bookingTime: "null",
            userbookingid: selectedItem._id
        }
        setIsLoading(true);
        const res = await ActivityService.sendGiftCard(sendData)
        console.log("resgiftmail", res);

        if (res && res?.status) {
            toast.success(res?.message);
            getParchasedGiftCard();
            setIsLoading(false);
            setOpenModal(false);
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    }

    // activity gift send
    const sendActivityGiftMail = async () => {
        const sendData = {
            email: email,
            giftCode: selectedItem?.giftCode,
            amount: selectedItem?.amount,
            expirationDate: selectedItem?.expirationDate,
            bookingTime: "null",
            userbookingid: selectedItem._id
        }
        console.log("giftCodeSendData", sendData);

        setIsLoading(true)
        const res = await ActivityService.sendActivityGiftCard(sendData);
        console.log("resActgiftmail", res);
        if (res && res?.status) {
            toast.success(res?.message);
            getParchasedGiftCard();
            setIsLoading(false);
            setOpenModal(false);
        } else {
            toast.error(res?.message);
            setIsLoading(false)
        }
    }

    const handleSendGift = () => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) return toast.error("Please Enter valid email");
        if (selectedItem?.activityName) {
            sendActivityGiftMail();
        } else {
            sendGiftcardMail();
        }
    }

    useEffect(() => {
        getParchasedGiftCard()
    }, [])

    return (
        <div className='container'>
            <MainLoader isLoading={isLoading} />
            {giftData && giftData.map((item, i) =>
                <Link className="cardHovAn" key={i}>
                    <div className="card mainCardPart mt-2">
                        <div className="cardRow">

                            <div className="cartImgPart">
                                <figure className="cartImgFig">

                                    <img alt="" src={giftAni} />
                                </figure>
                            </div>
                            <div className="cartTextPart">
                                <div className="card-body myCardBody">
                                    <div>
                                        <h5 className="thinksHead">Thinks To Do Gift Certificate</h5>
                                    </div>
                                    <div className="cartTextParent">

                                    </div>
                                    <div className="cartTextParent">
                                        <div>
                                            {item?.activityName &&
                                                <p className="parText">{item?.activityName}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        {item?.personalMsg ?
                                            <p>Message: {item?.personalMsg}</p> : <p>Message: No Message</p>
                                        }
                                    </div>
                                    <div className="cartTextParent">

                                        <p className="text1000">Total Price</p>
                                        <div className="secondParDiv">
                                            <p className="text1000">
                                                $ {item?.amount}
                                            </p>
                                        </div>
                                    </div>
                                    {item?.sendToEmail === "pending" &&
                                        <button
                                            className="btn btn-sm btn-success myRemoveBtn"
                                            onClick={() => {
                                                setOpenModal(true)
                                                setSelectedItem(item)
                                            }
                                            }
                                        >
                                            Send Gift
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            )
            }

            {openModal &&
                <SendGiftModal
                    setOpenModal={setOpenModal}
                    handleSendGift={handleSendGift}
                    setEmail={setEmail}
                    email={email}
                />
            }

        </div>
    )
}

export default SendGift
