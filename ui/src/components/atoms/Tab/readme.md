Tab Component
================

Component is a child element built to be used and consumed by the [TabGroup component](../../molecules/TabGroup). Accepts the following props:

| Prop              | Description            | Accepts                | Default   |
| ----------------- | ---------------------- | ---------------------- | --------- |
| classes           | Add classes to the tab | _arbitary_             | ""        |
| onClickEvent      | An onClick function    | `function()`           | `null`    |
| label             | Label for the tab      | _arbitary_             | `null`    |

## Usage example

```jsx
<Tab classes={classes} onClickEvent={() => onClickEvent()}>
    {label}
</Tab>
```