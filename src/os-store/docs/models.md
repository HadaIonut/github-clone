# Models

Most of the time we will need a model to represent a data structure
that comes from an API response.

## Structure

A model will have the following structure:

```javascript
class Note {
  static toJSON({ body }) {}

  static create({ body }) {
    const note = new Note();
    note.body = body;

    return note;
  }
  constructor({ id, created_date, body }) {
    this.id = id;
    this.createdDate = created_date;
    this.body = body;
  }

  toJSON() {
    return {
      created_date: this.createdDate,
      body: this.body,
    };
  }
}
```

A model is the single source of truth of how a certain piece of data will
look inside the application. A model is also the only way we transform data
from UI to API JSON and back.

Let's go threw every method and see what they mean:

### `constructor({ ... })`

The constructor is used by the [serializer](./store.md) to transform data
coming from the API. The resulted instance of the model will then be stored in the store's state.

Example:

```javascript
function noteSerializer(data) {
  return data.map(noteData => new Note(noteData));
}
```

for more details see [store](./store.md)

### `static toJSON({ ... })`

This method is used to transform data coming from UI into data ready to be sent
on a POST or PUT body.

Example:

```javascript
```

### `Note.prototype.toJSON`

This method is used to transform the data back into API data that can be sent
via a request.

### `static create({ ... })` and `Note.prototype.toJSON`

These two methods usually go together

The `static create` method is similar to the one above, it is also used for converting data from UI but it will
create a model instance instead. This will give us the option to both store the model in the store
and then send it on a request in the same action or method.

Example:

```javascript
const store = new StoreCreator({
    mutations: {
        createNote(state, newNote) {
            state.getCourseNotesEntry.data.push(newNote);
        },
    },
   actions: {
       createNote({ body }) {
           const createdNote = Note.create({
               body,
           });

           // Store the note in the state for instant UI feedback
           // until the real note stores on the back-end
           context.commit('createNote', createdNote);

           // send the note data threw the API
           await context.dispatch('postCourseNotesAction', {
               body: createdNote.toJSON(),
           });

           // refresh the state with new data from the back-end
           // this will ensure that state is synced with the real
           // data from the API
           await context.dispatch('getCourseNotesAction');
       }
   }
});
```
