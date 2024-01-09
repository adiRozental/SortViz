export async function QuickSort(arr, updateArray, delay) {
    const sortArray = async (leftIndex, rightIndex) => {
        if (leftIndex >= rightIndex) return;

        let i = leftIndex;
        let j = rightIndex;
        let pivot = arr[Math.floor((leftIndex + rightIndex) / 2)];

        while (i <= j) {
            while (arr[i] < pivot) {
                i++;
            }

            while (arr[j] > pivot) {
                j--;
            }

            if (i <= j) {
                // Swap elements
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                // Update state through callback
                updateArray([...arr]);

                // Wait for a delay to visualize the sorting process
                await delay(50);

                i++;
                j--;
            }
        }

        await Promise.all([
            sortArray(leftIndex, j),
            sortArray(i, rightIndex)
        ]);
    };

    await sortArray(0, arr.length - 1);
}

  // quickSort = async () => {
    //     const { array } = this.state;
    
    //     const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    //     const sortArray = async (arr, leftIndex, rightIndex) => {
    //         if (leftIndex >= rightIndex) return;
    
    //         let i = leftIndex;
    //         let j = rightIndex;
    //         let pivot = arr[Math.floor((leftIndex + rightIndex) / 2)];
    
    //         while (i <= j) {
    //             while (arr[i] < pivot) {
    //                 i++;
    //             }
    
    //             while (arr[j] > pivot) {
    //                 j--;
    //             }
    
    //             if (i <= j) {
    //                 const temp = arr[i];
    //                 arr[i] = arr[j];
    //                 arr[j] = temp;
    
    //                 // Update state after each swap
    //                 this.setState({ array: [...arr] });
    
    //                 // Wait for a delay to visualize the sorting process
    //                 await delay(50);
    
    //                 i++;
    //                 j--;
    //             }
    //         }
    
    //         await Promise.all([
    //             sortArray(arr, leftIndex, j),
    //             sortArray(arr, i, rightIndex)
    //         ]);
    //     };

    //     await sortArray([...array], 0, array.length - 1);
    // };