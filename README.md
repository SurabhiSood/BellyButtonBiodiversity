### Goal
Use Plotly.js to build a dashboard of interactive charts and deploy on Heroku.

View dashboard [here](https://surabhisood-b3.herokuapp.com/).

### Process

#### Flask

In the app.py file, I used Flask to render the template which dynamicaly genetares based on the Id selected by the user from drop down.

#### app.js

In the app.js file,I created two functions. One to obtain all the graphs based on user selection of 'Test Selection Id' from the dropdown menu. Other to generate the Demographic Info.

The pis, bar and bubble charts were straightforward.However, the gauge chart was bit trickier. Plotly.js had documentation on its own gauge charts, but none fit what I was looking for, so I used a different solution based on two resources I found online. The technique was to first make a donut chart, hide half of it, and divide the second half into nine steps (to reflect the frequency of washes, WFREQ, per sample). The pointer on the gauge would then point to the respective number of washes based on the selected sample. The pointer was created with a combination of a scatter plot and paths, whose point position changed in accordance with the selected sample.

All the plots were obtained from Plotly.js

An init() function was created to display a list of available samples as user can select from as well as populate the dashboard with default values when the dashboard is first loaded. The final function (optionChanged()) simply called the getPlot() and getInfo() functions based on the user selection.

### Heroku

To deploy this dashboard on Heroku, I simply created a new app in Heroku and connected it to the corresponding GitHub repo. Then, I added a Procfile and requirements.txt file to my repo.