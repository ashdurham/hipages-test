LeadCard Component
================

Component is a child element built to be used and consumed by the [Leads component](../../organisms/Leads). Accepts the following props:

| Prop                 | Description                      | Accepts                | Default   |
| -------------------- | -------------------------------- | ---------------------- | --------- |
| updateEvent          | An onClick function for updating | `function()`           | `null`    |
| _arbitary lead data_ | Data for the lead being output   | `{...lead}`            | none      |

## Usage example

```jsx
<LeadCard updateEvent={updateEvent} {...lead} />
```