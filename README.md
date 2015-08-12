# Movie collection

Your movie collection can be stored with title, description, genre and images.

The data is stored in the localStorage, so beware of storage size limitations.

## Done so far:
 * General architecture
 * Menu
 * Create
 * Display movies
 * Update
 * Delete

## To do:
 * CSS
 * Internationalisation
 * Dev environment:
  * The watch is buggy
 * When movie saved and modified, add message to user
 * Documentation
 * Bugs:
  * 2 images with the same name will result in unexpected behaviour
  * delete and create: view is not updated until refresh (cache of localStorage not updated properly?)
  * form validation

## Notes
* Unit tests:
 * Only the localStorage interaction is unit tested at the moment.
* How to run it:
 * Go to the main folder and use `npm install`.
 * In target-grunt/dist, open index.html in your browser.
