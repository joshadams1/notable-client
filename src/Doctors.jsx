import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function Doctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/doctors');
            const data = await res.json();
            console.log('data =>', data);
            setDoctors(data);
        }
        fetchData();
    }, []);

    return (
        <Tabs isFitted variant='enclosed'>
            <TabList>
                {doctors.map((doctor, idx) => {
                    return (<Tab style={{marginRight: "10px"}} key={idx}>{doctor.firstName} {doctor.lastName}</Tab>)
                })}
            </TabList>

            <TabPanels>
                {doctors.map((doctor, idx) => {
                    return (<TabPanel style={{marginTop: "10px"}} key={idx}>{doctor.email}</TabPanel>)
                })}
            </TabPanels>
        </Tabs>
    )
}

export default Doctors
