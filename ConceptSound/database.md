classDiagram
direction TB
class node10 {
    Drivers
    Storage
}
class node6 {
    computed
}
class node4 {
    Index
    Ref
    computed
    putToArray
    ref
    removeEntities
    retrieveIndex
    ripFromArray
    saveIndex
    useBookService
    useLibraryService
}
class node5 {
    Entity
    Index
    clear
    drop
    find
    removeEntities
    retrieveIndex
    save
    saveIndex
    setupGuide
}
class node3 {
    CordovaSQLiteDriver
    Drivers
    Storage
    clear
    drop
    find
    save
}
class node8
class node1 {
    Entity
}
class node9 {
    Index
}
class node2 {
    setupGuide
}
class node12 {
    useBookService
}
class node0 {
    useLibraryService
}
class node11 {
    putToArray
    ripFromArray
}
class vue {
    Ref
    ref
}

node6  -->  node4 
node5  -->  node4 
node5  -->  node4 
node5  -->  node4 
node9  -->  node4 
node12  -->  node4 
node0  -->  node4 
node11  -->  node4 
node11  -->  node4 
vue  -->  node4 
vue  -->  node4 
node3  -->  node5 
node3  -->  node5 
node3  -->  node5 
node3  -->  node5 
node1  -->  node5 
node9  -->  node5 
node2  -->  node5 
node10  -->  node3 
node10  -->  node3 
node8  -->  node3 
