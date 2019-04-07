Leads Component
================

Component houses cards to display based on data supplied at render. Props accepted include:

| Prop        | Description                                     | Accepts      | Default |
| ----------- | ----------------------------------------------- | ------------ | ------- |
| leads       | An array of objects containing lead information | `[]`         | `[]`    |
| updateEvent | An onClick function                             | `function()` | `null`  |

## Usage example

```jsx
<Leads leads={leads} updateEvent={updateEvent} />
```