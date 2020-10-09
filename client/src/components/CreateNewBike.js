import React, {useState} from 'react';
import {Button, Col, Container, Row, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

export function CreateNewBike(){
    const [bike_name, setBikeName] = useState("");
    const [bike_type, setBikeType] = useState("Custom");
    const [bike_price, setBikePrice] = useState("");

    const listBikeType = [
        "Mountain",
        "Hybrid/Comfort",
        "Road",
        "Triathlon/Time Trial",
        "BMX/Trick",
        "Commuting",
        "Cyclocross",
        "Track Bike/Fixed Gear",
        "Tandem",
        "Adult Trike",
        "Folding",
        "Kids",
        "Beach Cruiser",
        "Recumbent",
        "Custom"]

    const handlerChangeBikeName = async(e)=>{
        setBikeName(e.target.value.trim())
    }

    const handlerSelectType = async(e)=>{
        setBikeType(e);
    }

    const handlerChangeBikePrice = async(e)=>{
        if(!isNaN(e.target.value)) {
            setBikePrice(e.target.value);
        }else{
            console.log("You have some symbols that mustn't be here");
            e.target.value = bike_price;
        }
    }

    const addNewBikeHandler =  async(e)=>{
        //e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bike_name, bike_type, bike_price})
        };
        if(bike_name && bike_type && bike_price){
            await fetch('/api/newbike', requestOptions)
                .catch(err => err);
            window.location.reload(false)
        }else{
            console.log("field is empty")
        }
    }

    const createListOfTypesBike = ()=>{
        return listBikeType.map((item, index)=>{
            return <Dropdown.Item eventKey={item} key={index}>{item}</Dropdown.Item>
        })
    }

    return(
            <Container className="create_new_bike main-block">
                <h3><span role="img" aria-label="sx-a11y/accessible-emoji">🤑</span>Create new rent</h3>
                <Container className="item_menu">
                    <Row>
                        <Col>
                            <p className="d-inline">Bike name</p>
                            <FormControl
                                type="text"
                                placeholder="Input bike name"
                                aria-label="Input bike name"
                                onChange={handlerChangeBikeName}
                            />
                        </Col>
                        <Col>
                            <p className="d-inline">Bike type</p>
                            <DropdownButton
                                title={bike_type}
                                onSelect={handlerSelectType}
                                variant="light">

                                {createListOfTypesBike()}
                            </DropdownButton>
                        </Col>
                        <Col lg="2">
                            <p className="d-inline">Bike Price</p>
                            <FormControl
                                type="text"
                                placeholder="00.00"
                                aria-label="Input bike price"
                                onChange={handlerChangeBikePrice}
                            />
                        </Col >
                        <Col lg="2">
                            <br/>
                            <Button
                                variant="success"
                                className="w-100"
                                onClick={addNewBikeHandler}
                            >
                                Submit rent
                            </Button>
                        </Col>
                    </Row>

                </Container>
            </Container>
        );
}