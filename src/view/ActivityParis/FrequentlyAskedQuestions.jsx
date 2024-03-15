import React from 'react'

function FrequentlyAskedQuestions() {
    const AskedQuest = [1,2,3,4];
    return (
        <>
            <div className="FrequeAskedQuest">
                <div className="container-fluid">
                    <div className="paris-tour">
                        <h2 className="headingTop">Frequently asked questions about Paris</h2>
                        {AskedQuest.map(() => {
                            return (
                                <div className='para_wrap'>
                                    <h4 className='head'>What top attractions are a must-see in Paris?</h4>

                                    <h6 className='head_line'>The must-see attractions in Paris are:</h6>
                                    <ul>
                                        <li>Seine River</li>
                                        <li>Sainte-Chapelle</li>
                                        <li>Louvre Museum</li>
                                        <li>Paris Catacombs</li>
                                        <li>Pantheon, Paris</li>
                                    </ul>
                                    <h3 className='bottom_head'>See all must-see sights in Paris</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrequentlyAskedQuestions