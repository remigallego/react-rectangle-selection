# React Rectangle Selection

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

| _Prop_ |     _Description_     | 
| ------ | :-------------------: |
| onSelect  | Accepts a function that returns the coordinates of the page |     
| style  |      Sets the style of the selection rectangle       |  


## Demo

<a href="http://skillful-property.surge.sh">RectangleSelection Demo</a>