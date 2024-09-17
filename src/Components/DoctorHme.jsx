import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
const host = 'https://hospital-backend-swyb.onrender.com'
export default function DoctorHome(props) {
    const [appointments, setAppointments] = useState([]);
    const [doctor, setDoctor] = useState([]);
    let navigate = useNavigate();

    const DeleteAppoint = async (id) => {
        try {
            props.showAlert("The opintment will be deleted soon","success")
            const response = await fetch(`${host}/appointments/delete-appointment/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // Remove the appointment from the state
            setAppointments(appointments.filter(appointment => appointment._id !== id));
            props.showAlert("The appointment was successfully removed","success");
        } catch (error) {
            props.showAlert("Error Deleting appointment, try again","error");
            console.error('Error deleting appointment:', error);
        }
    };

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/doctor-login')
        }
        const fetchDoctors = async () => {
            try {

                const response = await fetch(`${host}/docotors/getdoctor-own-details`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });

                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                props.showAlert("Some Error occured during the process", "warning")
            }
        };


        const fetchAppointments = async () => {
            if (!token) {
                navigate('/doctor-login')
                console.error('No auth token found');

                return;
            }
            try {
                const response = await fetch(`${host}/appointments/fetch-doctor-appointment`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });

                if (!response.ok) {
                    props.showAlert("Network Error!", "warning");
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchDoctors();
        fetchAppointments();

    }, [appointments,props]);

    return (
        <>


<div className="container mx-auto p-10 ">
  <div className="flex justify-center">
    <div key={doctor._id} className="bg-gray-50 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md">
      <img
        src={doctor.imageUrl}
        alt={doctor.name}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold mb-2 text-center">{doctor.name}</h2>
      <p className="text-gray-700 mb-2 text-center">{doctor.specialization}</p>
      <p className="text-gray-700 text-center">Phone: {doctor.phone}</p>
      <p onClick={() => {
          localStorage.removeItem('token');
          props.showAlert("You were successfully logged out", "success");
        }} 
        className="text-center mt-2 cursor-pointer"
      >
        Logout <i className="ri-arrow-right-line"></i>
      </p>
    </div>
  </div>
</div>


<h1 className="text-2xl font-bold mb-4 text-center">Appointments</h1>
<div className="px-12 mt-4">
  {appointments.length === 0 ? (
    <p className="text-center text-gray-700">No appointments available.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {appointments.map((appointment) => (
        <div key={appointment._id} className="card p-4 mb-4 border rounded-md shadow-sm flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{appointment.patient_name}</h3>
            <p>Age: {appointment.age}</p>
            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
          </div>
          <i
            onClick={() => DeleteAppoint(appointment._id)}
            style={{ cursor: 'pointer', color: 'green' }}
            className="ri-delete-bin-6-line"
          ></i>
        </div>
      ))}
    </div>
  )}
</div>


        </>
    )
}
