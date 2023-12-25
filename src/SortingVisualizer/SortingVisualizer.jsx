import React from 'react';
import {getMergeSortAnimations} from './Mergesort.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#f597ae';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i =0; i< 40; i++){
            array.push(randomIntCast(5, 500));
        }
        this.setState({array});
    }

    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

    }

    quickSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
      }
    
      heapSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
      }
    
    // //   bubbleSort()
    //   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // const bubbleSort = async () =>  {
    //     // We leave it as an exercise to the viewer of this code to implement this method.
    //     const {array} = this.state;
    //     for (let i = 0; i < array.length; i++) {
    //         for (let j = 0; j < i; j++) {
    //             if (array[i] < array[j]){
    //                 const element = array[i];
    //                 array[i]=array[j];
    //                 array[j] = element;
    //                 this.setState({array});
                    

    //                 this.setState({ array });

    //                 // Add a delay here
    //                 await delay(100); // Adjust the delay time (in milliseconds) as needed
            

    //             }                
                
    //         }
    //     }
    //     this.setState({array});
    //   }

    bubbleSort = () => {
        const { array } = this.state;
      
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
        const sortWithDelay = async () => {
          for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < i; j++) {
              if (array[i] < array[j]) {
                // Swap elements
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                const arrayBars = document.getElementsByClassName('array-bar');
                const barOneStyle = arrayBars[i].style;
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                arrayBars[j].style.backgroundColor = SECONDARY_COLOR;
                // Set state after each change
                this.setState({ array});
      
                // Wait for a delay and log the difference
               await delay(10); // Adjust delay time as needed
                const bartyle = arrayBars[j].style;
                bartyle.backgroundColor = PRIMARY_COLOR;
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            //    array[i].backgroundColor = PRIMARY_COLOR;
            //     // Set state after each change
            //     this.setState({ array});
      
                // Wait for a delay and log the difference
               await delay(10); // Adjust delay time as needed

              }
            }
          }
        };
        sortWithDelay();
    };

    render() {
        const {array} = this.state;

        return (
            <div className="main__container">
                <button className="btn" onClick={() => this.resetArray()}> 
                     Generate New Array
                </button>
                <button className="btn" onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className="btn" onClick={() => this.quickSort()}>Quick Sort</button>
                <button className="btn" onClick={() => this.heapSort()}>Heap Sort</button>
                <button className="btn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <div className="array-container"> 
                    {array.map((value, idx) => (
                        <div className="array-bar"
                            key = {idx}
                            style={{
                                //  backgroundColor: 'lightpink',
                                height: `${value}px`,
                            }}
                            >
                            
                        </div>
                    ))}
                </div>
            </div>
            
        )
    }
}

function randomIntCast(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
    }
