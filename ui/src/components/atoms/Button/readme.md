Button Component
================

Component creates a button output, accepting the following props:

| Prop              | Description           | Accepts                | Default   |
| ----------------- | --------------------- | ---------------------- | --------- |
| type              | Button style type     | `primary`, `secondary` | `primary` |
| onClickEvent      | An onClick function   | `function()`           | `null`    |
| label             | Label for the button  | _arbitary_             | `null`    |

## Usage example

```jsx
<Button type={type} onClickEvent={() => onClickEvent()}>
    {label}
</Button>
```