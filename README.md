## Coding Assignment: June 2023

#### Instructions were as follows:
- List all orders by order of creation date, showing the photo in an easy-to-understand way
- Those orders with status `“pending”` should be highlighted so the user can see them effortlessly and focus attention
- Allow the user to filter by the attributes: `Status`, `Size`, `Condition` and `Type`
- For every order in the list, provide a call to action that will open a popup, showing a map drawing the origin and the destination with markers.

#### Rationale:
- My first thought on this project was to use a table, what better way to display raw data. However, the addition of images would make the table rows too large.
  - Therefore, I decided to go with a `Card` style to show all the information for each product. It allowed me to show all relevant information, and the picture together in an organized manner.
- For the Filterting I decided to implement a scalable filter that grabs all the `JSON` keys, and creates filter options for each in a dropdown. This means that adding new attributes, or values of attributes would never break this feature.
- For the order status, my previous experience with dashboards came in handy here and I just gave the status a background color based on its severity
- I used `React`, `Sass`, `Google Maps (GCP)`, `react-modal`, `react-geocode`, `multiselect-react-dropdown`
  - I opted not to use `Typescript` for time

#### Issues:
- The first and largest issue came from the decision to do `Cards` instead of a table. Initially with the `Cards` I had them stretched across with some margins to fill in the white space. This looked awkward as the rows were long and skinny.
  - So I shrunk them down in width and arranged them in a `Grid`. This made it look too busy and I found it harder to find specific entries. So ultimately I landed on a design that accepted the white space, and had large margins on the side. This gave the cards a good aspect ratio, and looked the cleanest of the three.
  - Looking back on this I probably would have tried the table with some hover for the pictures instead as I would have prefered to fill in all the white space and allow more room for filtering options. This was also feedback recieved from reviewers.
- The second issue was with the maps. I decided to go with `Google Maps` which required the adresses to be in coordinates. This meant I had to convert all the addresses to cooridinates. I used `react-geocode` which did this pretty easilly, and I was able to add it into a hook.
  - In hindsight this might have been better off as a `useMemo` as these are calculated each time the map is opened
 
*<---- Images to come soon ---->*

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs Node Module depedencies. Do this before starting

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
