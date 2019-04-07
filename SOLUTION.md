Solution Documentation
===========================

## Initial project notes

- `Docker up` will occasionally error `server` out if `mysql` hasn't finished setup. With time permitting, coding in wait feature into `server` to prevent the exit.

- Ran into binding issues between docker and local environment when using the `node-sass` package. To avoid wasting time getting that working, made the decision to code raw CSS in order to ensure on-time delivery.

## Server

I would expect a real world production environment to have a much more in depth setup for the various endpoints and processing that it would be covering. Especially for the `update` request endpoints - these would potentially be more suited to a queuing system to handle the heavy user-load times.

Due to the limited endpoints required for the test, all functional code resides in the main index file.

As meantioned in the inital project notes above, this would normally contain fallback processes should the Database not be online for whatever reason that may be. Additionally, error returns would also be included to ensure the user is fed back with notification of any issues.

## UI

Since this SPA is quite literally a single page, I bypassed setups for routing and templating. As such, `App.js` doubles as a template. Elements for the App reside in the [`components folder`](ui/src/components/) and split into a heirarchy structure - using the `atoms`/`molecules`/`organisms` "Atomic Design Methodology", allowing for clear distinction of what the component contains and how its meant to be consumed.

I took reference from the provided screenshots in the readme for the visual aspect of the project. Tried to match font sizes and colours as best I could without a design file. Mentioned in the initial project notes above, I wanted to use SASS for the styling of the project, however issues with Docker and NPM using local bindings for the package resulted in runtime errors. 
CSS writing assumes in a real-world example, a pre-processor compiler would handle any prefixing required to handle cross browser views.

One item I was unsure of was on the Accepted tab screenshot. The requirement states to display the contacts full name, however in the screenshot, the first contact is missing the last name and the avatar is grayed out. I couldn't see any other difference in the card and therefore didn't have an criteria to use to create this view.

## Hypothetical project continuation

If this were a project I (or the team I am in) was tasked with and we were brain storming ideas around what this part of the application could contain to provide the tradie with all the digital tools they need to manage their workload and projects, the following would be suggested:

- Another tab including the **Declined** jobs that were flagged. This section would naturally be dependant on what happens at decline - may not be viable if the contact has the option on their end to define a "second in line" tradie if the first were to decline. If, however, the contact is informed that they need to find a new tradie for the job, there could be a timeout feature on this to allow the tradie to take back the job if the contact hasn't requested work from another tradie.
- Another tab including **Completed** jobs, and adding further functionality to the accepted tab to mark the job as completed. Reporting could be generated based around this status, giving the tradie insight to their own workload and pay average.
- The project includes a simple mailto link on a card under the **Accepted** tab. This would be a better experience for both tradie and contact if a form was provided to the tradie to send an email, allowing us to control the email and be able to provide job details and brand the email, ensuring that when received by the contact, they are getting a familiar (and expected) email from hipages as opposed to text email from someone they don't yet know.