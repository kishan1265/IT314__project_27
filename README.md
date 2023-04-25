# SOFTWARE ENGINEERING (IT314)
## College Programming Club

## GROUP : 27
 
## The Repository Consists:

The structure of this programming club website project contains five major folders config, models, public, routes, and views.

* ***Config Folder:***
The config folder typically contains configuration files for the project. This can include things like database configuration, passport configuration, user authentication, and other settings that are used to initialize the application. These files may be used by other parts of the project, such as routes or models, to connect to various services or resources.

* ***Models Folder:***
The models folder typically contains files that define the data models used in the application. This can include database schemas (like user collection) and other classes or functions that handle data manipulation. These models are often used by routes to interact with the database and retrieve or update data.

* ***Public Folder:***
The public folder is where you typically store static files that are served directly to the client, such as images, stylesheets (home.css, profile.css ), and client-side scripts(home.js). These files are typically accessible by the client via a URL and can be included in HTML templates or other client-side code.

* ***Routes Folder:***
The routes folder typically contains files that define the routing logic for the application. This can include route handlers, middleware functions, and other code that handles incoming requests and sends responses back to the client. These files are often used to define the various routes of the application, such as /login, /register, /dashboard, /forgot, and /reset, and map them to appropriate controller functions.

* ***Views Folder:***
The views folder typically contains files that define the templates used to render pages in the application. These templates can include EJS, CSS, and client-side scripts, and may be rendered using a templating engine such as EJS or Handlebars. Views are typically used by routes or controllers to generate pages that are sent back to the client in response to a request.

## Aim:

The aim and motivation behind developing a programming club website is to provide an online platform for club members to promote the club and its activities to a wider audience. The programming club website can serve as a hub for club events as well as a resource for programming tutorials and coding challenges. A programming club website can foster a community of like-minded individuals, provide resources and opportunities for users to learn and grow, and improve the club's visibility and impact. 

## Implementation:

We have used MongoDB, ExpressJS, EJS and NodeJS for the development process. this stack enabled us to create entire project using just one language i.e. JavaScript and provide flexibility by allowing separate development of frontend & backend. The front-end is built using EJS, a templating engine for JavaScript that allows us to generate dynamic HTML pages. Express and Node.js are used to build the back-end. We have used No-SQL MongoDB as the database to store and retrieve the information.

EJS allows us to easily integrate dynamic data into our HTML pages, making it a great choice for server-side rendering. We can use EJS to create templates for our pages, which can then be rendered by the server with data from our back-end API.

The list of available lab submissions are as follows:

* ***Lab-2:*** Identified the functional and non-functional requirements of the project and finalized the software development life cycle (SDLC) model to be used in the project.

* ***Lab-3:*** Built the use-case diagram and stated the relationships between the actors and the use cases. Documented the use case textual description (UCD) for each use case. Justified the non-functional aspects.

* ***Lab-4:*** Finalized the tools, frameworks, and technologies to be used for the project. Effort estimation using use case size point (USP).

* ***Lab-6:*** Identified the design goals, entity objects, boundary objects, and control objects. Developed domain analysis model, sequence diagram, class diagram, and high-level system design.

* ***Lab-8:*** This likely involved creating test cases to ensure that the email verification functionality works correctly also involved testing the functionality of the server-side code that handles POST requests for creating events.
