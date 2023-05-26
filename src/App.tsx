import React, {useEffect, useState} from 'react';
import {Button, Container, Navbar, NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from './firebaseConfig';
import SignInScreen from "./SignInScreen";
import JacuzziApp from "./JacuzziApp";
import {DoorOpen} from "react-bootstrap-icons"; // Import the firebase instance

const App: React.FC = () => {


    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = async () => {
        try {
            // Call Firebase authentication method to log out
            await auth.signOut();

            // Update the isAuthenticated state to false
            setIsAuthenticated(false);
        } catch (error) {
            // Handle logout error
            console.log('Logout error:', error);
        }
    };
    useEffect(() => {
        // Check the authentication state on component mount
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                // User is authenticated
                setIsAuthenticated(true);
            } else {
                // User is not authenticated
                setIsAuthenticated(false);
            }
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);


    return (
        <Container>
            {!isAuthenticated ? (
                <SignInScreen/>
            ) : (
                <div>
                    <Navbar color="info" light expand="md" className={"mb-2"}>
                        <NavbarBrand href="/">My Jacuzzi</NavbarBrand>
                        {isAuthenticated && (
                            <Button color="primary" onClick={handleLogout}>
                                <DoorOpen />
                            </Button>
                        )}
                    </Navbar>
                    <JacuzziApp/>
                </div>
            )}
        </Container>
    );
};

export default App;
