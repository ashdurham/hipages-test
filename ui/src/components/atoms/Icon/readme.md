Icon Component
================

Component uses a package implementing a FontAwesome icon, accepting props:

| Prop              | Description              | Accepts    | Default           |
| ----------------- | ------------------------ | ---------- | ----------------- |
| name              | Name of FontAwesome icon | _arbitary_ | `question-circle` |

## Usage example

```jsx
<Icon name={name} />
```

## Important notes

- This requires the icon required to first be initialised in the `App.js` by importing the from the icon package and adding them to the library.
   ```jsx
   import { library } from '@fortawesome/fontawesome-svg-core';
   import { faIconName } from '@fortawesome/free-solid-svg-icons';

   library.add(faIconName);
   ```