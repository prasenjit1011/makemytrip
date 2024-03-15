import React from 'react'
import discoverPic from '../../assets/Images/discoverPic.png'

function DiscoverModal(props) {
    const { closeModal } = props;
    return (
        <>
            <section className='discoverModalSection'>
                <div className='subDiscoverModal'>
                    <div className="disCrossDiv">
                        <p className="discoverHead">Discover</p>
                        <button className="closeDiscover" onClick={() => closeModal()}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className='disCovScrollDiv'>
                        <div className='disMainCatDivs'>
                            <p className='disCatHeads'>Categories</p>
                            <ul className='discoverUL'>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                            </ul>
                            <div>
                                <button className='seeMoreDisBtn'><i class="fa-solid fa-angle-down"></i> See more</button>
                            </div>
                        </div>
                        <div className='disMainCatDivs'>
                            <p className='disCatHeads'>Traveler interests</p>
                            <ul className='discoverUL'>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                            </ul>
                            <div>
                                <button className='seeMoreDisBtn'><i class="fa-solid fa-angle-down"></i> See more</button>
                            </div>
                        </div>
                        <div className='disMainCatDivs'>
                            <p className='disCatHeads'>Attractions to explore</p>
                            <ul className='discoverUL'>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                            </ul>
                            <div>
                                <button className='seeMoreDisBtn'><i class="fa-solid fa-angle-down"></i> See more</button>
                            </div>
                        </div>
                        <div className='disMainCatDivs'>
                            <p className='disCatHeads'>Activities for every type of traveler</p>
                            <ul className='discoverUL'>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                                <li className='discoverLI'>
                                    <figure className='discoveFigLi'>
                                        <img src={discoverPic} alt="" />
                                    </figure>
                                    <p className='discovePara'>Entry tickets</p>
                                </li>
                            </ul>
                            <div>
                                <button className='seeMoreDisBtn'><i class="fa-solid fa-angle-down"></i> See more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DiscoverModal