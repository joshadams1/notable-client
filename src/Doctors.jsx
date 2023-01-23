import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/doctors');
            const data = await res.json();
            console.log('data =>', data);
            setDoctors(data);
        }
        fetchData();
    }, []);

    const grabAppointments = async (id) => {
        const res = await fetch(`http://localhost:8000/doctors/${id}/appointments`);
        const data = await res.json();
        setAppointments(data);
    }

    return (
        <Tabs isFitted variant='enclosed'>
            <Grid
                templateColumns='repeat(5, 1fr)'
            >
                <GridItem>
                    <Grid
                        templateColumns='repeat(5, 1fr)'
                    >
                        <TabList>
                            {doctors.map((doctor, idx) => {
                                return (<Grid item><Tab onClick={() => grabAppointments(doctor.id)} style={{ marginRight: "10px" }} key={idx}>{doctor.firstName} {doctor.lastName}</Tab></Grid>)
                            })}
                        </TabList>
                    </Grid>
                </GridItem>
                <GridItem>
                    <TabPanels>
                        {doctors.map((doctor, idx) => {
                            return (
                                <div>
                                <TabPanel style={{ marginTop: "10px" }} key={idx}>
                                    <h2>{doctor.email}</h2>
                                    <TableContainer>
                                        <Table variant='simple'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Name</Th>
                                                    <Th>Time</Th>
                                                    <Th>Kind</Th>
                                                </Tr>
                                            </Thead>
                                            {appointments.map(appointment => {
                                                return (
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>{appointment.name}</Td>
                                                            <Td>{appointment.time}</Td>
                                                            <Td>{appointment.kind}</Td>
                                                        </Tr>
                                                    </Tbody>
                                                )
                                            })}
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                </div>
                            )
                        })}
                    </TabPanels>
                </GridItem>
            </Grid>
        </Tabs>
    )
}

export default Doctors
