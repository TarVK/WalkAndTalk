# WalkAndTalk

This repository contains a prototype for an application designed together with Tom van Hoesel and Ramon Salah for a hackaton at [Eindhoven University of Technology](https://www.tue.nl/en/): https://sciencesanne.com/hackathon.

## Application

**Walk & Talk** is designed to help adolescents navigate conversations about someone they just lost. The application features two roles: the bereaved and the buddy. The bereaved can make a journal about the person they lost, by adding memories in the form of text, images, or songs. The buddy would be someone that knows the bereaved in real life, and wants to offer their help but does not know how exactly. The app suggest taking the bereaved for a walk, and offers tips and conversation topics during this walk. Every now and then, the app will send a notification, which may contain a general tip like "Ask the bereaved whether you can be of any practical help apart from talking". But it may also show a memory that the bereaved uploaded as a suggestion for a conversation topic, possibly with a tip on how to approach this topic. Once the walk is finished, the buddy can add some additional information about the walk, their perspective, and the newly made memory will be added to the journal of the bereaved. The application may also prompt the user to take a picture during the walk, which will be added to the journal as well.

**Walk & Talk**'s intention is to aid the natural healing process, instead of taking it over. We only target the problem of many friends of bereaved in the adolescents age range not having experience loss and not knowing how to approach the subject. The idea is to educate the buddies in real time, and take as much pressure off of the bereaved themselves.

Below is a screenshot of what the journal in our prototype looks like

![Screenshot](/screenshot.png)

### Presentation

See [walktalk slides.pdf](/walktalk%20slides.pdf) or [walktalk slides.pptx](/walktalk%20slides.pptx) for some more information

## Prototype

The prototype is visible at [tarvk.github.io/WalkAndTalk/build/](https://tarvk.github.io/WalkAndTalk/build/).

This prototype is made in only a couple of days and features a mostly working front-end, but lacks all back-end functionality. In order to show both the bereaved and buddy roles, the application features 2 standard profiles selectable in the top right corner to see both perspectives. Data can be entered and altered, but changes are not persistent on page reloads.
