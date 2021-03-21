Prim's Algorithm
A*


#Components
    Header
        Size
        Reset
        New
    Canvas
    Settings
        Player
            Play
            Pause
        Algorithms
            List

#Services
    MazeService
        Save maze state Subject
    SolverService
        Sub ot maze
            solve on maze update
    PlayerService
        Play selected algorithm on demand
    CanvasService
        Sub to maze 
            canvas update on maze update.
