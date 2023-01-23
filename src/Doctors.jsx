import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Grid,
    GridItem
} from '@chakra-ui/react';


function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const doctorsRequest = await fetch('http://localhost:8000/doctors');
            const doctorsParsed = await doctorsRequest.json();
            setDoctors(doctorsParsed);
            const appointmentsRequest = await fetch(`http://localhost:8000/doctors/${doctorsParsed[0]?.id}/appointments`);
            const appointmentsParsed = await appointmentsRequest.json();
            setAppointments(appointmentsParsed)
        }
        fetchData();
    }, []);

    const grabAppointments = async (id) => {
        const res = await fetch(`http://localhost:8000/doctors/${id}/appointments`);
        const data = await res.json();
        setAppointments(data);
    }

    return (
        <Tabs isFitted variant='enclosed' className='doctors'>
            <Grid
                templateColumns='repeat(5, 1fr)'
            >
                <GridItem>
                    <TabList>
                        <Grid
                            templateColumns='repeat(5, 1fr)'
                        >
                            {doctors.map((doctor, idx) => {
                                return (<Grid item className='doctor-tab'><Tab onClick={() => grabAppointments(doctor.id)} key={idx}>{doctor.firstName} {doctor.lastName}</Tab></Grid>)
                            })}
                        </Grid>
                    </TabList>
                </GridItem>
                <GridItem>
                    <TabPanels>
                        {doctors.map((doctor, idx) => {
                            return (
                                <div>
                                    <TabPanel className='doctor-table' key={idx}>
                                        <h2>Dr. {doctor.firstName} {doctor.lastName}</h2>
                                        <h3>{doctor.email}</h3>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>#</Th>
                                                        <Th>Name</Th>
                                                        <Th>Time</Th>
                                                        <Th>Kind</Th>
                                                    </Tr>
                                                </Thead>
                                                {appointments.map((appointment, idx) => {
                                                    return (
                                                        <Tbody>
                                                            <Tr>
                                                                <Td>{idx + 1}</Td>
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
