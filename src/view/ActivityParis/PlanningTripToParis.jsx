import React from 'react'

function PlanningTripToParis() {
  const PlanningTrip = [
    {
      id: 1,
      title: "SWhat top attractions are a must-see in Paris?",
      textarea: "One of the best experiences in Paris is strolling down the Champs-Élysées inspecting the designer outlets, unique grand architecture and eye-wateringly expensive cafes. Climb the Arc de Triomphe at the end of the Champs-Élysées to catch one of the best views of Paris. The other unmissable experience is sitting on the steps of the Sacré-Cœur overlooking Paris as the sun goes down. Afterwards, enjoy the nightlife in the Montmartre neighbourhood which is full of hidden bars and cool restaurants.",
    },

    {
      id: 2,
      title: "How much time should I spend in Paris?",
      textarea: "To get a good feel for Paris and see most of the major attractions, you'll need to allow at least 3 days. This will be enough time to visit the major museums and galleries, wander some of the most interesting neighbourhoods and experience the local food and bar scene. Adding an extra day will allow you to include a day trip, such as an excursion to the lavish Palace of Versailles.",
    },
    {
      id: 3,
      title: "What are the best beaches around Paris?",
      textarea: "Surprisingly, Paris has an excellent beach culture. Every year from mid-July to mid-August the Seine riverbanks are transformed into inner-city beaches complete with deckchairs, palm trees and grassy banks. The Right bank beaches are well suited to a relaxing afternoon with pop up bars where you can pick up a glass of wine. The Left Bank beaches are better for games, activities, live music and dancing.",
    },

    {
      id: 4,
      title: "What's a local recommendation for neighborhood Montmartre?",
      textarea: "The quick stroll down from Montmartre to Pigalle uncovers a cool under-visited area of Paris which is great if you like getting slightly off-the-beaten track in a major city. Although the Moulin Rouge attracts tourists in the area, there are plenty of hidden bars and speakeasys which make it a great neighbourhood for a very local night out. Dirty Dick has a weird and wonderful cocktail list served by super friendly staff.",
    },

    {
      id: 5,
      title: "How much time should I spend in Paris?",
      textarea: "To get a good feel for Paris and see most of the major attractions, you'll need to allow at least 3 days. This will be enough time to visit the major museums and galleries, wander some of the most interesting neighbourhoods and experience the local food and bar scene. Adding an extra day will allow you to include a day trip, such as an excursion to the lavish Palace of Versailles.",
    },

  ];
  return (

    <>
      <section className='PlanningTripToParis'>
        <div className="container-fluid">
          <div className="paris-tour">
            <h2 className="headingTop">Insider tips: Planning a trip to Paris</h2>
            <p className='text'>Paul & Mark are full time travel bloggers who discover hidden gems and local specialities on their blog Anywhere We Roam. They've travelled to Paris many times and discover a new side to the city every time.</p>

            {PlanningTrip.map((Planning) => {
              const { id, title, textarea } = Planning;
              return (
                <div className='wrap_box' key={id}>
                  <h4>{title}</h4>
                  <p>{textarea}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default PlanningTripToParis