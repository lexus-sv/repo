import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Container, Row } from 'react-bootstrap';

export function UserListRent(){
    const [rentBikes, setRentBikes] = useState([]);

    const handlerRentingBike = async(e)=>{
        const id = e.target.getAttribute('data-id');
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        };
        await fetch("/api/availablingBike", requestOptions);
        window.location.reload(false);
    }

    const addRentPostione = (listRentBike)=>{
        return listRentBike.map((bike, index) => {
            const { bike_name, bike_type, rent_hours } = bike; //destructuring
            let {bike_price} = bike;
            if(rent_hours>20){
                bike_price=(bike_price*rent_hours)/2;
            }else{
                bike_price*=rent_hours;
            }
            return (
                <Container className="item_menu item_list" key={index}>
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <p className="my-auto font-italic">{bike_name} / {bike_type} / ${bike_price}({rent_hours} hours)</p>
                            <Button variant="danger" className="rentCancel" onClick={handlerRentingBike} data-id={bike._id}>Cancel rent</Button>
                        </Col>
                    </Row>
                </Container>
            )
        })

    }

    const getBikes = useCallback(()=>{
        try{
             fetch("/api/rentbikes")
                .then(res=>res.json())
                .then(res=>setRentBikes(res))
                .catch(e => e);

        }catch (e){

        }
    },[])

    useEffect( ()=>{
        getBikes();
    }, [getBikes]);

    return(
            <Container className="list_rent main-block">
                <h3><span role="img" aria-label="sx-a11y/accessible-emoji">😎</span>Your rent({rentBikes.length})</h3>
                {addRentPostione(rentBikes)}
            </Container>
        );
}