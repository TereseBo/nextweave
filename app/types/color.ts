type color=string


type ColorContextType={
    currentColor:color,
    setCurrentColor:(newColor:color)=> void
}

type colorCollection=color[]