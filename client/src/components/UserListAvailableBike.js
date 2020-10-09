import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button, Col, Container, FormControl, Row} from 'react-bootstrap';
import {RideTimeContext} from "./Context/RideContext";

export function UserListAvailableBike(){
    const [availableBikes, setAvailableBikes] = useState([]);
    const [rideHours, setRideHours] = useState(1);
    const context = useContext(RideTimeContext);

    const numbers = [];
    for (let i = 1; i<=24;i++) numbers.push(i);
    const listItems = numbers.map((number, index) =>
        <option key={index}>{number}</option>
    );

    const handlerDeleteBike = async(e)=>{
        const id = e.target.getAttribute('data-id');
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        };
        await fetch("/api/deleteBike", requestOptions);
        window.location.reload(false);
    }

    const handlerRentingBike = async(e)=>{
        const id = e.target.getAttribute('data-id');
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id, rideHours})
        };
       await fetch("/api/rentingBike", requestOptions);
        context.rending(rideHours, id);
        window.location.reload(false);
    }

    const handlerSetTimeRide = async(e)=>{

        setRideHours(e.target.value);
    }

    const addAvailableBike = (listBikes)=>{
        return listBikes.map((bike) => {
            const { bike_name, bike_type, bike_price } = bike; //destructuring
            return (
                <Container className="item_menu item_list" key={bike._id}>
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <p
                                className="my-auto font-italic">
                                {bike_name} /
                                {bike_type} /
                                ${bike_price} /
                                <FormControl as="select" className="d-inline" custom onChange={handlerSetTimeRide}>
                                    {listItems}
                                </FormControl>
                            </p>
                            <div >
                                <Button variant="info" className="rent" onClick={handlerRentingBike} data-id={bike._id}>Rent</Button>
                                <Button variant="danger" className="delete" onClick={handlerDeleteBike} data-id={bike._id}>Delete</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        })

    }

    const getBikes = useCallback(()=>{
        try{
             fetch("/api/availablebikes")
                .then(res=>res.json())
                .then(res=>setAvailableBikes(res))
                .catch(e => e);

        }catch (e){

        }
    },[])

    useEffect(()=>{
        getBikes();
    }, [getBikes]);

    return(
            <Container className="list_bike main-block">
                <h3><span role="img" aria-label="sx-a11y/accessible-emoji">🚲</span>Available bicycle({availableBikes.length})</h3>
                {addAvailableBike(availableBikes)}
            </Container>
        );
}