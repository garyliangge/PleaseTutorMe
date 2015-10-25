
### PleaseTutorMe

## Startup Guide

Visit us on our webpage at http://pleasetutor.me, or clone the repository yourself, using<code> git clone https://github.com/garyliangge/PleaseTutorMe.git</code>. Once cloned, install node.js onto your computer, and using your terminal emulator of choice, start the application using <code>npm start</code>. The website is accessible by entering <code>localhost:3000</code> into your favorite browser.


## Inspiration


College is overflowing with opportunities to collaborate. It's the camaraderie, the us-versus-them mentality that keeps our heads above water. But countless homework parties and office hours have made scheduling collaboration complex at best and impossible at worst. Our frustration at being too busy to attend scheduled collaboration sessions prompted us to create an application that enabled us to find nearby help, fast.


## What it does


PleaseTutorMe is a web application that allows users to seek tutoring or seek to tutor others. It uses the Google Maps API and a search bar to match users seeking tutoring to nearby tutors that listed their search queries as topics of expertise. A student can search for a topic (e.g. computer science) and find nearby available tutors that claim to be qualified to tutor in that topic. All interactions are real time; tutors can toggle when they are available and are notified via text using the Twilio API when another user has requested a tutor session with them. Once a tutor accepts the request, the requester is notified and the map UI allows the tutor to come to the requester’s location to begin a tutoring session.


## How we built it


We used Express and the Node.js framework to create our site. Our frontend was built using HTML/CSS, jade, and javascript, with elements from Bootstrap and Selectize.js (a jQuery plugin). Our data is stored on a Mongo Database.


## Challenges we ran into


Using the Selectize.js turned out to require a substantial amount of tinkering, and we almost gave up before we figured out how to properly use it. We also struggled with pulling data from our database and displaying it how we wanted on the maps UI. The various browsers also had drawbacks that made initial testing difficult. Routing took a long time and the search function was tough to implement.


## Accomplishments that we're proud of


We successfully integrated the Google Maps and Twilio API’s to elegantly supplement the service we offer in our web application. We also created a fuzzy search function that displays only users that can teach certain subjects.


## What we learned


We became more familiar with utilizing API’s in our web applications as well as building elegant UI’s. Our frontend developer used Jade and Node.js for the first time, so he gained tremendous experience with these technologies.


## What's next for PleaseTutorMe


Interactions between tutors and requesters are left open-ended in the current iteration of the project; tutors can request a fee for their time in person, and that negotiation is up to the users. In the future, we’d like to offer tutors the opportunity to publicly display the amount they charge before they are requested or allow them to advertise that they work pro bono. We’d even like to integrate the Braintree API to make payment easier between requesters and tutors who do charge.
