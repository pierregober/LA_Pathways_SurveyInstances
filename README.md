# LA_Pathways_SurveyInstances

These files are a small part of the big project that I did with working for the City of Los Angeles.

So to add context to the project itself:
LA Pathways is a tool being developed for the LA Business Portal to help businesses find resources providers throughout the city.
A user takes a survey based on their answer(s); the platform will provide them with matched resources. 

### Survey:
The survey gets divided into eight sections. Each section contains one question & answer options for the question in focus. 

### Resource Provider:
As a resource provider, they are offering their service to help a business in whatever phase they might be. 
Resource providers are broken down into nine categories:
Consulting, Location, Special Topics, Capital, Contracting, Compliance, Industry-Specific, Demo Categories, Networking.

### Here's where my part comes in:
On the admin portal side, the admin must be able to see all surveys that business owners create. The completed surveys are a survey instance. All surveys are showcased as a card that has the option to delete or to view more details. When you view more details, it shows the questions and the answers associated with that question. Some have multiple answers, so if you look in the InstanceViewMoreCard.jsx, you can see a mapper question, and within that is a mapper for the answers. 
Also, I added a date range filter to check for the survey created within a specified date range. The cards are paginated using RC pagination.

### Want more?
One other primary task was to devise and implement the email service using a third-party email API. We ended up using Twilio's Send Grid service. If you want an excellent C#/.NET example, please look at my other repo named TwilioSendGrid_EmailServiceExample.
