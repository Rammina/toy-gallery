# Site & Route Map

<!-- //TODO: make sure to update this later as features are added - rammina -->

## URL & Pages

The format is:

(pathname - description of what is shown from the URL)

`/` | `/toys` - displays the list of toy images/pages, and should contain filter and sort

`/toys/:id` - displays a specific toy page

## Page Components

Format:

ComponentName - pathname - description of what is contained

`<ToysList/>` - / or /toys - shows list of toys

`<ToyPage />` - /toys/:id - specific toy

`<ErrorPage />` - (Any Route outside of the ones above) - shows an error page

## Components (inside a page component)

Format:

ComponentName - description of what is contained

`<ToyItem />` - each item in an toy list

`<ToySection />` - the section containing the toy in a toy page

[<< Go back to README]()

[<< Go back to documentation links]()
