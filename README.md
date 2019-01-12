# React Rectangle Selection

<center><img src="https://media.giphy.com/media/TgMQsGWU3JirveHc1t/giphy.gif" width="500" /></center>

## Installation

`npm install --save react-rectangle-selection`

## How To Use

First import this component where you want to use it

`import RectangleSelection from "react-rectangle-selection"`

Then wrap it around the component that will trigger the selection box.

```jsx
render() {
  return(
    <RectangleSelection
      onSelect={(e, coords) => {
       this.setState({
          origin: coords.origin,
          target: coords.target
       });
      }}
      style={{
        backgroundColor: "rgba(0,0,255,0.4)",
        borderColor: "blue"
      }}
     >
      <div className="App" />
  </RectangleSelection>
  )
}
```

## Props

| _Prop_      |                        _Description_                        |
| ----------- | :---------------------------------------------------------: |
| onSelect    | Accepts a function that returns the coordinates of the page |
| onMouseUp   |                     Returns on mouse up                     |
| onMouseDown |                    Returns on mouse down                    |
| style       |          Sets the style of the selection rectangle          |
| disabled    |                    Disable the selection                    |

## Demo

<a href="http://five-food.surge.sh">RectangleSelection Demo</a>
