import React, { useState, useEffect } from 'react'; // Importing React hooks and components
import Swal from 'sweetalert2'; // Importing SweetAlert2 for creating alerts

// Defining the expected props for the AlertComponent
interface AlertComponentProps {
    title: string; // Title content of the alert
    comment: string; // Text content of the alert
}

// Declaring the AlertComponent as a functional component that accepts AlertComponentProps
const AlertComponent: React.FC<AlertComponentProps> = ({ title, comment }) => {

    var backgroundColor: string;
    var color: string;
    var borderColor: string;

    switch(title){
        case 'success':
            backgroundColor='#9FE3BF';
            borderColor= '#008000';
            color= 'black';
            break;
        case 'error':
            backgroundColor='#E7AAAA';
            borderColor= '#FF0000';
            color= 'black';
            break;
        case 'warning':
            backgroundColor='#EFF0C5';
            borderColor= '#FF9F10';
            color= 'black';
            break;
        case 'info':
            backgroundColor='#9DE0F6';
            borderColor= '#3FC3EE';
            color= 'black';
            break;
        case 'question':
            backgroundColor='#C9DAE1';
            borderColor= '#87ADBD';
            color= 'black';
            break;
    }

    // Using useState to manage a timer interval, initially set to null
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

    // Function to open the alert
    const openAlert = () => {
        Swal.fire({ // Creating an alert with SweetAlert2
            position: "bottom-end", // Positioning the alert at the bottom-right corner
            html: comment, // Setting the alert's content to the 'comment' prop
            timer: 2000, // Automatically closing the alert after 2 seconds
            timerProgressBar: true, // Displaying a progress bar during the countdown
            showConfirmButton: false, // Not showing a confirmation button
            didOpen: () => { // Actions to perform when the alert opens
                const popup = Swal.getPopup(); // Getting the alert's popup element
                if (popup) { // Checking if the popup exists
                    popup.style.backgroundColor = backgroundColor; // Applying the background color from the props
                    popup.style.display= 'flex'; // Making the popup a flex container
                    popup.style.alignItems= 'center'; // Centering items vertically
                    popup.style.color= color; // Applying the text color from the props
                    popup.style.borderLeft= `3px solid ${borderColor}`
                }
            },
            willClose: () => { // Actions to perform when the alert is about to close
                if (timerInterval) { // If there's a timer interval
                    clearInterval(timerInterval); // Clearing the interval
                }
            }
        }).then((result) => { // Handling the result of the alert action
            if (result.dismiss === Swal.DismissReason.timer) { // If the alert was dismissed by the timer
                console.log("I was closed by the timer"); // Logging a message
            }

            // Accessing the alert's icon element and reducing its font size
            const iconElement = Swal.getPopup()?.querySelector('.swal2-icon') as HTMLElement?? null;
            if (iconElement) {
                iconElement.style.fontSize = '6px'; // Reducing the icon's font size
            }
        });
    };

    // Using useEffect to call openAlert when the component mounts
    useEffect(() => {
        openAlert();
    }, []); // Empty dependency array means this effect runs once on mount

    // Returning a div element, which could be expanded to include triggers for the alert
    return (
        <div>
            {/* Placeholder for adding buttons or other elements to manually trigger the alert */}
        </div>
    );
};

// Exporting the AlertComponent as the default export
export default AlertComponent;
