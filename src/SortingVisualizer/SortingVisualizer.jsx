import React from 'react';
import {getMergeSortAnimations} from './Mergesort.js';
import './SortingVisualizer.css';
import { useState } from 'react';
import { QuickSort } from './QuickSort.js';

let ANIMATION_SPEED_MS = 10;
let ARRAY_BARS = 40;

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
        for(let i =0; i< ARRAY_BARS; i++){
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



    quickSort = async () => {
        const { array } = this.state;
    
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
        // Function to update the state
        const updateArrayState = newArray => {
            this.setState({ array: newArray });
        };
    
        // Calling QuickSort and passing the necessary arguments
        await QuickSort([...array], updateArrayState, delay);
    };

    
        
       



    insertionSort() {
        const { array } = this.state;
        const sortWithDelay = async () => {
            for (let i = 1; i < array.length; i++) {
                let current = array[i];
                let j = i - 1;

                while (j >= 0 && array[j] > current) {
                    array[j + 1] = array[j];
                    j--;
                    await delay(10); // Visualization delay

                    // Visualization logic (update UI or console.log the array)
                    this.setState({ array: [...array] });
                }

                array[j + 1] = current;
            }

            this.setState({array});
        }  
        sortWithDelay();
    }

    changeBar = (val) => {
        ARRAY_BARS = val*10;
        this.resetArray();
    }
    
   

    bubbleSort = () => {
        const { array } = this.state;
      
        const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
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
               await delay2(10); // Adjust delay time as needed
                const bartyle = arrayBars[j].style;
                bartyle.backgroundColor = PRIMARY_COLOR;
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            
      
                // Wait for a delay and log the difference
               await delay2(10); // Adjust delay time as needed

              }
            }
          }
        };
        sortWithDelay();
        ARRAY_BARS = 50;
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
                <button className="btn" onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button className="btn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <p>Length:</p>
                <input id="a_speed" type="range" min={2} max={6} onChange={(e)=> this.changeBar(e.target.value)} ></input>
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

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }